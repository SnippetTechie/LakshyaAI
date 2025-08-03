'use client'

import { ArrowRight, Target, Zap, TrendingUp, BookOpen } from 'lucide-react'

const tools = [
  {
    id: 'career-battle',
    title: 'Career Battle',
    description: 'Compare two careers side by side with salary, work-life balance, growth prospects, and day-to-day tasks.',
    icon: Target,
    color: 'orange',
    bgColor: 'bg-slate-800/90 backdrop-blur-sm',
    borderColor: 'border-slate-600/50',
    iconColor: 'text-warning-400',
    buttonColor: 'bg-gradient-to-r from-warning-400 to-warning-500 hover:from-warning-500 hover:to-warning-600'
  },
  {
    id: 'career-simulation',
    title: 'Career Simulation',
    description: 'Try tasks from real careers through interactive challenges and mini-games to see what fits you.',
    icon: Zap,
    color: 'blue',
    bgColor: 'bg-slate-800/90 backdrop-blur-sm',
    borderColor: 'border-slate-600/50',
    iconColor: 'text-primary-500',
    buttonColor: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700'
  },
  {
    id: 'visual-life-graph',
    title: 'Visual Life Graph',
    description: 'View your 10-year career plan with milestones, salary progression, and key decision points.',
    icon: TrendingUp,
    color: 'green',
    bgColor: 'bg-slate-800/90 backdrop-blur-sm',
    borderColor: 'border-slate-600/50',
    iconColor: 'text-success-400',
    buttonColor: 'bg-gradient-to-r from-success-400 to-success-500 hover:from-success-500 hover:to-success-600'
  },
  {
    id: 'self-discovery',
    title: 'Self-Discovery Journal',
    description: 'Reflect on your interests, values, and goals through guided prompts before making career choices.',
    icon: BookOpen,
    color: 'purple',
    bgColor: 'bg-slate-800/90 backdrop-blur-sm',
    borderColor: 'border-slate-600/50',
    iconColor: 'text-accent-500',
    buttonColor: 'bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700'
  }
]

const CareerToolsSection = () => {
  const handleToolClick = (toolId: string) => {
    // This will be connected to backend/routing later
    console.log('Opening tool:', toolId)
    // Navigate to specific tool page
  }

  return (
    <section id="features" className="relative flex items-center min-h-screen py-12 overflow-hidden sm:py-20">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-100/20 to-accent-100/20"></div>
      </div>

      <div className="relative w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-text-primary sm:mb-6">
            Discover Your Perfect Career Path
          </h2>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed sm:text-xl text-text-secondary">
            Use our powerful tools to explore, compare, and plan your future with confidence
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 sm:gap-8">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon
            return (
              <div
                key={tool.id}
                className={`${tool.bgColor} ${tool.borderColor} border-2 rounded-2xl p-6 sm:p-8 card-hover animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <div className={`${tool.iconColor} p-3 bg-slate-700/80 rounded-xl shadow-sm flex-shrink-0`}>
                    <IconComponent size={28} className="sm:w-8 sm:h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-3 text-xl font-bold sm:text-2xl text-text-primary">
                      {tool.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed sm:text-base text-text-secondary sm:mb-6">
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


      </div>
    </section>
  )
}

export default CareerToolsSection
