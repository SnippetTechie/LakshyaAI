'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import { BookOpen, Target, TrendingUp, Users, MessageSquare, Bot, Play, BarChart3, Sparkles, Zap, Trophy, Brain, Library, ExternalLink, FileText, Video, Globe, Award, Clock, ArrowRight } from 'lucide-react'
import StudentQuestions from '@/components/StudentQuestions'
import CareerChatBot from '@/components/CareerChatBot'
import CareerSimulation from '@/components/CareerSimulation'
import VisualLifeGraph from '@/components/VisualLifeGraph'

// Resources Section Component
function ResourcesSection() {
  const [selectedField, setSelectedField] = useState<string>('all')

  const fields = [
    { id: 'all', name: 'All Fields', icon: Globe },
    { id: 'medical', name: 'Medical & Healthcare', icon: Target },
    { id: 'engineering', name: 'Engineering & Technology', icon: Zap },
    { id: 'business', name: 'Business & Management', icon: TrendingUp },
    { id: 'arts', name: 'Arts & Design', icon: Sparkles },
    { id: 'science', name: 'Science & Research', icon: Brain },
    { id: 'government', name: 'Government & Civil Services', icon: Award }
  ]

  const resources = {
    medical: [
      {
        title: 'Physics Wallah NEET 2025 Preparation',
        description: 'Official Physics Wallah platform for NEET 2025 preparation with live classes and study materials',
        type: 'Online Platform',
        duration: 'Ongoing',
        url: 'https://www.pw.live/neet',
        icon: Video
      },
      {
        title: 'NEET Official Website - NTA',
        description: 'Official National Testing Agency portal for NEET exam information and updates',
        type: 'Official Portal',
        duration: '30 mins',
        url: 'https://neet.nta.nic.in/',
        icon: FileText
      },
      {
        title: 'Medical Council of India - Career Guide',
        description: 'Official NMC information on medical education and career paths in India',
        type: 'Career Guide',
        duration: '25 mins',
        url: 'https://www.nmc.org.in/',
        icon: BookOpen
      },
      {
        title: 'AIIMS Official Portal',
        description: 'All India Institute of Medical Sciences official admission and course information',
        type: 'Official Portal',
        duration: '20 mins',
        url: 'https://www.aiims.edu/',
        icon: Target
      },
      {
        title: 'Medical Counselling Committee (MCC)',
        description: 'Official portal for NEET UG medical counselling and seat allocation process',
        type: 'Counselling Portal',
        duration: '35 mins',
        url: 'https://mcc.nic.in/',
        icon: Users
      },
      {
        title: 'NCERT Biology Textbooks',
        description: 'Free NCERT biology textbooks for Class 11 and 12 - essential for NEET preparation',
        type: 'Study Material',
        duration: 'Self-paced',
        url: 'https://ncert.nic.in/textbook.php?kebo1=2-8',
        icon: BookOpen
      },
      {
        title: 'Khan Academy Biology',
        description: 'Free comprehensive biology courses covering NEET syllabus topics',
        type: 'Online Course',
        duration: 'Varies',
        url: 'https://www.khanacademy.org/science/biology',
        icon: Brain
      },
      {
        title: 'Top Medical Colleges Rankings',
        description: 'Official NIRF rankings and information about top medical colleges in India',
        type: 'Rankings',
        duration: '40 mins',
        url: 'https://www.nirfindia.org/Rankings/2024/MedicalRanking.html',
        icon: Award
      }
    ],
    engineering: [
      {
        title: 'Unacademy JEE Preparation',
        description: 'Official Unacademy platform for JEE Main and Advanced preparation',
        type: 'Online Platform',
        duration: 'Ongoing',
        url: 'https://unacademy.com/goal/jee-main-and-advanced-preparation/TMUVD',
        icon: Video
      },
      {
        title: 'JEE Main Official Portal - NTA',
        description: 'Official National Testing Agency portal for JEE Main exam information',
        type: 'Official Portal',
        duration: '45 mins',
        url: 'https://jeemain.nta.nic.in/',
        icon: FileText
      },
      {
        title: 'NIRF Engineering Rankings 2024',
        description: 'Official NIRF rankings of top engineering colleges in India',
        type: 'Official Rankings',
        duration: '30 mins',
        url: 'https://www.nirfindia.org/Rankings/2024/EngineeringRanking.html',
        icon: BookOpen
      },
      {
        title: 'GitHub Free Programming Books',
        description: 'Comprehensive collection of free programming books and resources',
        type: 'Resource Collection',
        duration: 'Self-paced',
        url: 'https://github.com/EbookFoundation/free-programming-books',
        icon: Globe
      },
      {
        title: 'Coursera Computer Science Courses',
        description: 'Free and paid computer science courses from top universities',
        type: 'Online Courses',
        duration: 'Varies',
        url: 'https://www.coursera.org/browse/computer-science',
        icon: Brain
      },
      {
        title: 'JEE Advanced Official Portal',
        description: 'Official portal for JEE Advanced exam conducted by IITs',
        type: 'Official Portal',
        duration: '35 mins',
        url: 'https://jeeadv.ac.in/',
        icon: Award
      },
      {
        title: 'NCERT Mathematics & Physics',
        description: 'Free NCERT textbooks for Class 11 and 12 - foundation for JEE preparation',
        type: 'Study Material',
        duration: 'Self-paced',
        url: 'https://ncert.nic.in/textbook.php',
        icon: BookOpen
      },
      {
        title: 'MIT OpenCourseWare',
        description: 'Free engineering courses from Massachusetts Institute of Technology',
        type: 'Online Courses',
        duration: 'Varies',
        url: 'https://ocw.mit.edu/search/?d=Engineering',
        icon: Brain
      }
    ],
    business: [
      {
        title: 'iQuanta CAT Preparation',
        description: 'India\'s leading CAT preparation platform with live classes and community support',
        type: 'Online Platform',
        duration: 'Ongoing',
        url: 'https://www.youtube.com/channel/UCJcXnTkWeIrXavsa_DUzq5w',
        icon: Video
      },
      {
        title: 'CAT Official Website',
        description: 'Official Common Admission Test portal for MBA admissions',
        type: 'Official Portal',
        duration: '40 mins',
        url: 'https://iimcat.ac.in/',
        icon: FileText
      },
      {
        title: 'Startup India Official Portal',
        description: 'Government of India\'s official startup initiative with resources and funding',
        type: 'Government Portal',
        duration: 'Ongoing',
        url: 'https://www.startupindia.gov.in/',
        icon: Globe
      },
      {
        title: 'Harvard Business School Online',
        description: 'Free business courses and resources from Harvard Business School',
        type: 'Online Courses',
        duration: 'Varies',
        url: 'https://www.hbs.edu/online/',
        icon: BookOpen
      },
      {
        title: 'ICAI - Chartered Accountancy',
        description: 'Institute of Chartered Accountants of India - official CA course information',
        type: 'Professional Course',
        duration: '45 mins',
        url: 'https://www.icai.org/',
        icon: Award
      },
      {
        title: 'ICSI - Company Secretary',
        description: 'Institute of Company Secretaries of India - official CS course details',
        type: 'Professional Course',
        duration: '35 mins',
        url: 'https://www.icsi.edu/',
        icon: FileText
      },
      {
        title: 'Khan Academy Economics',
        description: 'Free comprehensive economics courses covering business fundamentals',
        type: 'Online Course',
        duration: 'Varies',
        url: 'https://www.khanacademy.org/economics-finance-domain',
        icon: Brain
      },
      {
        title: 'NIRF Management Rankings 2024',
        description: 'Official rankings of top business schools and management institutes in India',
        type: 'Official Rankings',
        duration: '25 mins',
        url: 'https://www.nirfindia.org/Rankings/2024/ManagementRanking.html',
        icon: TrendingUp
      }
    ],
    arts: [
      {
        title: 'NIFT Official Portal',
        description: 'National Institute of Fashion Technology official admission and course information',
        type: 'Official Portal',
        duration: '30 mins',
        url: 'https://www.nift.ac.in/',
        icon: Sparkles
      },
      {
        title: 'Behance Creative Portfolio',
        description: 'Adobe\'s creative portfolio platform to showcase and discover design work',
        type: 'Portfolio Platform',
        duration: 'Ongoing',
        url: 'https://www.behance.net/',
        icon: Globe
      },
      {
        title: 'Design Council of India',
        description: 'Official portal for design education and career opportunities in India',
        type: 'Career Resource',
        duration: '25 mins',
        url: 'https://www.designcouncilofindia.org/',
        icon: Target
      },
      {
        title: 'Coursera Design Courses',
        description: 'Free and paid design courses from top universities and companies',
        type: 'Online Courses',
        duration: 'Varies',
        url: 'https://www.coursera.org/browse/arts-and-humanities/design-and-product',
        icon: BookOpen
      },
      {
        title: 'NID - National Institute of Design',
        description: 'Premier design institute in India - official admission and course information',
        type: 'Official Portal',
        duration: '35 mins',
        url: 'https://www.nid.edu/',
        icon: Award
      },
      {
        title: 'Dribbble Design Community',
        description: 'Global design community platform for showcasing creative work and inspiration',
        type: 'Design Community',
        duration: 'Ongoing',
        url: 'https://dribbble.com/',
        icon: Users
      },
      {
        title: 'Adobe Creative Cloud Tutorials',
        description: 'Official Adobe tutorials for Photoshop, Illustrator, and other creative tools',
        type: 'Tutorial Platform',
        duration: 'Varies',
        url: 'https://helpx.adobe.com/creative-cloud/tutorials-explore.html',
        icon: Video
      },
      {
        title: 'UCEED Official Portal',
        description: 'Undergraduate Common Entrance Exam for Design - official information portal',
        type: 'Entrance Exam',
        duration: '30 mins',
        url: 'https://uceed.iitb.ac.in/',
        icon: FileText
      }
    ],
    science: [
      {
        title: 'NPTEL Online Courses',
        description: 'Free online courses from IIT and IISc professors across all science subjects',
        type: 'Online Platform',
        duration: 'Varies',
        url: 'https://nptel.ac.in/',
        icon: Brain
      },
      {
        title: 'UGC PhD Regulations 2022',
        description: 'Official UGC guidelines for PhD admissions in Indian universities',
        type: 'Official Document',
        duration: '35 mins',
        url: 'https://www.ugc.ac.in/pdfnews/4033931_PhD-Regulations-2022.pdf',
        icon: FileText
      },
      {
        title: 'CSIR Official Portal',
        description: 'Council of Scientific and Industrial Research official portal for NET and fellowships',
        type: 'Official Portal',
        duration: '30 mins',
        url: 'https://csirhrdg.res.in/',
        icon: Award
      },
      {
        title: 'Indian Academy of Sciences',
        description: 'Premier scientific academy promoting science education and research in India',
        type: 'Research Portal',
        duration: 'Ongoing',
        url: 'https://www.ias.ac.in/',
        icon: Globe
      },
      {
        title: 'GATE Official Portal',
        description: 'Graduate Aptitude Test in Engineering - official portal for science and engineering graduates',
        type: 'Entrance Exam',
        duration: '40 mins',
        url: 'https://gate.iitk.ac.in/',
        icon: Target
      },
      {
        title: 'Khan Academy Science',
        description: 'Free comprehensive science courses covering physics, chemistry, and biology',
        type: 'Online Course',
        duration: 'Varies',
        url: 'https://www.khanacademy.org/science',
        icon: BookOpen
      },
      {
        title: 'NCERT Science Textbooks',
        description: 'Free NCERT science textbooks for all classes - foundation for competitive exams',
        type: 'Study Material',
        duration: 'Self-paced',
        url: 'https://ncert.nic.in/textbook.php?kesc1=2-8',
        icon: FileText
      },
      {
        title: 'Indian Institute of Science (IISc)',
        description: 'Premier research institute - information on courses and research opportunities',
        type: 'Research Institute',
        duration: '30 mins',
        url: 'https://www.iisc.ac.in/',
        icon: Award
      }
    ],
    government: [
      {
        title: 'UPSC Official Portal',
        description: 'Union Public Service Commission official portal for civil services examination',
        type: 'Official Portal',
        duration: '45 mins',
        url: 'https://www.upsc.gov.in/',
        icon: Award
      },
      {
        title: 'SSC Official Portal',
        description: 'Staff Selection Commission official portal for government job examinations',
        type: 'Official Portal',
        duration: '30 mins',
        url: 'https://ssc.nic.in/',
        icon: FileText
      },
      {
        title: 'StudyIQ Government Exams',
        description: 'Comprehensive preparation platform for government competitive exams',
        type: 'Online Platform',
        duration: 'Ongoing',
        url: 'https://www.studyiq.com/',
        icon: Video
      },
      {
        title: 'Employment News Official',
        description: 'Government of India\'s official employment newspaper for job notifications',
        type: 'Job Portal',
        duration: 'Weekly',
        url: 'https://www.employmentnews.gov.in/',
        icon: Globe
      },
      {
        title: 'Railway Recruitment Board (RRB)',
        description: 'Official portal for Indian Railways recruitment and job notifications',
        type: 'Government Jobs',
        duration: '35 mins',
        url: 'https://www.rrbcdg.gov.in/',
        icon: Target
      },
      {
        title: 'Banking Personnel Selection Institute',
        description: 'Official IBPS portal for banking sector recruitment examinations',
        type: 'Banking Exams',
        duration: '40 mins',
        url: 'https://www.ibps.in/',
        icon: TrendingUp
      },
      {
        title: 'National Defence Academy (NDA)',
        description: 'Official portal for NDA entrance exam and defence services career information',
        type: 'Defence Services',
        duration: '30 mins',
        url: 'https://www.nda.nic.in/',
        icon: Award
      },
      {
        title: 'NCERT Political Science & History',
        description: 'Free NCERT textbooks essential for UPSC and other government exam preparation',
        type: 'Study Material',
        duration: 'Self-paced',
        url: 'https://ncert.nic.in/textbook.php?kess1=2-10',
        icon: BookOpen
      }
    ]
  }

  const getFilteredResources = () => {
    if (selectedField === 'all') {
      return Object.values(resources).flat()
    }
    return resources[selectedField as keyof typeof resources] || []
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <Library className="text-blue-600" size={28} />
          Career Resources
        </h2>
        <p className="text-gray-600">
          Discover curated resources tailored to your career interests. Select a field to see relevant study materials, guides, and courses.
        </p>
      </div>

      {/* Field Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your Field of Interest</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {fields.map((field) => {
            const IconComponent = field.icon
            return (
              <button
                key={field.id}
                onClick={() => setSelectedField(field.id)}
                className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                  selectedField === field.id
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <IconComponent size={18} />
                <span className="text-sm font-medium">{field.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredResources().map((resource, index) => {
          const IconComponent = resource.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <IconComponent className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {resource.type}
                </span>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h4>
              <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock size={14} />
                  <span className="text-xs">{resource.duration}</span>
                </div>
                <button 
                  onClick={() => window.open(resource.url, '_blank')}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                >
                  Access Resource
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {getFilteredResources().length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-200 text-center">
          <Library className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Resources Found</h3>
          <p className="text-gray-600">
            Resources for this field are coming soon. Check back later or explore other fields.
          </p>
        </div>
      )}
    </div>
  )
}

// Helper function to get active tab classes
const getActiveTabClasses = (color: string) => {
  const colorMap: { [key: string]: string } = {
    blue: 'text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100/50',
    emerald: 'text-emerald-600 bg-gradient-to-r from-emerald-50 to-emerald-100/50',
    purple: 'text-purple-600 bg-gradient-to-r from-purple-50 to-purple-100/50',
    orange: 'text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100/50',
    pink: 'text-pink-600 bg-gradient-to-r from-pink-50 to-pink-100/50',
    indigo: 'text-indigo-600 bg-gradient-to-r from-indigo-50 to-indigo-100/50'
  }
  return colorMap[color] || 'text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100/50'
}

// Helper function to get icon background classes
const getIconBgClasses = (color: string, isActive: boolean) => {
  if (!isActive) return 'bg-gray-100 group-hover:bg-gray-200'
  
  const colorMap: { [key: string]: string } = {
    blue: 'bg-blue-100 shadow-lg',
    emerald: 'bg-emerald-100 shadow-lg',
    purple: 'bg-purple-100 shadow-lg',
    orange: 'bg-orange-100 shadow-lg',
    pink: 'bg-pink-100 shadow-lg',
    indigo: 'bg-indigo-100 shadow-lg'
  }
  return colorMap[color] || 'bg-blue-100 shadow-lg'
}

// Helper function to get icon text classes
const getIconTextClasses = (color: string, isActive: boolean) => {
  if (!isActive) return 'text-gray-600'
  
  const colorMap: { [key: string]: string } = {
    blue: 'text-blue-600',
    emerald: 'text-emerald-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    pink: 'text-pink-600',
    indigo: 'text-indigo-600'
  }
  return colorMap[color] || 'text-blue-600'
}

// Helper function to get bottom border classes
const getBottomBorderClasses = (color: string) => {
  const colorMap: { [key: string]: string } = {
    blue: 'bg-gradient-to-r from-blue-400 to-blue-600',
    emerald: 'bg-gradient-to-r from-emerald-400 to-emerald-600',
    purple: 'bg-gradient-to-r from-purple-400 to-purple-600',
    orange: 'bg-gradient-to-r from-orange-400 to-orange-600',
    pink: 'bg-gradient-to-r from-pink-400 to-pink-600',
    indigo: 'bg-gradient-to-r from-indigo-400 to-indigo-600'
  }
  return colorMap[color] || 'bg-gradient-to-r from-blue-400 to-blue-600'
}

export default function Dashboard() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isCheckingRole, setIsCheckingRole] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [dbUserId, setDbUserId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'career-guide' | 'simulation' | 'life-graph' | 'mentor-connect' | 'resources'>('overview')

  const checkUserRole = useCallback(async () => {
    try {
      console.log('🔍 Dashboard: Checking user role...')
      const response = await fetch('/api/auth/user')

      if (response.ok) {
        const userData = await response.json()
        console.log('✅ Dashboard: User data received:', { id: userData.id, role: userData.role, name: userData.name })

        // Handle role-based routing - redirect non-students to their dashboards
        if (userData.role === 'MENTOR_VERIFIED') {
          console.log('🔄 Dashboard: Redirecting verified mentor to mentor dashboard')
          router.push('/mentor/dashboard')
          return
        } else if (userData.role === 'ADMIN') {
          console.log('🔄 Dashboard: Redirecting admin to admin dashboard')
          router.push('/admin')
          return
        } else if (userData.role === 'STUDENT') {
          // Student can access this dashboard
          console.log('✅ Dashboard: Student role confirmed, setting up dashboard')
          setUserRole(userData.role)
          setDbUserId(userData.id)
        } else if (!userData.role) {
          // No role set, redirect to onboarding for first-time setup
          console.log('🔄 Dashboard: No role set, redirecting to onboarding')
          router.push('/onboarding')
          return
        } else {
          // Any other role (MENTOR_PENDING), let them access dashboard
          console.log('✅ Dashboard: Other role detected:', userData.role)
          setUserRole(userData.role)
          setDbUserId(userData.id)
        }
      } else {
        console.error('❌ Dashboard: Error fetching user data:', response.status)
        // Error fetching user, redirect to onboarding
        router.push('/onboarding')
        return
      }
    } catch (error) {
      console.error('Error checking user role:', error)
      // On error, redirect to onboarding to be safe
      router.push('/onboarding')
      return
    } finally {
      setIsCheckingRole(false)
    }
  }, [router])

  useEffect(() => {
    checkUserRole()
  }, [checkUserRole])

  if (!isLoaded || isCheckingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    router.push('/sign-in')
    return null
  }

  return (
    <div className="min-h-screen bg-background-primary pt-20">
      {/* Background overlay - same as landing page */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-100/20 to-accent-100/20"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl shadow-2xl p-8 mb-8 text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-3 text-white">
                  Welcome back, {user?.firstName || 'Student'}! 
                  <span className="inline-block ml-2 text-4xl filter drop-shadow-lg">👋</span>
                </h1>
                <p className="text-blue-100 text-xl font-medium">
                  Ready to continue your career journey? Let&apos;s explore new opportunities and insights.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl mb-8 border border-white/20 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3, color: 'blue' },
              { id: 'career-guide', label: 'Career Guide', icon: Bot, color: 'emerald' },
              { id: 'simulation', label: 'Career Simulation', icon: Play, color: 'purple' },
              { id: 'life-graph', label: 'Visual Life Graph', icon: TrendingUp, color: 'orange' },
              { id: 'mentor-connect', label: 'Mentor Connect', icon: MessageSquare, color: 'pink' },
              { id: 'resources', label: 'Resources', icon: Library, color: 'indigo' }
            ].map((tab) => {
              const IconComponent = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative flex items-center gap-3 px-6 py-4 font-semibold transition-all duration-300 whitespace-nowrap group ${
                    isActive
                      ? getActiveTabClasses(tab.color)
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/50'
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-all duration-300 ${getIconBgClasses(tab.color, isActive)}`}>
                    <IconComponent size={18} className={getIconTextClasses(tab.color, isActive)} />
                  </div>
                  <span className="hidden sm:block">{tab.label}</span>
                  {isActive && (
                    <div className={`absolute bottom-0 left-0 right-0 h-1 ${getBottomBorderClasses(tab.color)} rounded-t-full`}></div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Stats Cards - Only show on overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl shadow-xl p-6 border border-blue-200/50 hover:shadow-2xl hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-700 mb-1">Simulations Completed</p>
                  <p className="text-3xl font-bold text-blue-900">12</p>
                  <p className="text-xs text-blue-600 mt-1">+3 this week</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                  <Target className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl shadow-xl p-6 border border-emerald-200/50 hover:shadow-2xl hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-emerald-700 mb-1">Career Score</p>
                  <p className="text-3xl font-bold text-emerald-900">85%</p>
                  <p className="text-xs text-emerald-600 mt-1">Excellent progress</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl shadow-xl p-6 border border-purple-200/50 hover:shadow-2xl hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-purple-700 mb-1">Courses Enrolled</p>
                  <p className="text-3xl font-bold text-purple-900">5</p>
                  <p className="text-xs text-purple-600 mt-1">2 in progress</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl shadow-xl p-6 border border-orange-200/50 hover:shadow-2xl hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-orange-700 mb-1">Mentor Sessions</p>
                  <p className="text-3xl font-bold text-orange-900">3</p>
                  <p className="text-xs text-orange-600 mt-1">1 scheduled</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 relative z-10">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                      <Sparkles className="text-white" size={24} />
                    </div>
                    Quick Actions
                  </h3>
                  <div className="space-y-4 relative z-10">
                    <button
                      onClick={() => setActiveTab('career-guide')}
                      className="group w-full flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200/50 rounded-2xl transition-all duration-300 text-left border border-blue-200/50 hover:shadow-xl hover:scale-[1.02]"
                    >
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <Bot className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-lg">Ask Career Guide</p>
                        <p className="text-sm text-blue-700 font-medium">Get instant AI-powered career advice</p>
                      </div>
                      <div className="text-blue-600 group-hover:translate-x-1 transition-transform duration-300">
                        <ArrowRight size={20} />
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab('simulation')}
                      className="group w-full flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100/50 hover:from-emerald-100 hover:to-emerald-200/50 rounded-2xl transition-all duration-300 text-left border border-emerald-200/50 hover:shadow-xl hover:scale-[1.02]"
                    >
                      <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <Play className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-lg">Try Career Simulation</p>
                        <p className="text-sm text-emerald-700 font-medium">Experience real career tasks</p>
                      </div>
                      <div className="text-emerald-600 group-hover:translate-x-1 transition-transform duration-300">
                        <ArrowRight size={20} />
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab('life-graph')}
                      className="group w-full flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100/50 hover:from-purple-100 hover:to-purple-200/50 rounded-2xl transition-all duration-300 text-left border border-purple-200/50 hover:shadow-xl hover:scale-[1.02]"
                    >
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <TrendingUp className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-lg">Build Life Graph</p>
                        <p className="text-sm text-purple-700 font-medium">Visualize your 10-year career plan</p>
                      </div>
                      <div className="text-purple-600 group-hover:translate-x-1 transition-transform duration-300">
                        <ArrowRight size={20} />
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full -translate-y-16 -translate-x-16"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 relative z-10">
                  <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl shadow-lg">
                    <Trophy className="text-white" size={24} />
                  </div>
                  Recent Achievements
                </h3>
                <div className="space-y-4 relative z-10">
                  <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50/50 rounded-2xl border border-yellow-200/50 hover:shadow-lg transition-all duration-300">
                    <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Trophy size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">Completed Software Dev Challenge</p>
                      <p className="text-sm text-yellow-700 font-medium">Earned 100 points • 2 hours ago</p>
                    </div>
                    <div className="px-3 py-1 bg-yellow-100 rounded-full">
                      <span className="text-xs font-bold text-yellow-800">+100 XP</span>
                    </div>
                  </div>
                  <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-200/50 hover:shadow-lg transition-all duration-300">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Brain size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">Career Assessment Completed</p>
                      <p className="text-sm text-blue-700 font-medium">Discovered 3 new career matches • 1 day ago</p>
                    </div>
                    <div className="px-3 py-1 bg-blue-100 rounded-full">
                      <span className="text-xs font-bold text-blue-800">NEW</span>
                    </div>
                  </div>
                  <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50/50 rounded-2xl border border-emerald-200/50 hover:shadow-lg transition-all duration-300">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <MessageSquare size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">Connected with Mentor</p>
                      <p className="text-sm text-emerald-700 font-medium">Started conversation with Dr. Smith • 3 days ago</p>
                    </div>
                    <div className="px-3 py-1 bg-emerald-100 rounded-full">
                      <span className="text-xs font-bold text-emerald-800">ACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'career-guide' && <CareerChatBot />}
          {activeTab === 'simulation' && <CareerSimulation />}
          {activeTab === 'life-graph' && <VisualLifeGraph />}
          {activeTab === 'mentor-connect' && dbUserId && <StudentQuestions userId={dbUserId} />}
          {activeTab === 'resources' && <ResourcesSection />}
        </div>
      </div>
    </div>
  )
}
