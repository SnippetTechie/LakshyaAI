import { NextRequest, NextResponse } from 'next/server'

// This API route handles user career preferences
// Will be connected to authentication and database later

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

// Mock data - replace with database queries
const mockUserPreferences: UserPreferences[] = [
  {
    userId: 'user-1',
    selectedCareers: ['software-developer', 'ui-designer'],
    interests: ['technology', 'problem-solving', 'creativity'],
    skills: ['programming', 'design', 'communication'],
    workLifeBalanceImportance: 8,
    salaryImportance: 7,
    growthImportance: 9,
    location: 'Bangalore',
    experienceLevel: 'entry',
    educationLevel: 'Bachelor\'s Degree',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // TODO: Get user ID from authentication token
    const userPreferences = mockUserPreferences.find(p => p.userId === userId)
    
    if (!userPreferences) {
      return NextResponse.json({ error: 'User preferences not found' }, { status: 404 })
    }

    return NextResponse.json(userPreferences)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // TODO: Validate request body
    // TODO: Get user ID from authentication token
    // TODO: Save to database
    
    const newPreferences: UserPreferences = {
      ...body,
      userId: body.userId || 'temp-user-id',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    console.log('Saving user preferences:', newPreferences)
    
    return NextResponse.json(newPreferences, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // TODO: Validate request body
    // TODO: Get user ID from authentication token
    // TODO: Update in database
    
    const updatedPreferences: UserPreferences = {
      ...body,
      userId,
      updatedAt: new Date().toISOString()
    }

    console.log('Updating user preferences:', updatedPreferences)
    
    return NextResponse.json(updatedPreferences)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
