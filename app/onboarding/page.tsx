'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import RoleSelector from '@/components/RoleSelector'

export default function OnboardingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isCheckingUser, setIsCheckingUser] = useState(true)

  useEffect(() => {
    if (isLoaded && user) {
      // Check if user already has a role assigned
      checkUserRole()
    }
  }, [isLoaded, user])

  const checkUserRole = async () => {
    try {
      const response = await fetch('/api/auth/user')
      if (response.ok) {
        const userData = await response.json()

        // Only redirect if user has completed onboarding
        if (userData.role === 'MENTOR_VERIFIED') {
          router.push('/mentor/dashboard')
          return
        } else if (userData.role === 'STUDENT') {
          router.push('/dashboard')
          return
        } else if (userData.role === 'ADMIN') {
          router.push('/admin')
          return
        }
        // If user exists but hasn't completed onboarding, let them select role
      }
    } catch (error) {
      console.error('Error checking user role:', error)
    } finally {
      setIsCheckingUser(false)
    }
  }

  const handleRoleSelect = async (role: 'STUDENT' | 'MENTOR_VERIFIED' | 'ADMIN') => {
    try {
      const response = await fetch('/api/auth/role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      })

      if (!response.ok) {
        throw new Error('Failed to update role')
      }

      const userData = await response.json()
      return userData
    } catch (error) {
      console.error('Error updating role:', error)
      throw error
    }
  }

  if (!isLoaded || isCheckingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Setting up your account...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    router.push('/sign-in')
    return null
  }

  return <RoleSelector onRoleSelect={handleRoleSelect} />
}
