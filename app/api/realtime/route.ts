import { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import RealtimeService from '@/lib/redis/realtime'
import { REDIS_CHANNELS } from '@/lib/redis/constants'

// Store active SSE connections
const connections = new Map<string, ReadableStreamDefaultController>()

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return new Response('Unauthorized', { status: 401 })
    }

    // Create Server-Sent Events stream
    const stream = new ReadableStream({
      start(controller) {
        const connectionId = Math.random().toString(36).substr(2, 9)
        
        // Store connection
        connections.set(userId, controller)
        
        // Set user as online in Redis
        RealtimeService.setUserOnline(userId, connectionId)
        
        // Send connection confirmation
        controller.enqueue(`data: ${JSON.stringify({ 
          type: 'connected', 
          message: 'Real-time connection established',
          connectionId,
          timestamp: Date.now()
        })}\n\n`)
        
        // Subscribe to relevant Redis channels
        const handleNewQuestion = (event: any) => {
          try {
            controller.enqueue(`data: ${JSON.stringify(event)}\n\n`)
          } catch (error) {
            console.error('Error sending new question event:', error)
          }
        }
        
        const handleNewAnswer = (event: any) => {
          // Only send to the question author
          if (event.userId === userId) {
            try {
              controller.enqueue(`data: ${JSON.stringify(event)}\n\n`)
            } catch (error) {
              console.error('Error sending new answer event:', error)
            }
          }
        }
        
        const handleQuestionUpdate = (event: any) => {
          try {
            controller.enqueue(`data: ${JSON.stringify(event)}\n\n`)
          } catch (error) {
            console.error('Error sending question update event:', error)
          }
        }
        
        // Subscribe to Redis channels
        RealtimeService.subscribeToChannel(REDIS_CHANNELS.NEW_QUESTION, handleNewQuestion)
        RealtimeService.subscribeToChannel(REDIS_CHANNELS.NEW_ANSWER, handleNewAnswer)
        RealtimeService.subscribeToChannel(REDIS_CHANNELS.QUESTION_UPDATED, handleQuestionUpdate)
        
        // Heartbeat to keep connection alive
        const heartbeat = setInterval(() => {
          try {
            controller.enqueue(`data: ${JSON.stringify({ 
              type: 'heartbeat', 
              timestamp: Date.now() 
            })}\n\n`)
          } catch (error) {
            clearInterval(heartbeat)
            cleanup()
          }
        }, 30000) // 30 seconds
        
        // Cleanup function
        const cleanup = () => {
          clearInterval(heartbeat)
          connections.delete(userId)
          RealtimeService.setUserOffline(userId)
          
          // Unsubscribe from Redis channels
          RealtimeService.unsubscribeFromChannel(REDIS_CHANNELS.NEW_QUESTION)
          RealtimeService.unsubscribeFromChannel(REDIS_CHANNELS.NEW_ANSWER)
          RealtimeService.unsubscribeFromChannel(REDIS_CHANNELS.QUESTION_UPDATED)
          
          try {
            controller.close()
          } catch (error) {
            // Connection already closed
          }
        }
        
        // Handle client disconnect
        request.signal.addEventListener('abort', cleanup)
      },
      
      cancel() {
        connections.delete(userId)
        RealtimeService.setUserOffline(userId)
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control',
      },
    })
  } catch (error) {
    console.error('❌ Error in realtime connection:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

// Health check endpoint
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const activeUsers = await RealtimeService.getActiveUsersCount()
    const notifications = await RealtimeService.getUserNotifications(userId, 5)
    const unreadCount = await RealtimeService.getUnreadCount(userId)

    return Response.json({
      status: 'healthy',
      activeUsers,
      notifications,
      unreadCount,
      timestamp: Date.now()
    })
  } catch (error) {
    console.error('❌ Error in realtime health check:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
