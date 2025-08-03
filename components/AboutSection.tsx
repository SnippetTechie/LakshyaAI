'use client'

import { Users, Target, Award, Lightbulb, Heart, Zap } from 'lucide-react'

const stats = [
  { icon: Users, label: 'Students Guided', value: '50,000+', color: 'text-primary-500' },
  { icon: Target, label: 'Career Paths', value: '100+', color: 'text-accent-500' },
  { icon: Award, label: 'Success Rate', value: '95%', color: 'text-success-400' },
  { icon: Lightbulb, label: 'Simulations', value: '500+', color: 'text-warning-400' }
]

const values = [
  {
    icon: Heart,
    title: 'Student-First Approach',
    description: 'Every decision we make is centered around what\'s best for students and their career growth.',
    color: 'from-error-400 to-error-500'
  },
  {
    icon: Lightbulb,
    title: 'Innovation in Learning',
    description: 'We use cutting-edge technology and interactive methods to make career exploration engaging.',
    color: 'from-warning-400 to-warning-500'
  },
  {
    icon: Target,
    title: 'Real-World Focus',
    description: 'Our simulations and insights are based on actual industry requirements and real job scenarios.',
    color: 'from-primary-400 to-primary-500'
  },
  {
    icon: Zap,
    title: 'Continuous Growth',
    description: 'We constantly evolve our platform based on student feedback and industry changes.',
    color: 'from-accent-400 to-accent-500'
  }
]

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen py-20 text-text-primary flex items-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-100/20 to-accent-100/20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-background-secondary/80 backdrop-blur-sm px-4 py-2 rounded-full border border-dark-400/20 mb-6">
            <Heart className="text-error-400" size={16} />
            <span className="text-sm font-medium text-error-400">Our Story</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">LakshyaAI</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize career guidance in India, helping every student
            make informed decisions about their future through technology and real insights.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content - Story */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold mb-6 text-text-primary">
              Transforming Career Guidance in India
            </h3>

            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Every year, millions of Indian students face the same challenge: choosing a career path
                without truly understanding what different professions entail. Traditional career counseling
                often relies on outdated information and generic advice.
              </p>

              <p>
                <span className="text-primary-500 font-semibold">LakshyaAI</span> was born from the belief that students deserve better.
                We combine artificial intelligence, real industry data, and interactive simulations
                to give students hands-on experience with different careers before they commit.
              </p>

              <p>
                Our platform doesn't just tell you about careers – it lets you <span className="text-accent-500 font-semibold">experience them</span>.
                From coding challenges for aspiring developers to design tasks for future creatives,
                we make career exploration engaging and insightful.
              </p>
            </div>

            <div className="bg-background-secondary/80 backdrop-blur-sm rounded-2xl p-6 border border-dark-400/20">
              <h4 className="text-xl font-semibold mb-3 text-primary-500">Our Vision</h4>
              <p className="text-text-secondary">
                To become India's most trusted career guidance platform, where every student
                can discover their passion and build a fulfilling career with confidence.
              </p>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div
                  key={stat.label}
                  className="bg-background-secondary/80 backdrop-blur-sm rounded-2xl p-6 border border-dark-400/20 text-center card-hover animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <IconComponent className={`${stat.color} mx-auto mb-4`} size={40} />
                  <div className="text-3xl font-bold mb-2 text-text-primary">{stat.value}</div>
                  <div className="text-sm text-text-tertiary">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-text-primary">
            Our <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">Core Values</span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div
                  key={value.title}
                  className="bg-background-secondary/80 backdrop-blur-sm rounded-2xl p-6 border border-dark-400/20 card-hover animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-text-primary">{value.title}</h4>
                  <p className="text-sm text-text-tertiary leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary-500/20 to-accent-500/20 backdrop-blur-sm rounded-2xl p-8 border border-dark-400/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-text-primary">
              Built by Educators, Engineers, and Career Experts
            </h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Our team combines decades of experience in education, technology, and career counseling.
              We're passionate about helping students make informed decisions about their future.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                Meet Our Team
              </button>
              <button className="bg-background-secondary/80 backdrop-blur-sm border border-dark-400/20 hover:bg-background-secondary text-text-primary px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                Join Our Mission
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
