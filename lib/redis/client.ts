import Redis from 'ioredis'

// Redis client configuration - supports both URL and individual config
const redisConfig = process.env.REDIS_URL
  ? process.env.REDIS_URL  // Railway/Render style URL
  : {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      username: process.env.REDIS_USERNAME,
      db: parseInt(process.env.REDIS_DB || '0'),
    }

// Common Redis options with graceful fallback
const redisOptions = {
  enableReadyCheck: false,
  maxRetriesPerRequest: 1, // Reduced retries for faster fallback
  lazyConnect: true,
  connectTimeout: 2000, // 2 second timeout
}

// Main Redis client for general operations
export const redis = typeof redisConfig === 'string' 
  ? new Redis(redisConfig)
  : new Redis({ ...redisOptions, ...redisConfig })

// Separate Redis client for pub/sub (required by ioredis)
export const redisPub = typeof redisConfig === 'string' 
  ? new Redis(redisConfig)
  : new Redis({ ...redisOptions, ...redisConfig })

export const redisSub = typeof redisConfig === 'string' 
  ? new Redis(redisConfig)
  : new Redis({ ...redisOptions, ...redisConfig })

// Connection event handlers with graceful fallback
redis.on('connect', () => {
  console.log('✅ Redis connected - Real-time features enabled')
})

redis.on('error', (error) => {
  // Only log once to avoid spam
  console.log('⚠️  Redis not available - Running in fallback mode (manual refresh needed)')
  console.log('💡 To enable real-time features, set up Redis: see RAILWAY_REDIS_SETUP.md')
})

redis.on('ready', () => {
  console.log('🚀 Redis ready - Real-time Q&A features active!')
})

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔌 Closing Redis connections...')
  await redis.quit()
  await redisPub.quit()
  await redisSub.quit()
  process.exit(0)
})

export default redis
