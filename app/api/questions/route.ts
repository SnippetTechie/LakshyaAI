import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import RealtimeService from '@/lib/redis/realtime'

// Helper function to parse tags from JSON string
function parseQuestionTags(questions: any[]) {
  return questions.map(question => {
    let parsedTags = []
    
    try {
      if (question.tags) {
        // If tags is already an array, use it as is
        if (Array.isArray(question.tags)) {
          parsedTags = question.tags
        } else if (typeof question.tags === 'string') {
          // If it's a string, try to parse it as JSON
          parsedTags = JSON.parse(question.tags)
        }
      }
    } catch (error) {
      console.error('Error parsing tags for question:', question.id, error)
      parsedTags = []
    }
    
    return {
      ...question,
      tags: parsedTags
    }
  })
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const mentorId = searchParams.get('mentorId')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    let questions

    if (userId) {
      // Get questions by specific user (for student dashboard)
      questions = await prisma.question.findMany({
        where: { userId },
        include: {
          user: {
            select: { name: true, avatarUrl: true }
          },
          answers: {
            include: {
              mentor: {
                include: {
                  user: {
                    select: { name: true, avatarUrl: true }
                  }
                }
              }
            },
            orderBy: { createdAt: 'desc' }
          },
          _count: {
            select: { answers: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset
      })
    } else {
      // Get all questions (for mentor dashboard)
      questions = await prisma.question.findMany({
        include: {
          user: {
            select: { name: true, avatarUrl: true }
          },
          answers: {
            where: mentorId ? { mentorId } : undefined,
            include: {
              mentor: {
                include: {
                  user: {
                    select: { name: true, avatarUrl: true }
                  }
                }
              }
            },
            orderBy: { createdAt: 'desc' }
          },
          _count: {
            select: { answers: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset
      })
    }

    // Parse tags from JSON strings back to arrays
    const parsedQuestions = parseQuestionTags(questions)
    
    console.log('📊 Questions API: Parsed', parsedQuestions.length, 'questions')
    console.log('🔍 Sample question tags:', parsedQuestions[0]?.tags)

    return NextResponse.json(parsedQuestions)
  } catch (error) {
    console.error('Error fetching questions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      console.log('❌ Questions POST: No userId in auth')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('✅ Questions POST: Auth successful for userId:', userId)

    const body = await request.json()
    const { title, description, tags, careerId } = body

    console.log('📝 Questions POST: Request data:', { title: title?.substring(0, 50), description: description?.substring(0, 50), tags, careerId })

    if (!title || !description) {
      console.log('❌ Questions POST: Missing title or description')
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 })
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      console.log('❌ Questions POST: User not found in database for clerkId:', userId)
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    console.log('✅ Questions POST: User found:', user.id)

    // Create question
    const question = await prisma.question.create({
      data: {
        userId: user.id,
        title,
        description,
        tags: JSON.stringify(tags || []),
        careerId: careerId || null
      },
      include: {
        user: {
          select: { name: true, avatarUrl: true }
        },
        _count: {
          select: { answers: true }
        }
      }
    })

    console.log('✅ Questions POST: Question created successfully:', question.id)

    // Parse tags for the response
    const parsedQuestion = {
      ...question,
      tags: question.tags ? JSON.parse(question.tags) : []
    }

    // Broadcast new question to all mentors via Redis
    try {
      await RealtimeService.publishNewQuestion(parsedQuestion)
      console.log('✅ Questions POST: Question broadcasted to mentors')
    } catch (broadcastError) {
      console.error('❌ Questions POST: Error broadcasting new question:', broadcastError)
      // Don't fail the request if broadcast fails
    }

    return NextResponse.json(parsedQuestion, { status: 201 })
  } catch (error) {
    console.error('❌ Questions POST: Error creating question:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
