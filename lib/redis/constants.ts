// Redis channels for pub/sub messaging
export const REDIS_CHANNELS = {
  // Q&A Events
  NEW_QUESTION: 'qa:new-question',
  NEW_ANSWER: 'qa:new-answer',
  QUESTION_UPDATED: 'qa:question-updated',
  
  // User Events
  USER_ONLINE: 'users:online',
  USER_OFFLINE: 'users:offline',
  
  // System Events
  SYSTEM_NOTIFICATION: 'system:notification',
} as const

// Redis keys for data storage
export const REDIS_KEYS = {
  // Active connections
  ACTIVE_USERS: 'active:users',
  USER_CONNECTION: (userId: string) => `connection:${userId}`,
  
  // Caching
  RECENT_QUESTIONS: 'cache:questions:recent',
  QUESTION_DETAIL: (questionId: string) => `cache:question:${questionId}`,
  USER_QUESTIONS: (userId: string) => `cache:questions:user:${userId}`,
  
  // Notifications
  USER_NOTIFICATIONS: (userId: string) => `notifications:${userId}`,
  NOTIFICATION_COUNT: (userId: string) => `notifications:count:${userId}`,
  
  // Analytics
  DAILY_QUESTIONS: (date: string) => `analytics:questions:${date}`,
  DAILY_ANSWERS: (date: string) => `analytics:answers:${date}`,
  USER_ACTIVITY: (userId: string) => `activity:${userId}`,
} as const

// Cache TTL (Time To Live) in seconds
export const CACHE_TTL = {
  RECENT_QUESTIONS: 300, // 5 minutes
  QUESTION_DETAIL: 600, // 10 minutes
  USER_QUESTIONS: 180, // 3 minutes
  USER_NOTIFICATIONS: 86400, // 24 hours
  USER_ACTIVITY: 3600, // 1 hour
} as const

// Event types for type safety
export type RedisEventType = 
  | 'new_question'
  | 'new_answer'
  | 'question_updated'
  | 'user_online'
  | 'user_offline'
  | 'system_notification'

export interface RedisEvent {
  type: RedisEventType
  data: any
  timestamp: number
  userId?: string
}
