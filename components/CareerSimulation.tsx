'use client'

import { useState } from 'react'
import { Play, Trophy, Clock, Star, ChevronRight, Code, Stethoscope, TrendingUp, Palette, Calculator, Users } from 'lucide-react'

interface CareerChallenge {
  id: string
  career: string
  title: string
  description: string
  icon: any
  difficulty: 'Easy' | 'Medium' | 'Hard'
  duration: string
  points: number
  skills: string[]
  preview: string
}

const careerChallenges: CareerChallenge[] = [
  {
    id: 'software-dev',
    career: 'Software Developer',
    title: 'Build a Simple Calculator',
    description: 'Experience what it\'s like to code by building a functional calculator with HTML, CSS, and JavaScript.',
    icon: Code,
    difficulty: 'Easy',
    duration: '15 mins',
    points: 100,
    skills: ['Problem Solving', 'Logic', 'Attention to Detail'],
    preview: 'Create buttons, handle user input, perform calculations, and display results.'
  },
  {
    id: 'doctor',
    career: 'Medical Doctor',
    title: 'Diagnose Patient Symptoms',
    description: 'Step into a doctor\'s shoes and diagnose patients based on their symptoms and medical history.',
    icon: Stethoscope,
    difficulty: 'Medium',
    duration: '20 mins',
    points: 150,
    skills: ['Critical Thinking', 'Pattern Recognition', 'Decision Making'],
    preview: 'Analyze symptoms, ask relevant questions, order tests, and make accurate diagnoses.'
  },
  {
    id: 'data-scientist',
    career: 'Data Scientist',
    title: 'Predict Sales Trends',
    description: 'Analyze sales data and create predictions using basic data science techniques and visualization.',
    icon: TrendingUp,
    difficulty: 'Medium',
    duration: '25 mins',
    points: 175,
    skills: ['Analytical Thinking', 'Statistics', 'Data Interpretation'],
    preview: 'Clean data, identify patterns, create charts, and make business recommendations.'
  },
  {
    id: 'graphic-designer',
    career: 'Graphic Designer',
    title: 'Design a Brand Logo',
    description: 'Create a professional logo for a startup company using design principles and creativity.',
    icon: Palette,
    difficulty: 'Easy',
    duration: '18 mins',
    points: 120,
    skills: ['Creativity', 'Visual Communication', 'Brand Understanding'],
    preview: 'Choose colors, select fonts, create shapes, and design a memorable brand identity.'
  },
  {
    id: 'financial-analyst',
    career: 'Financial Analyst',
    title: 'Investment Portfolio Analysis',
    description: 'Analyze different investment options and create a balanced portfolio for a client.',
    icon: Calculator,
    difficulty: 'Hard',
    duration: '30 mins',
    points: 200,
    skills: ['Financial Analysis', 'Risk Assessment', 'Strategic Thinking'],
    preview: 'Evaluate stocks, bonds, and mutual funds to create an optimal investment strategy.'
  },
  {
    id: 'marketing-manager',
    career: 'Marketing Manager',
    title: 'Launch Campaign Strategy',
    description: 'Plan and execute a marketing campaign for a new product launch targeting young adults.',
    icon: Users,
    difficulty: 'Medium',
    duration: '22 mins',
    points: 160,
    skills: ['Strategic Planning', 'Consumer Psychology', 'Communication'],
    preview: 'Define target audience, choose marketing channels, create content, and set KPIs.'
  }
]

export default function CareerSimulation() {
  const [selectedChallenge, setSelectedChallenge] = useState<CareerChallenge | null>(null)
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const startChallenge = (challenge: CareerChallenge) => {
    setSelectedChallenge(challenge)
    // In a real implementation, this would navigate to the challenge interface
    setTimeout(() => {
      setCompletedChallenges(prev => [...prev, challenge.id])
      setSelectedChallenge(null)
      alert(`🎉 Congratulations! You've completed the ${challenge.title} challenge and earned ${challenge.points} points!`)
    }, 2000) // Simulate challenge completion
  }

  if (selectedChallenge) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <selectedChallenge.icon size={32} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedChallenge.title}</h3>
          <p className="text-gray-600 mb-6">Starting your {selectedChallenge.career} simulation...</p>
          
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <div className="animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full animate-bounce mr-2"></div>
              <div className="w-8 h-8 bg-blue-600 rounded-full animate-bounce mr-2" style={{animationDelay: '0.1s'}}></div>
              <div className="w-8 h-8 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <p className="text-blue-800 mt-4 font-medium">Loading interactive challenge...</p>
          </div>

          <button
            onClick={() => setSelectedChallenge(null)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Career Simulation</h2>
        <p className="text-gray-600">
          Try tasks from real careers through interactive challenges and mini-games to see what fits you.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {careerChallenges.map((challenge) => {
          const isCompleted = completedChallenges.includes(challenge.id)
          const IconComponent = challenge.icon

          return (
            <div
              key={challenge.id}
              className={`border rounded-lg p-4 transition-all hover:shadow-md ${
                isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isCompleted ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {isCompleted ? (
                    <Trophy size={24} className="text-green-600" />
                  ) : (
                    <IconComponent size={24} className="text-blue-600" />
                  )}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-1">{challenge.title}</h3>
              <p className="text-sm text-blue-600 mb-2">{challenge.career}</p>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{challenge.description}</p>

              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  {challenge.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Star size={12} />
                  {challenge.points} pts
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Skills you'll practice:</p>
                <div className="flex flex-wrap gap-1">
                  {challenge.skills.slice(0, 2).map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                  {challenge.skills.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      +{challenge.skills.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => startChallenge(challenge)}
                disabled={isCompleted}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  isCompleted
                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isCompleted ? (
                  <>
                    <Trophy size={16} />
                    Completed
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    Try Challenge
                  </>
                )}
              </button>
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">🎯 How it works:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Choose a career challenge that interests you</li>
          <li>• Complete interactive tasks similar to real job responsibilities</li>
          <li>• Earn points and discover which careers match your skills</li>
          <li>• Get personalized recommendations based on your performance</li>
        </ul>
      </div>
    </div>
  )
}
