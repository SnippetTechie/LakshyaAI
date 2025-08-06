'use client'

import { useState, useCallback } from 'react'

interface Toast {
  id: string
  type: 'success' | 'error' | 'info'
  title: string
  message: string
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((
    title: string, 
    message: string, 
    type: 'success' | 'error' | 'info' = 'info',
    duration: number = 5000
  ) => {
    const id = Date.now().toString()
    const toast: Toast = { id, title, message, type, duration }
    
    console.log('🍞 Toast:', type, title, message)
    setToasts(prev => [...prev, toast])
    
    // Auto remove after duration
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const showSuccess = useCallback((title: string, message: string) => {
    showToast(title, message, 'success')
  }, [showToast])

  const showError = useCallback((title: string, message: string) => {
    showToast(title, message, 'error')
  }, [showToast])

  const showInfo = useCallback((title: string, message: string) => {
    showToast(title, message, 'info')
  }, [showToast])

  return {
    toasts,
    showToast,
    showSuccess,
    showError,
    showInfo,
    removeToast
  }
}
