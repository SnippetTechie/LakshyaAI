// Centralized type definitions for the application
// This will make it easier to maintain consistency across frontend and backend

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface Career {
  id: string
  title: string
  description: string
  averageSalary: {
    entry: number
    mid: number
    senior: number
  }
  workLifeBalance: number // 1-10 scale
  growthProspects: number // 1-10 scale
  requiredSkills: string[]
  educationPath: string[]
  jobMarketDemand: 'High' | 'Medium' | 'Low'
  industries: string[]
  icon?: string
  color?: string
}

export interface UserPreferences {
  userId: string
  selectedCareers: string[]
  interests: string[]
  skills: string[]
  workLifeBalanceImportance: number // 1-10 scale
  salaryImportance: number // 1-10 scale
  growthImportance: number // 1-10 scale
  location: string
  experienceLevel: 'entry' | 'mid' | 'senior'
  educationLevel: string
  createdAt: string
  updatedAt: string
}

export interface Simulation {
  id: string
  title: string
  careerId: string
  company: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  challenge: string
  description: string
  skills: string[]
  duration: string
  participants: number
  rating: number
  icon: string
  tasks: SimulationTask[]
  createdAt: string
  updatedAt: string
}

export interface SimulationTask {
  id: string
  title: string
  description: string
  type: 'multiple-choice' | 'drag-drop' | 'code' | 'design' | 'text'
  content: any // Task-specific content
  points: number
  timeLimit?: number // in seconds
}

export interface SimulationResult {
  id: string
  userId: string
  simulationId: string
  score: number
  totalPoints: number
  timeSpent: number // in seconds
  completedAt: string
  answers: TaskAnswer[]
}

export interface TaskAnswer {
  taskId: string
  answer: any
  isCorrect: boolean
  pointsEarned: number
  timeSpent: number
}

export interface CareerComparison {
  id: string
  userId: string
  career1Id: string
  career2Id: string
  criteria: ComparisonCriteria
  createdAt: string
}

export interface ComparisonCriteria {
  salary: number // weight 1-10
  workLifeBalance: number // weight 1-10
  growthProspects: number // weight 1-10
  jobSecurity: number // weight 1-10
  creativity: number // weight 1-10
}

export interface LifeGraph {
  id: string
  userId: string
  careerId: string
  milestones: Milestone[]
  projectedSalary: SalaryProjection[]
  createdAt: string
  updatedAt: string
}

export interface Milestone {
  id: string
  title: string
  description: string
  targetDate: string
  category: 'education' | 'skill' | 'job' | 'certification' | 'personal'
  isCompleted: boolean
  completedDate?: string
}

export interface SalaryProjection {
  year: number
  expectedSalary: number
  location: string
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead' | 'executive'
}

export interface JournalEntry {
  id: string
  userId: string
  prompt: string
  response: string
  category: 'interests' | 'values' | 'goals' | 'reflection'
  createdAt: string
  updatedAt: string
}

export interface Mentor {
  id: string
  name: string
  title: string
  company: string
  expertise: string[]
  bio: string
  avatar: string
  rating: number
  reviewCount: number
  isAvailable: boolean
  hourlyRate?: number
}

export interface MentorSession {
  id: string
  userId: string
  mentorId: string
  scheduledAt: string
  duration: number // in minutes
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
  rating?: number
  review?: string
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form types
export interface CareerPreferencesForm {
  interests: string[]
  skills: string[]
  workLifeBalanceImportance: number
  salaryImportance: number
  growthImportance: number
  location: string
  experienceLevel: 'entry' | 'mid' | 'senior'
  educationLevel: string
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

// Navigation types
export interface NavItem {
  label: string
  href: string
  icon?: string
  children?: NavItem[]
}
