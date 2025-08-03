'use client'

import { ArrowRight, Target, Zap, TrendingUp, BookOpen } from 'lucide-react'

const tools = [
  {
    id: 'career-battle',
    title: 'Career Battle',
    description: 'Compare two careers side by side with salary, work-life balance, growth prospects, and day-to-day tasks.',
    icon: Target,
    color: 'orange',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    iconColor: 'text-orange-500',
    buttonColor: 'bg-orange-500 hover:bg-orange-600'
  },
  {
    id: 'career-simulation',
    title: 'Career Simulation',
    description: 'Try tasks from real careers through interactive challenges and mini-games to see what fits you.',
    icon: Zap,
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-500',
    buttonColor: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    id: 'visual-life-graph',
    title: 'Visual Life Graph',
    description: 'View your 10-year career plan with milestones, salary progression, and key decision points.',
    icon: TrendingUp,
    color: 'green',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconColor: 'text-green-500',
    buttonColor: 'bg-green-500 hover:bg-green-600'
  },
  {
    id: 'self-discovery',
    title: 'Self-Discovery Journal',
    description: 'Reflect on your interests, values, and goals through guided prompts before making career choices.',
    icon: BookOpen,
    color: 'purple',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconColor: 'text-purple-500',
    buttonColor: 'bg-purple-500 hover:bg-purple-600'
  }
]

const CareerToolsSection = () => {
  const handleToolClick = (toolId: string) => {
    // This will be connected to backend/routing later
    console.log('Opening tool:', toolId)
    // Navigate to specific tool page
  }

  return (
    <section id="features" className="min-h-screen py-12 sm:py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Discover Your Perfect Career Path
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Use our powerful tools to explore, compare, and plan your future with confidence
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon
            return (
              <div
                key={tool.id}
                className={`${tool.bgColor} ${tool.borderColor} border-2 rounded-2xl p-6 sm:p-8 card-hover animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className={`${tool.iconColor} p-3 bg-white rounded-xl shadow-sm flex-shrink-0`}>
                    <IconComponent size={28} className="sm:w-8 sm:h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      {tool.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                      {tool.description}
                    </p>
                    <button
                      onClick={() => handleToolClick(tool.id)}
                      className={`${tool.buttonColor} text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center gap-2 hover:scale-105 hover:shadow-lg text-sm sm:text-base`}
                    >
                      {tool.id === 'career-battle' && 'Start Comparing'}
                      {tool.id === 'career-simulation' && 'Try a Challenge'}
                      {tool.id === 'visual-life-graph' && 'Build My Graph'}
                      {tool.id === 'self-discovery' && 'Start Reflecting'}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Ready to discover your ideal career?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Start with any tool above or take our comprehensive career assessment
            </p>
            <button className="btn-primary inline-flex items-center gap-2 text-sm sm:text-base">
              Take Career Assessment
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CareerToolsSection
