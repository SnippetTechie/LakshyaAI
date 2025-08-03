import { redis, redisPub, redisSub } from './client'
import { REDIS_CHANNELS, REDIS_KEYS, CACHE_TTL, RedisEvent } from './constants'

export class RealtimeService {

  // Check if Redis is available
  static async isRedisAvailable(): Promise<boolean> {
    try {
      await redis.ping()
      return true
    } catch (error) {
      return false
    }
  }

  // ==================== PUBLISHING EVENTS ====================

  /**
   * Publish new question event to all mentors
   */
  static async publishNewQuestion(questionData: any) {
    try {
      // Skip if Redis is not available
      if (!(await this.isRedisAvailable())) {
        console.log('📝 Question saved (Redis offline - no real-time broadcast)')
        return
      }

      const event: RedisEvent = {
        type: 'new_question',
        data: questionData,
        timestamp: Date.now(),
        userId: questionData.userId
      }

      await redisPub.publish(REDIS_CHANNELS.NEW_QUESTION, JSON.stringify(event))

      // Cache the question for quick access
      await this.cacheQuestion(questionData)

      // Update recent questions list
      await this.updateRecentQuestions(questionData)

      console.log('📢 Published new question:', questionData.id)
    } catch (error) {
      console.log('📝 Question saved (Redis error - no real-time broadcast)')
    }
  }

  /**
   * Publish new answer event to question author and all users
   */
  static async publishNewAnswer(answerData: any, questionData: any) {
    try {
      // Skip if Redis is not available
      if (!(await this.isRedisAvailable())) {
        console.log('💬 Answer saved (Redis offline - no real-time notification)')
        return
      }

      const event: RedisEvent = {
        type: 'new_answer',
        data: {
          answer: answerData,
          question: questionData
        },
        timestamp: Date.now(),
        userId: questionData.userId // Target the question author
      }

      await redisPub.publish(REDIS_CHANNELS.NEW_ANSWER, JSON.stringify(event))

      // Update cached question with new answer
      await this.cacheQuestion(questionData)

      // Add notification for question author
      await this.addNotification(questionData.userId, {
        type: 'new_answer',
        title: 'New Answer!',
        message: `Your question "${questionData.title}" has been answered`,
        questionId: questionData.id,
        answerId: answerData.id
      })

      console.log('📢 Published new answer for question:', questionData.id)
    } catch (error) {
      console.log('💬 Answer saved (Redis error - no real-time notification)')
    }
  }

  /**
   * Publish question update event
   */
  static async publishQuestionUpdate(questionData: any) {
    try {
      const event: RedisEvent = {
        type: 'question_updated',
        data: questionData,
        timestamp: Date.now(),
        userId: questionData.userId
      }
      
      await redisPub.publish(REDIS_CHANNELS.QUESTION_UPDATED, JSON.stringify(event))
      
      // Update cached question
      await this.cacheQuestion(questionData)
      
      console.log('📢 Published question update:', questionData.id)
    } catch (error) {
      console.error('❌ Error publishing question update:', error)
    }
  }

  // ==================== USER PRESENCE ====================
  
  /**
   * Set user as online
   */
  static async setUserOnline(userId: string, connectionId: string) {
    try {
      await redis.hset(REDIS_KEYS.ACTIVE_USERS, userId, connectionId)
      await redis.setex(REDIS_KEYS.USER_CONNECTION(userId), CACHE_TTL.USER_ACTIVITY, connectionId)
      
      const event: RedisEvent = {
        type: 'user_online',
        data: { userId, connectionId },
        timestamp: Date.now(),
        userId
      }
      
      await redisPub.publish(REDIS_CHANNELS.USER_ONLINE, JSON.stringify(event))
      
      console.log('👤 User online:', userId)
    } catch (error) {
      console.error('❌ Error setting user online:', error)
    }
  }

  /**
   * Set user as offline
   */
  static async setUserOffline(userId: string) {
    try {
      await redis.hdel(REDIS_KEYS.ACTIVE_USERS, userId)
      await redis.del(REDIS_KEYS.USER_CONNECTION(userId))
      
      const event: RedisEvent = {
        type: 'user_offline',
        data: { userId },
        timestamp: Date.now(),
        userId
      }
      
      await redisPub.publish(REDIS_CHANNELS.USER_OFFLINE, JSON.stringify(event))
      
      console.log('👤 User offline:', userId)
    } catch (error) {
      console.error('❌ Error setting user offline:', error)
    }
  }

