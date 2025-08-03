const Redis = require('ioredis')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

async function testRedis() {
  console.log('🧪 Testing Redis connection...\n')

  // Support both Railway URL and individual config
  const redisConfig = process.env.REDIS_URL
    ? process.env.REDIS_URL
    : {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
        username: process.env.REDIS_USERNAME,
        db: parseInt(process.env.REDIS_DB || '0'),
      }

  const redis = new Redis(redisConfig, {
    retryDelayOnFailover: 100,
    enableReadyCheck: false,
    maxRetriesPerRequest: 3,
    lazyConnect: true,
  })

  try {
    // Test basic connection
    console.log('📡 Connecting to Redis...')
    await redis.ping()
    console.log('✅ Redis connection successful!')
    
    // Test basic operations
    console.log('\n🔧 Testing basic operations...')
    
    // Set a test key
    await redis.set('test:connection', 'Hello Redis!', 'EX', 60)
    console.log('✅ SET operation successful')
    
    // Get the test key
    const value = await redis.get('test:connection')
    console.log('✅ GET operation successful:', value)
    
    // Test pub/sub
    console.log('\n📢 Testing pub/sub...')
    const redisSub = new Redis(redisConfig)
    
    // Subscribe to test channel
    await redisSub.subscribe('test:channel')
    console.log('✅ Subscribed to test channel')
    
    // Set up message handler
    redisSub.on('message', (channel, message) => {
      console.log('✅ Received message:', message)
      console.log('\n🎉 All Redis tests passed!')
      console.log('\n📋 Configuration:')
      if (process.env.REDIS_URL) {
        console.log(`   URL: ${process.env.REDIS_URL.replace(/:[^:@]*@/, ':***@')}`)
      } else {
        console.log(`   Host: ${process.env.REDIS_HOST || 'localhost'}`)
        console.log(`   Port: ${process.env.REDIS_PORT || '6379'}`)
        console.log(`   DB: ${process.env.REDIS_DB || '0'}`)
        console.log(`   Password: ${process.env.REDIS_PASSWORD ? '***' : 'None'}`)
      }
      
      // Cleanup
      redis.quit()
      redisSub.quit()
      process.exit(0)
    })
    
    // Publish test message
    setTimeout(async () => {
      await redis.publish('test:channel', 'Test message from LakshyaAI!')
    }, 100)
    
  } catch (error) {
    console.error('❌ Redis test failed:', error.message)
    console.log('\n🔧 Troubleshooting:')
    console.log('1. Check if Redis server is running')
    console.log('2. Verify connection details in .env.local')
    console.log('3. Check firewall/network settings')
    console.log('4. See REDIS_SETUP.md for detailed instructions')
    
    redis.quit()
    process.exit(1)
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n👋 Test interrupted')
  process.exit(0)
})

testRedis()
