import Redis from 'ioredis'

// Redis configuration
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  retryDelayOnFailover: 100,
  enableReadyCheck: false,
  maxRetriesPerRequest: null,
})

// Separate Redis instance for subscriptions (required by ioredis)
const redisSub = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  retryDelayOnFailover: 100,
  enableReadyCheck: false,
  maxRetriesPerRequest: null,
})

// Redis channels for different event types
export const REDIS_CHANNELS = {
  NEW_QUESTION: 'qa:new-question',
  NEW_ANSWER: 'qa:new-answer',
  QUESTION_UPDATED: 'qa:question-updated',
  USER_ONLINE: 'qa:user-online',
  USER_OFFLINE: 'qa:user-offline',
} as const

// Redis keys for data storage
export const REDIS_KEYS = {
  ACTIVE_USERS: 'qa:active-users',
  RECENT_QUESTIONS: 'qa:recent-questions',
  USER_NOTIFICATIONS: (userId: string) => `qa:notifications:${userId}`,
  QUESTION_CACHE: (questionId: string) => `qa:question:${questionId}`,
} as const

// Real-time messaging functions
export class RedisRealtimeService {
  
  // Publish new question to all mentors
  static async publishNewQuestion(questionData: any) {
    try {
      await redis.publish(REDIS_CHANNELS.NEW_QUESTION, JSON.stringify({
        type: 'new_question',
        data: questionData,
        timestamp: Date.now()
      }))
      
      // Cache the question for quick access
      await redis.setex(
        REDIS_KEYS.QUESTION_CACHE(questionData.id),
        3600, // 1 hour
        JSON.stringify(questionData)
      )
      
      // Add to recent questions list
      await redis.lpush(REDIS_KEYS.RECENT_QUESTIONS, JSON.stringify(questionData))
      await redis.ltrim(REDIS_KEYS.RECENT_QUESTIONS, 0, 99) // Keep only 100 recent
      
    } catch (error) {
      console.error('Error publishing new question:', error)
    }
  }

  // Publish new answer to question author and all users
  static async publishNewAnswer(answerData: any, questionData: any) {
    try {
      await redis.publish(REDIS_CHANNELS.NEW_ANSWER, JSON.stringify({
        type: 'new_answer',
        data: {
          answer: answerData,
          question: questionData
        },
        timestamp: Date.now()
      }))
      
      // Add notification for question author
      await this.addUserNotification(questionData.userId, {
        type: 'new_answer',
        title: 'New Answer!',
        message: `Your question "${questionData.title}" has been answered`,
        questionId: questionData.id,
        answerId: answerData.id
      })
      
    } catch (error) {
      console.error('Error publishing new answer:', error)
    }
  }

  // Publish question status update
  static async publishQuestionUpdate(questionData: any) {
    try {
      await redis.publish(REDIS_CHANNELS.QUESTION_UPDATED, JSON.stringify({
        type: 'question_updated',
        data: questionData,
        timestamp: Date.now()
      }))
      
      // Update cached question
      await redis.setex(
        REDIS_KEYS.QUESTION_CACHE(questionData.id),
        3600,
        JSON.stringify(questionData)
      )
      
    } catch (error) {
      console.error('Error publishing question update:', error)
    }
  }

  // User connection management
  static async setUserOnline(userId: string, connectionId: string) {
    try {
      await redis.hset(REDIS_KEYS.ACTIVE_USERS, userId, connectionId)
      await redis.expire(REDIS_KEYS.ACTIVE_USERS, 3600) // Auto cleanup after 1 hour
      
      await redis.publish(REDIS_CHANNELS.USER_ONLINE, JSON.stringify({
        type: 'user_online',
        userId,
        timestamp: Date.now()
      }))
      
    } catch (error) {
      console.error('Error setting user online:', error)
    }
  }

  static async setUserOffline(userId: string) {
    try {
      await redis.hdel(REDIS_KEYS.ACTIVE_USERS, userId)
      
      await redis.publish(REDIS_CHANNELS.USER_OFFLINE, JSON.stringify({
        type: 'user_offline',
        userId,
        timestamp: Date.now()
      }))
      
    } catch (error) {
      console.error('Error setting user offline:', error)
    }
  }

  // Get active users count
  static async getActiveUsersCount(): Promise<number> {
    try {
      return await redis.hlen(REDIS_KEYS.ACTIVE_USERS)
    } catch (error) {
      console.error('Error getting active users count:', error)
      return 0
    }
  }

  // Notification management
  static async addUserNotification(userId: string, notification: any) {
    try {
      await redis.lpush(
        REDIS_KEYS.USER_NOTIFICATIONS(userId),
        JSON.stringify({
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: Date.now(),
          read: false
        })
      )
      
      // Keep only 50 notifications per user
      await redis.ltrim(REDIS_KEYS.USER_NOTIFICATIONS(userId), 0, 49)
      
    } catch (error) {
      console.error('Error adding user notification:', error)
    }
  }

  static async getUserNotifications(userId: string): Promise<any[]> {
    try {
      const notifications = await redis.lrange(REDIS_KEYS.USER_NOTIFICATIONS(userId), 0, -1)
      return notifications.map(n => JSON.parse(n))
    } catch (error) {
      console.error('Error getting user notifications:', error)
      return []
    }
  }

  // Caching functions
  static async getCachedQuestion(questionId: string): Promise<any | null> {
    try {
      const cached = await redis.get(REDIS_KEYS.QUESTION_CACHE(questionId))
      return cached ? JSON.parse(cached) : null
    } catch (error) {
      console.error('Error getting cached question:', error)
      return null
    }
  }

  static async getRecentQuestions(limit: number = 20): Promise<any[]> {
    try {
      const questions = await redis.lrange(REDIS_KEYS.RECENT_QUESTIONS, 0, limit - 1)
      return questions.map(q => JSON.parse(q))
    } catch (error) {
      console.error('Error getting recent questions:', error)
      return []
    }
  }

  // Subscribe to Redis channels
  static subscribeToChannel(channel: string, callback: (message: any) => void) {
    redisSub.subscribe(channel)
    redisSub.on('message', (receivedChannel, message) => {
      if (receivedChannel === channel) {
        try {
          const data = JSON.parse(message)
          callback(data)
        } catch (error) {
          console.error('Error parsing Redis message:', error)
        }
      }
    })
  }

  // Cleanup function
  static async cleanup() {
    await redis.quit()
    await redisSub.quit()
  }
}

export { redis, redisSub }
export default RedisRealtimeService
