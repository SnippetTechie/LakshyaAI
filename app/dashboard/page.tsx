'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BookOpen, Target, TrendingUp, Users, MessageSquare } from 'lucide-react'
import StudentQuestions from '@/components/StudentQuestions'

export default function Dashboard() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isCheckingRole, setIsCheckingRole] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [dbUserId, setDbUserId] = useState<string | null>(null)

  useEffect(() => {
    if (isLoaded && user) {
      checkUserRole()
    }
  }, [isLoaded, user])

  const checkUserRole = async () => {
    try {
      const response = await fetch('/api/auth/user')
      if (response.ok) {
        const userData = await response.json()

        // Handle role-based routing - redirect non-students to their dashboards
        if (userData.role === 'MENTOR_VERIFIED') {
          router.push('/mentor/dashboard')
          return
        } else if (userData.role === 'ADMIN') {
          router.push('/admin')
          return
        } else if (userData.role === 'STUDENT') {
          // Student can access this dashboard
          setUserRole(userData.role)
          setDbUserId(userData.id)
        } else if (!userData.role) {
          // No role set, redirect to onboarding for first-time setup
          router.push('/onboarding')
          return
        } else {
          // Any other role, let them access dashboard
          setUserRole(userData.role)
        }
      } else {
        // Error fetching user, redirect to onboarding
        router.push('/onboarding')
        return
      }
    } catch (error) {
      console.error('Error checking user role:', error)
      // On error, redirect to onboarding to be safe
      router.push('/onboarding')
      return
    } finally {
      setIsCheckingRole(false)
    }
  }

  if (!isLoaded || isCheckingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    router.push('/sign-in')
    return null
  }

  return (
    <div className="min-h-screen bg-background-primary pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl shadow-xl p-8 mb-8 border border-dark-400/20">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Welcome back, {user?.firstName || 'Student'}! 👋
          </h1>
          <p className="text-text-secondary text-lg">
            Ready to continue your career journey? Let's explore new opportunities and insights.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-200 hover:shadow-xl hover:border-primary-300 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-xl">
                <Target className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Simulations Completed</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-200 hover:shadow-xl hover:border-success-300 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-success-100 rounded-xl">
                <TrendingUp className="h-6 w-6 text-success-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Career Score</p>
                <p className="text-2xl font-bold text-gray-900">85%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-200 hover:shadow-xl hover:border-accent-300 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-accent-100 rounded-xl">
                <BookOpen className="h-6 w-6 text-accent-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Courses Enrolled</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-200 hover:shadow-xl hover:border-warning-300 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-warning-100 rounded-xl">
                <Users className="h-6 w-6 text-warning-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Mentor Sessions</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Q&A Section */}
        <div className="mb-8">
          {dbUserId ? (
            <StudentQuestions userId={dbUserId} />
          ) : (
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="text-center">
                <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Questions...</h3>
                <p className="text-gray-600">Setting up your Q&A section...</p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Continue Learning</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Software Developer Path</h3>
                  <p className="text-sm text-gray-600">Progress: 65%</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Continue
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Data Science Simulation</h3>
                  <p className="text-sm text-gray-600">New challenges available</p>
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  Start
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended for You</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <h3 className="font-medium text-gray-900">AI/ML Engineer Path</h3>
                <p className="text-sm text-gray-600 mb-2">Based on your interests in technology</p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                  Explore
                </button>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <h3 className="font-medium text-gray-900">Product Manager Simulation</h3>
                <p className="text-sm text-gray-600 mb-2">High demand career with great growth</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  Try Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
