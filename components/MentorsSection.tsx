'use client'

import { Star, Calendar, MessageCircle, Award } from 'lucide-react'

const mentors = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    title: 'Senior Software Engineer',
    company: 'Google',
    expertise: ['Software Development', 'Career Guidance', 'Tech Leadership'],
    bio: '10+ years in tech, helped 500+ students transition into software engineering roles.',
    avatar: '👩‍💻',
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 2500,
    isAvailable: true
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    title: 'UX Design Director',
    company: 'Microsoft',
    expertise: ['UI/UX Design', 'Product Strategy', 'Design Thinking'],
    bio: 'Award-winning designer with experience at top tech companies. Passionate about mentoring.',
    avatar: '👨‍🎨',
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 3000,
    isAvailable: true
  },
  {
    id: 3,
    name: 'Anita Desai',
    title: 'Marketing Head',
    company: 'Flipkart',
    expertise: ['Digital Marketing', 'Brand Strategy', 'Growth Hacking'],
    bio: 'Built marketing teams from scratch. Expert in digital marketing and brand building.',
    avatar: '👩‍💼',
    rating: 4.7,
    reviewCount: 156,
    hourlyRate: 2000,
    isAvailable: false
  },
  {
    id: 4,
    name: 'Dr. Vikram Singh',
    title: 'Medical Consultant',
    company: 'AIIMS Delhi',
    expertise: ['Medical Career', 'NEET Guidance', 'Healthcare'],
    bio: 'Senior doctor with 15+ years experience. Guides students through medical career paths.',
    avatar: '👨‍⚕️',
    rating: 4.9,
    reviewCount: 203,
    hourlyRate: 3500,
    isAvailable: true
  }
]

const MentorsSection = () => {
  const handleBookSession = (mentorId: number) => {
    console.log('Booking session with mentor:', mentorId)
    // This will be connected to booking system later
  }

  return (
    <section id="mentors" className="min-h-screen py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 mb-6">
            <Award className="text-purple-500" size={16} />
            <span className="text-sm font-medium text-purple-700">Expert Mentorship</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Learn from Industry <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Experts</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get personalized guidance from professionals who've walked the path you want to take. 
            Book 1-on-1 sessions with industry leaders.
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {mentors.map((mentor, index) => (
            <div
              key={mentor.id}
              className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Mentor Avatar & Status */}
              <div className="relative mb-4">
                <div className="text-6xl text-center mb-3">{mentor.avatar}</div>
                <div className={`absolute top-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                  mentor.isAvailable ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
              </div>

              {/* Mentor Info */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{mentor.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{mentor.title}</p>
                <p className="text-xs text-blue-600 font-semibold">{mentor.company}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500 fill-current" size={16} />
                  <span className="text-sm font-semibold">{mentor.rating}</span>
                </div>
                <span className="text-xs text-gray-500">({mentor.reviewCount} reviews)</span>
              </div>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {mentor.expertise.slice(0, 2).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {mentor.expertise.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    +{mentor.expertise.length - 2}
                  </span>
                )}
              </div>

              {/* Bio */}
              <p className="text-xs text-gray-600 mb-4 line-clamp-3">{mentor.bio}</p>

              {/* Price & Book Button */}
              <div className="space-y-3">
                <div className="text-center">
                  <span className="text-lg font-bold text-gray-900">₹{mentor.hourlyRate}</span>
                  <span className="text-sm text-gray-500">/hour</span>
                </div>
                
                <button
                  onClick={() => handleBookSession(mentor.id)}
                  disabled={!mentor.isAvailable}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    mentor.isAvailable
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:scale-105'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {mentor.isAvailable ? (
                    <>
                      <Calendar size={16} />
                      Book Session
                    </>
                  ) : (
                    'Currently Unavailable'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't find the right mentor?
            </h3>
            <p className="text-gray-600 mb-6">
              We have 100+ mentors across different industries. Let us match you with the perfect mentor for your career goals.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
              <MessageCircle size={20} />
              Find My Mentor
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MentorsSection
