'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import { User, GraduationCap, Briefcase, Target, ArrowRight } from 'lucide-react'

export default function Onboarding() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<'STUDENT' | 'MENTOR_PENDING' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const checkUserRole = useCallback(async () => {
    try {
      console.log('🔍 Onboarding: Checking if user already has role...')
      const response = await fetch('/api/auth/user')

      if (response.ok) {
        const userData = await response.json()
        console.log('✅ Onboarding: User data received:', { id: userData.id, role: userData.role })

        if (userData.role) {
          // User already has a role, redirect to appropriate dashboard
          console.log('🔄 Onboarding: User already has role, redirecting...')
          if (userData.role === 'MENTOR_VERIFIED') {
            router.push('/mentor/dashboard')
          } else if (userData.role === 'STUDENT') {
            router.push('/dashboard')
          } else {
            router.push('/dashboard')
          }
          return
        }
      }
    } catch (error) {
      console.error('Error checking user role:', error)
    }
  }, [router])

  useEffect(() => {
    checkUserRole()
  }, [checkUserRole])

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

  if (!isLoaded || isSubmitting) {
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
