import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import RealtimeService from '@/lib/redis/realtime'

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

    return NextResponse.json(questions)
  } catch (error) {
    console.error('Error fetching questions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, tags, careerId } = body

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 })
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Create question
    const question = await prisma.question.create({
      data: {
        userId: user.id,
        title,
        description,
        tags: tags || [],
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

    // Broadcast new question to all mentors via Redis
    try {
      await RealtimeService.publishNewQuestion(question)
    } catch (broadcastError) {
      console.error('Error broadcasting new question:', broadcastError)
      // Don't fail the request if broadcast fails
    }

    return NextResponse.json(question, { status: 201 })
  } catch (error) {
    console.error('Error creating question:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