  /**
   * Get count of active users
   */
  static async getActiveUsersCount(): Promise<number> {
    try {
      return await redis.hlen(REDIS_KEYS.ACTIVE_USERS)
    } catch (error) {
      console.error('❌ Error getting active users count:', error)
      return 0
    }
  }

  // ==================== CACHING ====================
  
  /**
   * Cache a question for quick access
   */
  static async cacheQuestion(questionData: any) {
    try {
      await redis.setex(
        REDIS_KEYS.QUESTION_DETAIL(questionData.id),
        CACHE_TTL.QUESTION_DETAIL,
        JSON.stringify(questionData)
      )
    } catch (error) {
      console.error('❌ Error caching question:', error)
    }
  }

  /**
   * Get cached question
   */
  static async getCachedQuestion(questionId: string): Promise<any | null> {
    try {
      const cached = await redis.get(REDIS_KEYS.QUESTION_DETAIL(questionId))
      return cached ? JSON.parse(cached) : null
    } catch (error) {
      console.error('❌ Error getting cached question:', error)
      return null
    }
  }

  /**
   * Update recent questions list
   */
  static async updateRecentQuestions(questionData: any) {
    try {
      await redis.lpush(REDIS_KEYS.RECENT_QUESTIONS, JSON.stringify(questionData))
      await redis.ltrim(REDIS_KEYS.RECENT_QUESTIONS, 0, 49) // Keep only 50 recent
      await redis.expire(REDIS_KEYS.RECENT_QUESTIONS, CACHE_TTL.RECENT_QUESTIONS)
    } catch (error) {
      console.error('❌ Error updating recent questions:', error)
    }
  }

  /**
   * Get recent questions from cache
   */
  static async getRecentQuestions(limit: number = 20): Promise<any[]> {
    try {
      const questions = await redis.lrange(REDIS_KEYS.RECENT_QUESTIONS, 0, limit - 1)
      return questions.map(q => JSON.parse(q))
    } catch (error) {
      console.error('❌ Error getting recent questions:', error)
      return []
    }
  }

  // ==================== NOTIFICATIONS ====================
  
  /**
   * Add notification for a user
   */
  static async addNotification(userId: string, notification: any) {
    try {
      const notificationData = {
        ...notification,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        read: false
      }
      
      await redis.lpush(
        REDIS_KEYS.USER_NOTIFICATIONS(userId),
        JSON.stringify(notificationData)
      )
      
      // Keep only 100 notifications per user
      await redis.ltrim(REDIS_KEYS.USER_NOTIFICATIONS(userId), 0, 99)
      await redis.expire(REDIS_KEYS.USER_NOTIFICATIONS(userId), CACHE_TTL.USER_NOTIFICATIONS)
      
      // Update notification count
      await redis.incr(REDIS_KEYS.NOTIFICATION_COUNT(userId))
      await redis.expire(REDIS_KEYS.NOTIFICATION_COUNT(userId), CACHE_TTL.USER_NOTIFICATIONS)
      
    } catch (error) {
      console.error('❌ Error adding notification:', error)
    }
  }

  /**
   * Get user notifications
   */
  static async getUserNotifications(userId: string, limit: number = 20): Promise<any[]> {
    try {
      const notifications = await redis.lrange(REDIS_KEYS.USER_NOTIFICATIONS(userId), 0, limit - 1)
      return notifications.map(n => JSON.parse(n))
    } catch (error) {
      console.error('❌ Error getting user notifications:', error)
      return []
    }
  }

  /**
   * Get unread notification count
   */
  static async getUnreadCount(userId: string): Promise<number> {
    try {
      const count = await redis.get(REDIS_KEYS.NOTIFICATION_COUNT(userId))
      return count ? parseInt(count) : 0
    } catch (error) {
      console.error('❌ Error getting unread count:', error)
      return 0
    }
  }

  // ==================== SUBSCRIPTION ====================
  
  /**
   * Subscribe to a Redis channel
   */
  static subscribeToChannel(channel: string, callback: (event: RedisEvent) => void) {
    redisSub.subscribe(channel)
    redisSub.on('message', (receivedChannel, message) => {
      if (receivedChannel === channel) {
        try {
          const event: RedisEvent = JSON.parse(message)
          callback(event)
        } catch (error) {
          console.error('❌ Error parsing Redis message:', error)
        }
      }
    })
  }

  /**
   * Unsubscribe from a Redis channel
   */
  static unsubscribeFromChannel(channel: string) {
    redisSub.unsubscribe(channel)
  }
}

export default RealtimeService
