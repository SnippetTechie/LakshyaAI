# 🚀 Railway Redis Setup (5 Minutes)

## Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Sign up with GitHub (recommended)

## Step 2: Deploy Redis
1. Click "New Project"
2. Select "Add Redis" from templates
3. Click "Deploy Redis"
4. Wait 30 seconds ⏰

## Step 3: Get Redis URL
1. Click on your Redis service
2. Go to "Variables" tab
3. Copy the `REDIS_URL` value
   - Looks like: `redis://default:password@containers-us-west-1.railway.app:6543`

## Step 4: Update .env.local
```env
# REDIS CONFIGURATION
REDIS_URL=redis://default:your-password@containers-us-west-1.railway.app:6543
```

## Step 5: Test Connection
```bash
npm run test:redis
```

## Step 6: Start Development
```bash
npm run dev
```

## ✅ That's it! 
Your Q&A system is now real-time! 🎉

## 🎯 Railway Benefits:
- ✅ Latest Redis version
- ✅ Automatic scaling
- ✅ Built-in monitoring
- ✅ $5 monthly credit (free tier)
- ✅ Zero maintenance
- ✅ Modern dashboard
