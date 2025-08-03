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
    <section id="home" className="relative min-h-screen pt-16 pb-8 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-100/20 to-accent-100/20"></div>
        </div>

        <div className="absolute w-16 h-16 rounded-full top-20 left-4 sm:left-10 sm:w-20 sm:h-20 bg-gradient-to-r from-primary-500 to-accent-500 opacity-20 animate-pulse"></div>
        <div className="absolute w-12 h-12 rounded-full top-40 right-4 sm:right-20 sm:w-16 sm:h-16 bg-gradient-to-r from-accent-400 to-error-400 opacity-20 animate-pulse"></div>
        <div className="absolute w-10 h-10 rounded-full bottom-40 left-4 sm:left-20 sm:w-12 sm:h-12 bg-gradient-to-r from-success-400 to-primary-500 opacity-20 animate-pulse"></div>
      </div>

      <div className="relative px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-12rem)]">
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full bg-slate/80 backdrop-blur-sm border-primary-500/30">
              <Sparkles className="text-primary-400" size={16} />
              <span className="text-sm font-medium text-primary-300">India's #1 Career Guidance Platform</span>
            </div>

            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl font-space-grotesk">
              <span className="block text-text-primary font-poppins">
                India's youth deserve better{' '}
                <span className="font-bold text-transparent bg-gradient-to-r from-primary-600 via-accent-600 to-primary-800 bg-clip-text">
                  career clarity
                </span>
              </span>
              <span className="block mb-2 text-xl font-extrabold sm:text-2xl md:text-3xl lg:text-4xl text-slate-700 font-space-grotesk">
                <span className="font-black tracking-tight text-transparent bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text">
                  LakshyaAI
                </span>{' '}
                makes it possible
              </span>
            </h1>

            <p className="max-w-2xl text-base leading-relaxed sm:text-lg md:text-xl text-text-secondary font-inter">
              Experience real career tasks, compare opportunities, and plan your future with
              <span className="font-semibold text-primary-500 font-poppins"> AI-powered insights</span> – not random advice.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={handleStartJourney}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 transform group bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 sm:px-6 rounded-xl hover:scale-105 hover:shadow-2xl sm:text-base"
              >
                <Target size={18} />
                Start My Journey
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>

              <button className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-all duration-300 border-2 group bg-background-secondary/80 backdrop-blur-sm border-primary-500/30 hover:border-primary-500 text-primary-400 sm:px-6 rounded-xl hover:bg-background-secondary sm:text-base">
                <Users size={18} />
                Join 50K+ Students
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 sm:gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600 sm:text-2xl">50K+</div>
                <div className="text-xs text-gray-600 sm:text-sm">Students Guided</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600 sm:text-2xl">100+</div>
                <div className="text-xs text-gray-600 sm:text-sm">Career Paths</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600 sm:text-2xl">95%</div>
                <div className="text-xs text-gray-600 sm:text-sm">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 lg:justify-end lg:mt-0">
            <div className="relative w-full max-w-lg">
              <div className="w-full p-4 border shadow-2xl bg-white/90 backdrop-blur-lg rounded-3xl sm:p-6 border-white/20">
                <div className="mb-4 text-center sm:mb-6">
                  <h3 className="mb-2 text-lg font-bold text-gray-800 sm:text-xl">
                    Explore Career Paths
                  </h3>
                  <p className="text-xs text-gray-600 sm:text-sm">
                    Click on any career to discover opportunities
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 sm:gap-3">
                  {careerPaths.map((career) => (
                    <button
                      key={career.id}
                      onClick={() => handleCareerSelect(career.id)}
                      className={`group relative p-3 sm:p-4 rounded-2xl transition-all duration-500 hover:scale-105 transform ${
                        selectedCareer === career.id
                          ? 'bg-gradient-to-br ' + career.color + ' text-white shadow-2xl'
                          : 'bg-gray-50 hover:bg-white hover:shadow-lg'
                      }`}
                    >
                      <div className="text-center">
                        <div className="mb-1 text-2xl transition-transform duration-300 sm:text-3xl sm:mb-2 group-hover:scale-110">
                          {career.emoji}
                        </div>
                        <div className={`font-bold text-xs sm:text-sm mb-1 ${
                          selectedCareer === career.id ? 'text-white' : 'text-gray-800'
                        }`}>
                          {career.label}
                        </div>
                        <div className={`text-xs ${
                          selectedCareer === career.id ? 'text-white/90' : 'text-gray-500'
                        }`}>
                          {career.description}
                        </div>
                        <div className={`text-xs font-semibold mt-1 sm:mt-2 ${
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
                  <div className="p-3 border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 sm:p-4 rounded-2xl animate-fade-in-up">
                    <div className="flex items-center gap-2 mb-2 sm:gap-3 sm:mb-3">
                      <TrendingUp className="text-blue-600" size={18} />
                      <span className="text-sm font-semibold text-blue-800 sm:text-base">Career Insights</span>
                    </div>
                    <p className="text-xs leading-relaxed text-blue-700 sm:text-sm">
                      Excellent choice! The {careerPaths.find(c => c.id === selectedCareer)?.label} path offers
                      great opportunities. Let's explore simulations, salary trends, and growth prospects together.
                    </p>
                    <button className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-3 text-xs font-semibold text-white transition-all duration-300 sm:mt-4 bg-gradient-to-r from-blue-600 to-purple-600 sm:py-3 rounded-xl sm:text-sm hover:from-blue-700 hover:to-purple-700">
                      <Target size={14} />
                      Explore This Path
                    </button>
                  </div>
                )}
              </div>

              <div className="absolute w-6 h-6 rounded-full -top-2 sm:-top-4 -left-2 sm:-left-4 sm:w-8 sm:h-8 bg-gradient-to-r from-pink-400 to-red-500 opacity-60 animate-pulse"></div>
              <div className="absolute w-4 h-4 rounded-full -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 sm:w-6 sm:h-6 bg-gradient-to-r from-green-400 to-blue-500 opacity-60 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection