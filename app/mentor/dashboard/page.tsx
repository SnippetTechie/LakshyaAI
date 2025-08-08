'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import { MessageCircle, Award, Users, Star, TrendingUp, Target, BookOpen, Zap } from 'lucide-react'
import MentorQuestions from '@/components/MentorQuestions'

interface MentorStats {
  totalAnswers: number
  helpfulVotes: number
  rating: number
  studentsHelped: number
}

export default function MentorDashboard() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [mentorId, setMentorId] = useState<string | null>(null)
  const [stats, setStats] = useState<MentorStats>({
    totalAnswers: 0,
    helpfulVotes: 0,
    rating: 0,
    studentsHelped: 0
  })

  const fetchMentorData = useCallback(async () => {
    try {
      console.log('🔍 MentorDashboard: Fetching mentor data...')
      const response = await fetch('/api/auth/user')

      if (response.ok) {
        const userData = await response.json()
        console.log('✅ MentorDashboard: User data received:', { id: userData.id, role: userData.role })

        if (userData.role === 'MENTOR_VERIFIED' || userData.role === 'MENTOR_PENDING') {
          console.log('✅ MentorDashboard: Mentor role confirmed')
          setMentorId(userData.id)

          // Try to set up mentor profile if needed
          try {
            const setupResponse = await fetch('/api/mentors/quick-setup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                currentTitle: 'Professional',
                currentCompany: 'Industry Expert',
                yearsOfExperience: '3-5',
                expertise: ['General Career Guidance'],
                bio: 'Experienced professional ready to help students with career guidance.'
              }),
            })

            if (setupResponse.ok) {
              const setupData = await setupResponse.json()
              console.log('✅ Mentor profile created:', setupData.mentor.id)
              setMentorId(setupData.mentor.id)
            } else {
              console.error('❌ Failed to create mentor profile')
            }
          } catch (error) {
            console.error('❌ Error creating mentor profile:', error)
          }
        } else {
          // Error fetching user, redirect to onboarding
          router.push('/onboarding')
          return
        }

        // For demo, use mock data
        setStats({
          totalAnswers: 12,
          helpfulVotes: 28,
          rating: 4.8,
          studentsHelped: 15
        })
      } else {
        // Error fetching user, redirect to onboarding
        router.push('/onboarding')
        return
      }
    } catch (error) {
      console.error('Error fetching mentor data:', error)
      router.push('/onboarding')
    } finally {
      setIsLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchMentorData()
  }, [fetchMentorData])

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading mentor dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    router.push('/sign-in')
    return null
  }

  const statCards = [
    {
      title: 'Questions Answered',
      value: stats.totalAnswers,
      icon: MessageCircle,
      color: 'text-primary-400',
      bg: 'bg-primary-500/10',
      border: 'border-primary-500/20'
    },
    {
      title: 'Helpful Votes',
      value: stats.helpfulVotes,
      icon: Award,
      color: 'text-success-400',
      bg: 'bg-success-500/10',
      border: 'border-success-500/20'
    },
    {
      title: 'Students Helped',
      value: stats.studentsHelped,
      icon: Users,
      color: 'text-accent-400',
      bg: 'bg-accent-500/10',
      border: 'border-accent-500/20'
    },
    {
      title: 'Rating',
      value: `${stats.rating}/5.0`,
      icon: Star,
      color: 'text-warning-400',
      bg: 'bg-warning-500/10',
      border: 'border-warning-500/20'
    }
  ]



  const upcomingEvents = [
    {
      id: 1,
      title: "Career Guidance Webinar",
      date: "Tomorrow, 3:00 PM",
      type: "Webinar",
      participants: 45
    },
    {
      id: 2,
      title: "1-on-1 Mentoring Session",
      date: "Dec 8, 2:00 PM",
      type: "Personal",
      participants: 1
    },
    {
      id: 3,
      title: "Tech Industry Panel Discussion",
      date: "Dec 10, 4:00 PM",
      type: "Panel",
      participants: 120
    }
  ]

  const achievements = [
    {
      title: "Top Mentor",
      description: "Top 10% of mentors this month",
      icon: "🏆",
      color: "from-yellow-50 to-orange-50",
      border: "border-yellow-200"
    },
    {
      title: "Helpful Answers",
      description: "25+ helpful votes received",
      icon: "👍",
      color: "from-green-50 to-emerald-50",
      border: "border-green-200"
    },
    {
      title: "Active Contributor",
      description: "Answered 10+ questions",
      icon: "💬",
      color: "from-blue-50 to-cyan-50",
      border: "border-blue-200"
    }
  ]

  return (
    <div className="min-h-screen bg-background-primary pt-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-gradient-to-r from-primary-50 via-accent-50 to-success-50 shadow-xl border border-dark-400/20 rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
                Welcome, Mentor {user.firstName}! 🎯
              </h1>
              <p className="text-text-secondary mt-2 text-lg">
                Help students discover their career paths
              </p>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-success-500/10 border border-success-500/30 rounded-xl shadow-lg">
              <CheckCircle className="text-success-400" size={20} />
              <span className="text-success-300 font-semibold">Verified Mentor</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <IconComponent className={stat.color} size={24} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Main Q&A Section - Full Width */}
        <div className="w-full">
          <MentorQuestions mentorId={mentorId || 'temp'} />
        </div>


      </div>
    </div>
  )
}
