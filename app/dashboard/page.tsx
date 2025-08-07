'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BookOpen, Target, TrendingUp, Users, MessageSquare, Bot, Play, BarChart3, Sparkles, Zap, Trophy, Brain } from 'lucide-react'
import StudentQuestions from '@/components/StudentQuestions'
import CareerChatBot from '@/components/CareerChatBot'
import CareerSimulation from '@/components/CareerSimulation'
import VisualLifeGraph from '@/components/VisualLifeGraph'

export default function Dashboard() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isCheckingRole, setIsCheckingRole] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [dbUserId, setDbUserId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'career-guide' | 'simulation' | 'life-graph' | 'mentor-connect'>('overview')

  useEffect(() => {
    if (isLoaded && user) {
      checkUserRole()
    }
  }, [isLoaded, user])

  const checkUserRole = async () => {
    try {
      console.log('🔍 Dashboard: Checking user role...')
      const response = await fetch('/api/auth/user')

      if (response.ok) {
        const userData = await response.json()
        console.log('✅ Dashboard: User data received:', { id: userData.id, role: userData.role, name: userData.name })

        // Handle role-based routing - redirect non-students to their dashboards
        if (userData.role === 'MENTOR_VERIFIED') {
          console.log('🔄 Dashboard: Redirecting verified mentor to mentor dashboard')
          router.push('/mentor/dashboard')
          return
        } else if (userData.role === 'ADMIN') {
          console.log('🔄 Dashboard: Redirecting admin to admin dashboard')
          router.push('/admin')
          return
        } else if (userData.role === 'STUDENT') {
          // Student can access this dashboard
          console.log('✅ Dashboard: Student role confirmed, setting up dashboard')
          setUserRole(userData.role)
          setDbUserId(userData.id)
        } else if (!userData.role) {
          // No role set, redirect to onboarding for first-time setup
          console.log('🔄 Dashboard: No role set, redirecting to onboarding')
          router.push('/onboarding')
          return
        } else {
          // Any other role (MENTOR_PENDING), let them access dashboard
          console.log('✅ Dashboard: Other role detected:', userData.role)
          setUserRole(userData.role)
          setDbUserId(userData.id)
        }
      } else {
        console.error('❌ Dashboard: Error fetching user data:', response.status)
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
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.firstName || 'Student'}! 👋
          </h1>
          <p className="text-blue-100 text-lg">
            Ready to continue your career journey? Let's explore new opportunities and insights.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8 border border-gray-200">
          <div className="flex overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'career-guide', label: 'Career Guide', icon: Bot },
              { id: 'simulation', label: 'Career Simulation', icon: Play },
              { id: 'life-graph', label: 'Visual Life Graph', icon: TrendingUp },
              { id: 'mentor-connect', label: 'Mentor Connect', icon: MessageSquare }
            ].map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent size={18} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Stats Cards - Only show on overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Simulations Completed</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Career Score</p>
                  <p className="text-2xl font-bold text-gray-900">85%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Courses Enrolled</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Mentor Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Sparkles className="text-blue-600" size={20} />
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setActiveTab('career-guide')}
                      className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left"
                    >
                      <Bot className="text-blue-600" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Ask Career Guide</p>
                        <p className="text-sm text-gray-600">Get instant AI-powered career advice</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab('simulation')}
                      className="w-full flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left"
                    >
                      <Play className="text-green-600" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Try Career Simulation</p>
                        <p className="text-sm text-gray-600">Experience real career tasks</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab('life-graph')}
                      className="w-full flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left"
                    >
                      <TrendingUp className="text-purple-600" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Build Life Graph</p>
                        <p className="text-sm text-gray-600">Visualize your 10-year career plan</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Trophy className="text-yellow-600" size={20} />
                  Recent Achievements
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Trophy size={16} className="text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Completed Software Dev Challenge</p>
                      <p className="text-sm text-gray-600">Earned 100 points • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Brain size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Career Assessment Completed</p>
                      <p className="text-sm text-gray-600">Discovered 3 new career matches • 1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'career-guide' && <CareerChatBot />}
          {activeTab === 'simulation' && <CareerSimulation />}
          {activeTab === 'life-graph' && <VisualLifeGraph />}
          {activeTab === 'mentor-connect' && dbUserId && <StudentQuestions userId={dbUserId} />}
        </div>
      </div>
    </div>
  )
}
