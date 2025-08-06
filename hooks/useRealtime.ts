'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

interface RealtimeEvent {
  type: 'connected' | 'new_question' | 'new_answer' | 'question_updated' | 'heartbeat'
  data?: any
  message?: string
  timestamp: number
  connectionId?: string
  userId?: string
}

interface UseRealtimeOptions {
  onNewQuestion?: (question: any) => void
  onNewAnswer?: (data: any) => void
  onQuestionUpdated?: (question: any) => void
  onConnected?: (connectionId: string) => void
  enabled?: boolean
}

export function useRealtime(options: UseRealtimeOptions = {}) {
  const {
    onNewQuestion,
    onNewAnswer,
    onQuestionUpdated,
    onConnected,
    enabled = true
  } = options

  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [activeUsers, setActiveUsers] = useState(0)
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  
  const eventSourceRef = useRef<EventSource | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectAttempts = useRef(0)
  const maxReconnectAttempts = 5

  const connect = useCallback(() => {
    if (!enabled || eventSourceRef.current) return

    try {
      console.log('🔌 Connecting to real-time service...')
      const eventSource = new EventSource('/api/realtime')
      eventSourceRef.current = eventSource
      
      eventSource.onopen = () => {
        console.log('✅ Real-time connection established')
        setIsConnected(true)
        setConnectionError(null)
        reconnectAttempts.current = 0
      }
      
      eventSource.onmessage = (event) => {
        try {
          const data: RealtimeEvent = JSON.parse(event.data)
          
          switch (data.type) {
            case 'connected':
              console.log('📡 Connection confirmed:', data.message)
              if (data.connectionId) {
                onConnected?.(data.connectionId)
              }
              break
              
            case 'new_question':
              console.log('🆕 New question received:', data.data?.title)
              try {
                onNewQuestion?.(data.data)
              } catch (callbackError) {
                console.error('❌ Error in onNewQuestion callback:', callbackError)
              }
              break

            case 'new_answer':
              console.log('💬 New answer received for your question')
              try {
                onNewAnswer?.(data.data)
              } catch (callbackError) {
                console.error('❌ Error in onNewAnswer callback:', callbackError)
              }
              break

            case 'question_updated':
              console.log('🔄 Question updated:', data.data?.title)
              try {
                onQuestionUpdated?.(data.data)
              } catch (callbackError) {
                console.error('❌ Error in onQuestionUpdated callback:', callbackError)
              }
              break
              
            case 'heartbeat':
              // Silent heartbeat - connection is alive
              break
              
            default:
              console.log('📨 Unknown event type:', data.type)
          }
        } catch (error) {
          console.error('❌ Error parsing real-time event:', error)
        }
      }
      
      eventSource.onerror = (error) => {
        console.error('❌ Real-time connection error:', error)
        setIsConnected(false)
        
        if (reconnectAttempts.current < maxReconnectAttempts) {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000)
          setConnectionError(`Connection lost. Reconnecting in ${delay/1000}s...`)
          
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttempts.current++
            disconnect()
            connect()
          }, delay)
        } else {
          setConnectionError('Connection failed. Please refresh the page.')
        }
      }
      
    } catch (error) {
      console.error('❌ Failed to establish real-time connection:', error)
      setConnectionError('Failed to connect to real-time updates')
    }
  }, [enabled, onNewQuestion, onNewAnswer, onQuestionUpdated, onConnected])

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      console.log('🔌 Disconnecting from real-time service')
      eventSourceRef.current.close()
      eventSourceRef.current = null
    }
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }
    
    setIsConnected(false)
    setConnectionError(null)
  }, [])

  const fetchStatus = useCallback(async () => {
    try {
      const response = await fetch('/api/realtime', { method: 'POST' })
      if (response.ok) {
        const data = await response.json()
        setActiveUsers(data.activeUsers || 0)
        setNotifications(data.notifications || [])
        setUnreadCount(data.unreadCount || 0)
      }
    } catch (error) {
      console.error('❌ Error fetching realtime status:', error)
    }
  }, [])

  // Connect on mount and when enabled changes
  useEffect(() => {
    if (enabled) {
      connect()
      fetchStatus()
    } else {
      disconnect()
    }

    return () => {
      disconnect()
    }
  }, [enabled, connect, disconnect, fetchStatus])

  // Reconnect when window regains focus
  useEffect(() => {
    const handleFocus = () => {
      if (enabled && !isConnected && reconnectAttempts.current < maxReconnectAttempts) {
        console.log('🔄 Window focused, attempting to reconnect...')
        connect()
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && enabled && !isConnected) {
        console.log('🔄 Page visible, attempting to reconnect...')
        connect()
      }
    }

    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [enabled, isConnected, connect])

  // Periodic status updates
  useEffect(() => {
    if (!isConnected) return

    const interval = setInterval(fetchStatus, 60000) // Every minute
    return () => clearInterval(interval)
  }, [isConnected, fetchStatus])

  return {
    // Connection state
    isConnected,
    connectionError,
    
    // Statistics
    activeUsers,
    notifications,
    unreadCount,
    
    // Controls
    connect,
    disconnect,
    fetchStatus,
    
    // Status
    isReconnecting: reconnectAttempts.current > 0 && reconnectAttempts.current < maxReconnectAttempts
  }
}
