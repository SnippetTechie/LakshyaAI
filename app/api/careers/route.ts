import { NextRequest, NextResponse } from 'next/server'

// This is a placeholder API route for career data
// Will be connected to actual database later

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
}

// Mock data - replace with database queries
const mockCareers: Career[] = [
  {
    id: 'software-developer',
    title: 'Software Developer',
    description: 'Design, develop, and maintain software applications and systems.',
    averageSalary: {
      entry: 400000,
      mid: 800000,
      senior: 1500000
    },
    workLifeBalance: 7,
    growthProspects: 9,
    requiredSkills: ['Programming', 'Problem Solving', 'Debugging', 'Version Control'],
    educationPath: ['Computer Science Degree', 'Coding Bootcamp', 'Self-taught'],
    jobMarketDemand: 'High',
    industries: ['Technology', 'Finance', 'Healthcare', 'E-commerce']
  },
  {
    id: 'ui-designer',
    title: 'UI Designer',
    description: 'Create intuitive and visually appealing user interfaces for digital products.',
    averageSalary: {
      entry: 350000,
      mid: 700000,
      senior: 1200000
    },
    workLifeBalance: 8,
    growthProspects: 8,
    requiredSkills: ['Design Thinking', 'Prototyping', 'User Research', 'Visual Design'],
    educationPath: ['Design Degree', 'UX/UI Bootcamp', 'Portfolio Development'],
    jobMarketDemand: 'High',
    industries: ['Technology', 'Media', 'E-commerce', 'Startups']
  },
  {
    id: 'digital-marketer',
    title: 'Digital Marketer',
    description: 'Develop and execute marketing strategies across digital channels.',
    averageSalary: {
      entry: 300000,
      mid: 600000,
      senior: 1000000
    },
    workLifeBalance: 6,
    growthProspects: 7,
    requiredSkills: ['Analytics', 'Content Creation', 'SEO/SEM', 'Social Media'],
    educationPath: ['Marketing Degree', 'Digital Marketing Certification', 'MBA'],
    jobMarketDemand: 'High',
    industries: ['E-commerce', 'Media', 'Retail', 'Technology']
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const careerId = searchParams.get('id')

    if (careerId) {
      const career = mockCareers.find(c => c.id === careerId)
      if (!career) {
        return NextResponse.json({ error: 'Career not found' }, { status: 404 })
      }
      return NextResponse.json(career)
    }

    // Return all careers
    return NextResponse.json(mockCareers)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // This would handle creating new career entries
    // For now, return a placeholder response
    const body = await request.json()
    
    // TODO: Validate and save to database
    console.log('Creating new career:', body)
    
    return NextResponse.json({ message: 'Career created successfully' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
