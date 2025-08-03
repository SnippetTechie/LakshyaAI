'use client'

import { useState } from 'react'
import { Clock, Users, Star, ArrowRight, Play } from 'lucide-react'

const simulatorCards = [
  {
    id: 'ui-designer',
    title: 'UI Designer',
    company: 'Tech Startup',
    level: 'Beginner',
    levelColor: 'bg-green-100 text-green-800',
    challenge: 'Design a mobile app login screen',
    description: 'Experience the daily work of a UI designer by creating user interfaces, choosing colors, and making design decisions.',
    skills: ['Design Thinking', 'User Experience', 'Visual Design'],
    duration: '15 mins',
    participants: '2.3k',
    rating: 4.8,
    icon: '🎨'
  },
  {
    id: 'software-developer',
    title: 'Software Developer',
    company: 'E-commerce Company',
    level: 'Intermediate',
    levelColor: 'bg-yellow-100 text-yellow-800',
    challenge: 'Debug a shopping cart feature',
    description: 'Step into the shoes of a developer and solve coding problems, debug issues, and implement new features.',
    skills: ['Problem Solving', 'Programming', 'Debugging'],
    duration: '20 mins',
    participants: '3.1k',
    rating: 4.9,
    icon: '💻'
  },
  {
    id: 'digital-marketer',
    title: 'Digital Marketer',
    company: 'Fashion Brand',
    level: 'Beginner',
    levelColor: 'bg-green-100 text-green-800',
    challenge: 'Create a social media campaign',
    description: 'Learn how marketers think by creating campaigns, analyzing data, and making strategic decisions.',
    skills: ['Strategy', 'Content Creation', 'Analytics'],
    duration: '12 mins',
    participants: '1.8k',
    rating: 4.7,
    icon: '📱'
  }
]

const CareerSimulatorPreview = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  const handleTryChallenge = (cardId: string) => {
    // This will be connected to backend/routing later
    console.log('Starting challenge:', cardId)
    // Navigate to specific challenge page
  }

  const handleViewAll = () => {
    // This will be connected to backend/routing later
    console.log('Viewing all simulations')
    // Navigate to simulations page
  }

  return (
    <section className="min-h-screen py-20 flex items-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-100/20 to-accent-100/20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Career Simulator
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Try real tasks from different careers to see what actually fits you.
            No textbook theory – just hands-on experience.
          </p>
        </div>

        {/* Simulator Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {simulatorCards.map((card, index) => (
            <div
              key={card.id}
              className={`bg-background-secondary border-2 border-dark-400/30 rounded-2xl p-6 card-hover animate-fade-in-up ${
                selectedCard === card.id ? 'border-primary-500 shadow-lg' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setSelectedCard(card.id)}
              onMouseLeave={() => setSelectedCard(null)}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{card.icon}</div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${card.levelColor}`}>
                      {card.level}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-1">
                    {card.title}
                  </h3>
                  <p className="text-sm text-text-tertiary">{card.company}</p>
                </div>

                <div className="bg-background-tertiary p-4 rounded-lg">
                  <p className="font-semibold text-text-primary mb-2">
                    Challenge: {card.challenge}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Skills */}
                <div>
                  <div className="flex flex-wrap gap-2">
                    {card.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-primary-500/20 text-primary-400 text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-text-tertiary">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{card.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users size={14} />
                      <span>{card.participants}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="text-yellow-500 fill-current" />
                      <span>{card.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleTryChallenge(card.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                >
                  <Play size={16} />
                  Try Challenge
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={handleViewAll}
            className="btn-secondary inline-flex items-center gap-2"
          >
            View All Simulations
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default CareerSimulatorPreview
