'use client'

import { Users, Target, Award, Lightbulb, Heart, Zap } from 'lucide-react'

const stats = [
  { icon: Users, label: 'Students Guided', value: '50,000+', color: 'text-blue-600' },
  { icon: Target, label: 'Career Paths', value: '100+', color: 'text-purple-600' },
  { icon: Award, label: 'Success Rate', value: '95%', color: 'text-green-600' },
  { icon: Lightbulb, label: 'Simulations', value: '500+', color: 'text-orange-600' }
]

const values = [
  {
    icon: Heart,
    title: 'Student-First Approach',
    description: 'Every decision we make is centered around what\'s best for students and their career growth.',
    color: 'from-red-400 to-pink-500'
  },
  {
    icon: Lightbulb,
    title: 'Innovation in Learning',
    description: 'We use cutting-edge technology and interactive methods to make career exploration engaging.',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: Target,
    title: 'Real-World Focus',
    description: 'Our simulations and insights are based on actual industry requirements and real job scenarios.',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    icon: Zap,
    title: 'Continuous Growth',
    description: 'We constantly evolve our platform based on student feedback and industry changes.',
    color: 'from-purple-400 to-indigo-500'
  }
]

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
            <Heart className="text-pink-400" size={16} />
            <span className="text-sm font-medium text-pink-300">Our Story</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">LakshyaAI</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize career guidance in India, helping every student 
            make informed decisions about their future through technology and real insights.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content - Story */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold mb-6">
              Transforming Career Guidance in India
            </h3>
            
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Every year, millions of Indian students face the same challenge: choosing a career path 
                without truly understanding what different professions entail. Traditional career counseling 
                often relies on outdated information and generic advice.
              </p>
              
              <p>
                <span className="text-blue-400 font-semibold">LakshyaAI</span> was born from the belief that students deserve better. 
                We combine artificial intelligence, real industry data, and interactive simulations 
                to give students hands-on experience with different careers before they commit.
              </p>
              
              <p>
                Our platform doesn't just tell you about careers – it lets you <span className="text-purple-400 font-semibold">experience them</span>. 
                From coding challenges for aspiring developers to design tasks for future creatives, 
                we make career exploration engaging and insightful.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="text-xl font-semibold mb-3 text-blue-400">Our Vision</h4>
              <p className="text-gray-300">
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
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center card-hover animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <IconComponent className={`${stat.color} mx-auto mb-4`} size={40} />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Core Values</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div
                  key={value.title}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 card-hover animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h4 className="text-lg font-semibold mb-3">{value.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Built by Educators, Engineers, and Career Experts
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Our team combines decades of experience in education, technology, and career counseling. 
              We're passionate about helping students make informed decisions about their future.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                Meet Our Team
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
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
