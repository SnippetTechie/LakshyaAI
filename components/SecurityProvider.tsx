'use client'

import { useEffect } from 'react'

export default function SecurityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Disable right-click context menu
    const disableRightClick = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    const disableDevTools = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C')
      ) {
        e.preventDefault()
        return false
      }
    }

    // Disable text selection
    const disableSelection = () => {
      document.onselectstart = () => false
      document.ondragstart = () => false
    }

    // Clear console periodically in production
    const clearConsole = () => {
      if (process.env.NODE_ENV === 'production') {
        setInterval(() => {
          console.clear()
          console.log('%cAccess Denied!', 'color: red; font-size: 40px; font-weight: bold;')
          console.log('%cThis is a secure application. Unauthorized access is prohibited.', 'color: red; font-size: 16px;')
        }, 1000)
      }
    }

    // Detect developer tools
    const detectDevTools = () => {
      let devtools = { open: false, orientation: null }
      const threshold = 160

      setInterval(() => {
        if (
          window.outerHeight - window.innerHeight > threshold ||
          window.outerWidth - window.innerWidth > threshold
        ) {
          if (!devtools.open) {
            devtools.open = true
            if (process.env.NODE_ENV === 'production') {
              alert('Developer tools detected! This action has been logged.')
              // You can add logging here to track attempts
            }
          }
        } else {
          devtools.open = false
        }
      }, 500)
    }

    // Override console methods in production
    const overrideConsole = () => {
      if (process.env.NODE_ENV === 'production') {
        const noop = () => {}
        console.log = noop
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
      }
    }

    // Initialize security measures
    document.addEventListener('contextmenu', disableRightClick)
    document.addEventListener('keydown', disableDevTools)
    disableSelection()
    clearConsole()
    detectDevTools()
    overrideConsole()

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', disableRightClick)
      document.removeEventListener('keydown', disableDevTools)
      document.onselectstart = null
      document.ondragstart = null
    }
  }, [])

  return <>{children}</>
}
