'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GraduationCap, Users } from 'lucide-react'

interface RoleSelectorProps {
  onRoleSelect: (role: 'STUDENT' | 'MENTOR_VERIFIED' | 'ADMIN') => Promise<void>
}

const roles = [
  {
    id: 'STUDENT' as const,
    title: 'Student',
    description: 'I want to explore careers and get guidance',
    icon: GraduationCap,
    color: 'from-blue-500 to-cyan-500',
    features: [
      'Try career simulations',
      'Ask questions to mentors',
      'Build life graph',
      'Compare careers'
    ]
  },
  {
    id: 'MENTOR_VERIFIED' as const,
    title: 'Mentor',
    description: 'I want to help others with career guidance',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
    features: [
      'Answer student questions',
      'Share professional experience',
      'Build reputation',
      'Help the community'
    ]
  }
]

export default function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  const [selectedRole, setSelectedRole] = useState<'STUDENT' | 'MENTOR_VERIFIED' | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleRoleSelect = async (role: 'STUDENT' | 'MENTOR_VERIFIED') => {
    setSelectedRole(role)
    setIsLoading(true)

    try {
      // Update role in database
      await onRoleSelect(role)

      // Direct redirect based on role - NO FORMS!
      if (role === 'STUDENT') {
        router.push('/dashboard')
      } else {
        // For mentors, create mentor profile directly and go to dashboard
        await createMentorProfile()
        router.push('/mentor/dashboard')
      }
    } catch (error) {
      console.error('Error selecting role:', error)
      alert('Error setting up your account. Please try again.')
      setIsLoading(false)
    }
  }

  const createMentorProfile = async () => {
    try {
      // Create mentor profile with default values - no form needed
      await fetch('/api/mentors/quick-setup', {
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
    } catch (error) {
      console.error('Error creating mentor profile:', error)
      throw error
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20 pb-8 px-4">
      <div className="max-w-6xl mx-auto mt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">LakshyaAI</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Choose your role to get started with your career journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {roles.map((role) => {
            const IconComponent = role.icon
            const isSelected = selectedRole === role.id
            const isDisabled = isLoading && !isSelected

            return (
              <div
                key={role.id}
                className={`relative bg-white rounded-2xl p-6 md:p-8 shadow-xl border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                  isSelected
                    ? 'border-blue-500 ring-4 ring-blue-200'
                    : 'border-gray-200 hover:border-blue-300'
                } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !isDisabled && handleRoleSelect(role.id)}
              >
                {isLoading && isSelected && (
                  <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                )}

                <div className="text-center mb-4">
                  <div className={`inline-flex p-3 md:p-4 rounded-full bg-gradient-to-r ${role.color} text-white mb-3`}>
                    <IconComponent size={28} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{role.title}</h3>
                  <p className="text-sm md:text-base text-gray-600">{role.description}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <h4 className="font-semibold text-gray-900 text-sm md:text-base">What you can do:</h4>
                  <ul className="space-y-1">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-xs md:text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <button
                    className={`w-full py-2.5 md:py-3 px-4 md:px-6 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    disabled={isDisabled}
                  >
                    {isSelected && isLoading ? 'Setting up...' : `Continue as ${role.title}`}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-6">
          <p className="text-xs md:text-sm text-gray-500">
            You can change your role later in your profile settings
          </p>
        </div>
      </div>
    </div>
  )
}
