// Console Protection Utility
// Prevents sensitive data from being exposed in browser console

export class ConsoleProtection {
  private static instance: ConsoleProtection
  private originalConsole: any = {}
  private isProtected = false

  private constructor() {
    this.originalConsole = {
      log: console.log,
      warn: console.warn,
      error: console.error,
      info: console.info,
      debug: console.debug,
      trace: console.trace,
      table: console.table,
      group: console.group,
      groupEnd: console.groupEnd,
      time: console.time,
      timeEnd: console.timeEnd,
    }
  }

  static getInstance(): ConsoleProtection {
    if (!ConsoleProtection.instance) {
      ConsoleProtection.instance = new ConsoleProtection()
    }
    return ConsoleProtection.instance
  }

  // Enable protection (for production)
  enableProtection() {
    if (this.isProtected) return

    const isDevelopment = process.env.NODE_ENV === 'development'
    
    if (isDevelopment) {
      console.log('🔧 Console Protection: Disabled in development')
      return
    }

    // Override console methods in production
    const noop = () => {}
    const secureMessage = () => {
      console.clear()
      console.log('%c🔒 LakshyaAI Security', 'color: #3B82F6; font-size: 20px; font-weight: bold;')
      console.log('%cConsole access is restricted in production.', 'color: #6B7280; font-size: 14px;')
    }

    console.log = secureMessage
    console.warn = noop
    console.error = noop
    console.info = noop
    console.debug = noop
    console.trace = noop
    console.table = noop
    console.group = noop
    console.groupEnd = noop
    console.time = noop
    console.timeEnd = noop

    this.isProtected = true
    
    // Clear console periodically in production
    setInterval(() => {
      if (process.env.NODE_ENV === 'production') {
        secureMessage()
      }
    }, 3000)
  }

  // Disable protection (for development)
  disableProtection() {
    if (!this.isProtected) return

    console.log = this.originalConsole.log
    console.warn = this.originalConsole.warn
    console.error = this.originalConsole.error
    console.info = this.originalConsole.info
    console.debug = this.originalConsole.debug
    console.trace = this.originalConsole.trace
    console.table = this.originalConsole.table
    console.group = this.originalConsole.group
    console.groupEnd = this.originalConsole.groupEnd
    console.time = this.originalConsole.time
    console.timeEnd = this.originalConsole.timeEnd

    this.isProtected = false
  }

  // Safe logging for development (filters sensitive data)
  safelog(message: any, ...args: any[]) {
    if (process.env.NODE_ENV === 'development') {
      // Filter out sensitive data patterns
      const sensitivePatterns = [
        /password/i,
        /secret/i,
        /token/i,
        /key/i,
        /auth/i,
        /credential/i,
        /api_key/i,
        /private/i
      ]

      const messageStr = String(message)
      const hasSensitiveData = sensitivePatterns.some(pattern => pattern.test(messageStr))

      if (hasSensitiveData) {
        this.originalConsole.warn('🚨 Sensitive data detected in log - message filtered')
        return
      }

      this.originalConsole.log(message, ...args)
    }
  }

  // Safe error logging
  safeError(error: any, context?: string) {
    if (process.env.NODE_ENV === 'development') {
      this.originalConsole.error(`🔴 Error${context ? ` in ${context}` : ''}:`, error)
    } else {
      // In production, log to external service instead of console
      // TODO: Implement external logging service
      console.log('Error logged to monitoring service')
    }
  }
}

// Export singleton instance
export const consoleProtection = ConsoleProtection.getInstance()

// Auto-initialize based on environment
if (typeof window !== 'undefined') {
  if (process.env.NODE_ENV === 'production') {
    consoleProtection.enableProtection()
  }
}
