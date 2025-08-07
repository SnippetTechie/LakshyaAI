'use client'

import { useState } from 'react'
import { TrendingUp, MapPin, DollarSign, GraduationCap, Briefcase, Star, ChevronRight } from 'lucide-react'

interface LifeMilestone {
  year: number
  age: number
  title: string
  description: string
  salary: string
  type: 'education' | 'career' | 'achievement' | 'decision'
  icon: any
}

const sampleCareerPath: LifeMilestone[] = [
  {
    year: 2024,
    age: 18,
    title: 'Start Engineering Degree',
    description: 'Begin Computer Science Engineering at top university',
    salary: '₹0',
    type: 'education',
    icon: GraduationCap
  },
  {
    year: 2026,
    age: 20,
    title: 'First Internship',
    description: 'Summer internship at tech startup, learn real-world coding',
    salary: '₹15,000/month',
    type: 'career',
    icon: Briefcase
  },
  {
    year: 2028,
    age: 22,
    title: 'Graduate & First Job',
    description: 'Join as Software Developer at MNC company',
    salary: '₹8,00,000/year',
    type: 'achievement',
    icon: Star
  },
  {
    year: 2030,
    age: 24,
    title: 'Senior Developer',
    description: 'Promotion to Senior Software Developer, lead small team',
    salary: '₹15,00,000/year',
    type: 'career',
    icon: TrendingUp
  },
  {
    year: 2032,
    age: 26,
    title: 'Career Decision Point',
    description: 'Choose: Stay technical or move to management?',
    salary: '₹22,00,000/year',
    type: 'decision',
    icon: MapPin
  },
  {
    year: 2034,
    age: 28,
    title: 'Tech Lead / Manager',
    description: 'Lead engineering team of 8+ developers',
    salary: '₹35,00,000/year',
    type: 'career',
    icon: Briefcase
  }
]

export default function VisualLifeGraph() {
  const [selectedPath, setSelectedPath] = useState<'software' | 'data-science' | 'product' | 'custom'>('software')
  const [showBuilder, setShowBuilder] = useState(false)

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'education': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'career': return 'bg-green-100 text-green-700 border-green-200'
      case 'achievement': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'decision': return 'bg-orange-100 text-orange-700 border-orange-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const formatSalary = (salary: string) => {
    if (salary === '₹0') return 'No Income'
    return salary
  }

  if (showBuilder) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Build Your Life Graph</h2>
          <p className="text-gray-600">Answer a few questions to create your personalized 10-year career plan</p>
        </div>

        <div className="max-w-md mx-auto space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What's your current education level?
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>12th Grade</option>
              <option>1st Year College</option>
              <option>2nd Year College</option>
              <option>3rd Year College</option>
              <option>Final Year College</option>
              <option>Graduate</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Which field interests you most?
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Software Development</option>
              <option>Data Science & AI</option>
              <option>Product Management</option>
              <option>Digital Marketing</option>
              <option>Finance & Banking</option>
              <option>Healthcare</option>
              <option>Design & Creative</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What's your target salary in 5 years?
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>₹10-15 Lakhs</option>
              <option>₹15-25 Lakhs</option>
              <option>₹25-40 Lakhs</option>
              <option>₹40+ Lakhs</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowBuilder(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => {
                setShowBuilder(false)
                alert('🎉 Your personalized life graph has been created! This would show a customized career path based on your inputs.')
              }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Build My Graph
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Visual Life Graph</h2>
        <p className="text-gray-600 mb-4">
          View your 10-year career plan with milestones, salary progression, and key decision points.
        </p>

        <div className="flex gap-2 mb-4">
          {[
            { id: 'software', label: 'Software Dev' },
            { id: 'data-science', label: 'Data Science' },
            { id: 'product', label: 'Product Mgmt' }
          ].map((path) => (
            <button
              key={path.id}
              onClick={() => setSelectedPath(path.id as any)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedPath === path.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {path.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

        <div className="space-y-6">
          {sampleCareerPath.map((milestone, index) => {
            const IconComponent = milestone.icon
            
            return (
              <div key={index} className="relative flex items-start gap-4">
                {/* Timeline dot */}
                <div className="relative z-10 w-16 h-16 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <IconComponent size={20} className="text-blue-600" />
                </div>

                {/* Content */}
                <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{milestone.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(milestone.type)}`}>
                          {milestone.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{milestone.year}</p>
                      <p className="text-xs text-gray-500">Age {milestone.age}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-green-600">
                      <DollarSign size={14} />
                      <span className="text-sm font-medium">{formatSalary(milestone.salary)}</span>
                    </div>
                    
                    {milestone.type === 'decision' && (
                      <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        Explore options <ChevronRight size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setShowBuilder(true)}
          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Build My Custom Graph
        </button>
        <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Download PDF
        </button>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Pro Tips:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Career paths are flexible - you can pivot at decision points</li>
          <li>• Salary ranges vary by company, location, and skills</li>
          <li>• Consider both technical and leadership growth tracks</li>
          <li>• Plan for continuous learning and skill upgrades</li>
        </ul>
      </div>
    </div>
  )
}
