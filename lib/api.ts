// API utility functions for frontend-backend communication
// This centralizes all API calls and makes it easier to manage endpoints

import { Career, UserPreferences, Simulation, ApiResponse } from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Generic API call function
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      return { error: data.error || 'An error occurred' }
    }

    return { data }
  } catch (error) {
    console.error('API call failed:', error)
    return { error: 'Network error occurred' }
  }
}

// Career API functions
export const careerApi = {
  // Get all careers
  getAll: (): Promise<ApiResponse<Career[]>> => {
    return apiCall<Career[]>('/careers')
  },

  // Get specific career by ID
  getById: (id: string): Promise<ApiResponse<Career>> => {
    return apiCall<Career>(`/careers?id=${id}`)
  },

  // Create new career (admin function)
  create: (career: Partial<Career>): Promise<ApiResponse<Career>> => {
    return apiCall<Career>('/careers', {
      method: 'POST',
      body: JSON.stringify(career),
    })
  },

  // Compare two careers
  compare: (career1Id: string, career2Id: string): Promise<ApiResponse<{ career1: Career; career2: Career }>> => {
    return apiCall<{ career1: Career; career2: Career }>(`/careers/compare?id1=${career1Id}&id2=${career2Id}`)
  },
}

// User preferences API functions
export const userPreferencesApi = {
  // Get user preferences
  get: (userId: string): Promise<ApiResponse<UserPreferences>> => {
    return apiCall<UserPreferences>(`/user/preferences?userId=${userId}`)
  },

  // Create user preferences
  create: (preferences: Partial<UserPreferences>): Promise<ApiResponse<UserPreferences>> => {
    return apiCall<UserPreferences>('/user/preferences', {
      method: 'POST',
      body: JSON.stringify(preferences),
    })
  },

  // Update user preferences
  update: (userId: string, preferences: Partial<UserPreferences>): Promise<ApiResponse<UserPreferences>> => {
    return apiCall<UserPreferences>(`/user/preferences?userId=${userId}`, {
      method: 'PUT',
      body: JSON.stringify(preferences),
    })
  },
}

// Simulation API functions
export const simulationApi = {
  // Get all simulations
  getAll: (): Promise<ApiResponse<Simulation[]>> => {
    return apiCall<Simulation[]>('/simulations')
  },

  // Get simulations by career
  getByCareer: (careerId: string): Promise<ApiResponse<Simulation[]>> => {
    return apiCall<Simulation[]>(`/simulations?careerId=${careerId}`)
  },

  // Get specific simulation
  getById: (id: string): Promise<ApiResponse<Simulation>> => {
    return apiCall<Simulation>(`/simulations?id=${id}`)
  },

  // Submit simulation result
  submitResult: (result: any): Promise<ApiResponse<any>> => {
    return apiCall<any>('/simulations/results', {
      method: 'POST',
      body: JSON.stringify(result),
    })
  },
}

// Authentication API functions (placeholder for future implementation)
export const authApi = {
  login: (email: string, password: string): Promise<ApiResponse<{ token: string; user: any }>> => {
    return apiCall<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },

  register: (userData: any): Promise<ApiResponse<{ token: string; user: any }>> => {
    return apiCall<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },

  logout: (): Promise<ApiResponse<{ message: string }>> => {
    return apiCall<{ message: string }>('/auth/logout', {
      method: 'POST',
    })
  },

  refreshToken: (): Promise<ApiResponse<{ token: string }>> => {
    return apiCall<{ token: string }>('/auth/refresh', {
      method: 'POST',
    })
  },
}

// Analytics API functions (placeholder for future implementation)
export const analyticsApi = {
  trackEvent: (event: string, properties: any): Promise<ApiResponse<{ success: boolean }>> => {
    return apiCall<{ success: boolean }>('/analytics/track', {
      method: 'POST',
      body: JSON.stringify({ event, properties }),
    })
  },

  getUserInsights: (userId: string): Promise<ApiResponse<any>> => {
    return apiCall<any>(`/analytics/insights?userId=${userId}`)
  },
}

// Utility functions for common operations
export const utils = {
  // Format salary for display
  formatSalary: (amount: number): string => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    } else {
      return `₹${amount.toLocaleString()}`
    }
  },

  // Calculate career match score based on user preferences
  calculateMatchScore: (career: Career, preferences: UserPreferences): number => {
    let score = 0
    let totalWeight = 0

    // Work-life balance scoring
    const workLifeWeight = preferences.workLifeBalanceImportance
    const workLifeScore = career.workLifeBalance / 10
    score += workLifeScore * workLifeWeight
    totalWeight += workLifeWeight

    // Growth prospects scoring
    const growthWeight = preferences.growthImportance
    const growthScore = career.growthProspects / 10
    score += growthScore * growthWeight
    totalWeight += growthWeight

    // Salary scoring (simplified - would need more complex logic)
    const salaryWeight = preferences.salaryImportance
    const avgSalary = career.averageSalary[preferences.experienceLevel]
    const salaryScore = Math.min(avgSalary / 1000000, 1) // Normalize to 0-1 scale
    score += salaryScore * salaryWeight
    totalWeight += salaryWeight

    return totalWeight > 0 ? (score / totalWeight) * 100 : 0
  },

  // Debounce function for search inputs
  debounce: <T extends (...args: any[]) => any>(func: T, delay: number): T => {
    let timeoutId: NodeJS.Timeout
    return ((...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(null, args), delay)
    }) as T
  },
}
