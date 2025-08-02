'use client'

import { useState } from 'react'
import { ArrowRight, Sparkles, Target, TrendingUp, Users } from 'lucide-react'

const careerPaths = [
  {
    id: 'doctor',
    emoji: '👨‍⚕️',
    label: 'Doctor',
    description: 'Heal and save lives',
    color: 'from-red-400 to-pink-500',
    stats: '₹12L+ avg salary'
  },
  {
    id: 'engineer',
    emoji: '👨‍💻',
    label: 'Engineer',
    description: 'Build the future',
    color: 'from-blue-400 to-cyan-500',
    stats: '₹8L+ avg salary'
  },
  {
    id: 'designer',
    emoji: '🎨',
    label: 'Designer',
    description: 'Create beautiful experiences',
    color: 'from-purple-400 to-pink-500',
    stats: '₹6L+ avg salary'
  },
  {
    id: 'ias',
    emoji: '⚖️',
    label: 'IAS Officer',
    description: 'Serve the nation',
    color: 'from-green-400 to-emerald-500',
    stats: '₹15L+ total package'
  },
  {
    id: 'teacher',
    emoji: '👨‍🏫',
    label: 'Teacher',
    description: 'Shape young minds',
    color: 'from-yellow-400 to-orange-500',
    stats: '₹4L+ avg salary'
  },
  {
    id: 'lawyer',
    emoji: '👨‍💼',
    label: 'Lawyer',
    description: 'Fight for justice',
    color: 'from-indigo-400 to-purple-500',
    stats: '₹10L+ avg salary'
  },
]

const HeroSection = () => {
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null)

  const handleStartJourney = () => {
    console.log('Starting career journey...')
  }

  const handleCareerSelect = (careerId: string) => {
    setSelectedCareer(careerId)
    console.log('Selected career:', careerId)
  }

  return (
    <section id="home" className="h-screen pt-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-100/20 to-purple-100/20"></div>
        </div>

        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200">
              <Sparkles className="text-blue-500" size={16} />
              <span className="text-sm font-medium text-blue-700">India's #1 Career Guidance Platform</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-space-grotesk">
              <span className="block text-gray-900 mb-2 font-poppins">
                India's youth deserve better{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent font-bold">
                  career clarity
                </span>
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-2 font-space-grotesk">
                <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent font-black tracking-tight">
                  LakshyaAI
                </span>{' '}
                makes it possible
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl font-inter">
              Experience real career tasks, compare opportunities, and plan your future with
              <span className="font-semibold text-blue-600 font-poppins"> AI-powered insights</span> – not random advice.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleStartJourney}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl inline-flex items-center gap-2"
              >
                <Target size={20} />
                Start My Journey
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group bg-white/80 backdrop-blur-sm border-2 border-blue-200 hover:border-blue-400 text-blue-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-white inline-flex items-center gap-2">
                <Users size={20} />
                Join 50K+ Students
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">50K+</div>
                <div className="text-xs text-gray-600">Students Guided</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">100+</div>
                <div className="text-xs text-gray-600">Career Paths</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">95%</div>
                <div className="text-xs text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 max-w-lg w-full">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Explore Career Paths
                  </h3>
                  <p className="text-sm text-gray-600">
                    Click on any career to discover opportunities
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {careerPaths.map((career) => (
                    <button
                      key={career.id}
                      onClick={() => handleCareerSelect(career.id)}
                      className={`group relative p-4 rounded-2xl transition-all duration-500 hover:scale-105 transform ${
                        selectedCareer === career.id
                          ? 'bg-gradient-to-br ' + career.color + ' text-white shadow-2xl'
                          : 'bg-gray-50 hover:bg-white hover:shadow-lg'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                          {career.emoji}
                        </div>
                        <div className={`font-bold text-sm mb-1 ${
                          selectedCareer === career.id ? 'text-white' : 'text-gray-800'
                        }`}>
                          {career.label}
                        </div>
                        <div className={`text-xs ${
                          selectedCareer === career.id ? 'text-white/90' : 'text-gray-500'
                        }`}>
                          {career.description}
                        </div>
                        <div className={`text-xs font-semibold mt-2 ${
                          selectedCareer === career.id ? 'text-white' : 'text-blue-600'
                        }`}>
                          {career.stats}
                        </div>
                      </div>

                      {selectedCareer === career.id && (
                        <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse"></div>
                      )}
                    </button>
                  ))}
                </div>

                {selectedCareer && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl animate-fade-in-up border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingUp className="text-blue-600" size={20} />
                      <span className="font-semibold text-blue-800">Career Insights</span>
                    </div>
                    <p className="text-sm text-blue-700 leading-relaxed">
                      Excellent choice! The {careerPaths.find(c => c.id === selectedCareer)?.label} path offers
                      great opportunities. Let's explore simulations, salary trends, and growth prospects together.
                    </p>
                    <button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2">
                      <Target size={16} />
                      Explore This Path
                    </button>
                  </div>
                )}
              </div>

              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-60 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection