import { NextRequest, NextResponse } from 'next/server'

// This API route handles career simulation data
// Will be connected to database later

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

// Mock data - replace with database queries
const mockSimulations: Simulation[] = [
  {
    id: 'ui-designer-login',
    title: 'UI Designer',
    careerId: 'ui-designer',
    company: 'Tech Startup',
    level: 'Beginner',
    challenge: 'Design a mobile app login screen',
    description: 'Experience the daily work of a UI designer by creating user interfaces, choosing colors, and making design decisions.',
    skills: ['Design Thinking', 'User Experience', 'Visual Design'],
    duration: '15 mins',
    participants: 2300,
    rating: 4.8,
    icon: '🎨',
    tasks: [
      {
        id: 'task-1',
        title: 'Choose Color Scheme',
        description: 'Select an appropriate color scheme for a fintech app login screen',
        type: 'multiple-choice',
        content: {
          question: 'Which color scheme would be most appropriate for a financial app?',
          options: [
            { id: 'a', text: 'Bright red and yellow', color: '#ff0000' },
            { id: 'b', text: 'Professional blue and white', color: '#0066cc' },
            { id: 'c', text: 'Neon green and purple', color: '#00ff00' },
            { id: 'd', text: 'Black and orange', color: '#000000' }
          ],
          correctAnswer: 'b'
        },
        points: 10,
        timeLimit: 60
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'software-dev-debug',
    title: 'Software Developer',
    careerId: 'software-developer',
    company: 'E-commerce Company',
    level: 'Intermediate',
    challenge: 'Debug a shopping cart feature',
    description: 'Step into the shoes of a developer and solve coding problems, debug issues, and implement new features.',
    skills: ['Problem Solving', 'Programming', 'Debugging'],
    duration: '20 mins',
    participants: 3100,
    rating: 4.9,
    icon: '💻',
    tasks: [
      {
        id: 'task-1',
        title: 'Identify the Bug',
        description: 'Find the issue in this shopping cart calculation code',
        type: 'code',
        content: {
          code: `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i <= items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}`,
          language: 'javascript',
          question: 'What is wrong with this code?',
          options: [
            'Array index out of bounds',
            'Missing return statement',
            'Incorrect variable name',
            'Wrong loop condition'
          ],
          correctAnswer: 'Array index out of bounds'
        },
        points: 15,
        timeLimit: 120
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const simulationId = searchParams.get('id')
    const careerId = searchParams.get('careerId')

    if (simulationId) {
      const simulation = mockSimulations.find(s => s.id === simulationId)
      if (!simulation) {
        return NextResponse.json({ error: 'Simulation not found' }, { status: 404 })
      }
      return NextResponse.json(simulation)
    }

    if (careerId) {
      const careerSimulations = mockSimulations.filter(s => s.careerId === careerId)
      return NextResponse.json(careerSimulations)
    }

    // Return all simulations
    return NextResponse.json(mockSimulations)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // This would handle creating new simulations
    const body = await request.json()
    
    // TODO: Validate and save to database
    console.log('Creating new simulation:', body)
    
    return NextResponse.json({ message: 'Simulation created successfully' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
