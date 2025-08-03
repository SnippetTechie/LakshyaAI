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
    hourlyRate: 1500,
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
    hourlyRate: 1000,
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
    hourlyRate: 1000,
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
    hourlyRate: 2000,
    isAvailable: true
  }
]

const MentorsSection = () => {
  const handleBookSession = (mentorId: number) => {
    console.log('Booking session with mentor:', mentorId)
    // This will be connected to booking system later
  }

  return (
    <section id="mentors" className="flex items-center min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-100/20 to-accent-100/20"></div>
      </div>

      <div className="relative w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-accent-400/30 rounded-full bg-background-secondary/80 backdrop-blur-sm">
            <Award className="text-accent-500" size={16} />
            <span className="text-sm font-medium text-accent-400">Expert Mentorship</span>
          </div>
          
          <h2 className="mb-6 text-4xl font-bold text-text-primary md:text-5xl">
            Learn from Industry <span className="text-transparent bg-gradient-to-r from-accent-500 to-accent-600 bg-clip-text">Experts</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-text-secondary">
            Get personalized guidance from professionals who've walked the path you want to take.
            Book 1-on-1 sessions with industry leaders.
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid gap-8 mb-12 md:grid-cols-2 lg:grid-cols-4">
          {mentors.map((mentor, index) => (
            <div
              key={mentor.id}
              className="p-6 border shadow-xl bg-background-secondary/90 backdrop-blur-lg rounded-2xl border-dark-400/20 card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Mentor Avatar & Status */}
              <div className="relative mb-4">
                <div className="mb-3 text-6xl text-center">{mentor.avatar}</div>
                <div className={`absolute top-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                  mentor.isAvailable ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
              </div>

              {/* Mentor Info */}
              <div className="mb-4 text-center">
                <h3 className="mb-1 text-lg font-bold text-text-primary">{mentor.name}</h3>
                <p className="mb-1 text-sm text-text-secondary">{mentor.title}</p>
                <p className="text-xs font-semibold text-primary-500">{mentor.company}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="text-warning-400 fill-current" size={16} />
                  <span className="text-sm font-semibold text-text-primary">{mentor.rating}</span>
                </div>
                <span className="text-xs text-text-tertiary">({mentor.reviewCount} reviews)</span>
              </div>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {mentor.expertise.slice(0, 2).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs font-medium text-accent-400 bg-accent-500/20 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {mentor.expertise.length > 2 && (
                  <span className="px-2 py-1 text-xs font-medium text-text-tertiary bg-dark-300 rounded-full">
                    +{mentor.expertise.length - 2}
                  </span>
                )}
              </div>

              {/* Bio */}
              <p className="mb-4 text-xs text-text-secondary line-clamp-3">{mentor.bio}</p>

              {/* Price & Book Button */}
              <div className="space-y-3">
                <div className="text-center">
                  <span className="text-lg font-bold text-text-primary">₹{mentor.hourlyRate}</span>
                  <span className="text-sm text-text-tertiary">/hour</span>
                </div>

                <button
                  onClick={() => handleBookSession(mentor.id)}
                  disabled={!mentor.isAvailable}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    mentor.isAvailable
                      ? 'bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white hover:scale-105'
                      : 'bg-dark-300 text-text-tertiary cursor-not-allowed'
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


      </div>
    </section>
  )
}

export default MentorsSection
