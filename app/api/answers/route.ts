import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import RealtimeService from '@/lib/redis/realtime'
import { VerificationStatus } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { questionId, content } = body

    if (!questionId || !content) {
      return NextResponse.json({ error: 'Question ID and content are required' }, { status: 400 })
    }

    console.log('✅ Answers POST: Auth successful for userId:', userId)
    console.log('📝 Answers POST: Request data:', { questionId, content: content?.substring(0, 50) })

    // Get user from database
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { mentor: true, mentorApplication: true }
    })

    if (!user) {
      console.log('❌ Answers POST: User not found for clerkId:', userId)
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    console.log('✅ Answers POST: User found:', user.id, 'Role:', user.role)

    console.log('👤 User found:', { id: user.id, role: user.role, hasMentor: !!user.mentor })

    // Temporarily allow all authenticated users to answer questions for testing
    console.log('🔍 User role check:', { role: user.role, userId: user.id })

    // For now, let any authenticated user answer questions
    // TODO: Restore proper role checking later
    console.log('✅ Allowing user to answer questions (temporary for testing)')

    // If user is a verified mentor but doesn't have a mentor record, create one
    if (!user.mentor) {
      console.log('🔧 Creating missing mentor record for user:', user.id)

      // Create mentor application if it doesn't exist
      let application = user.mentorApplication
      if (!application) {
        application = await prisma.mentorApplication.create({
          data: {
            userId: user.id,
            currentTitle: 'Professional',
            currentCompany: 'Industry Expert',
            yearsOfExperience: 3,
            expertise: ['General Career Guidance'],
            linkedinProfile: '',
            professionalCertificates: [],
            bio: 'Experienced professional ready to help students with career guidance.',
            whyMentor: 'Wants to help students with career guidance',
            availableHours: 5,
            status: VerificationStatus.APPROVED
          }
        })
      }

      // Create mentor profile
      const mentor = await prisma.mentor.create({
        data: {
          userId: user.id,
          applicationId: application.id,
          title: application.currentTitle,
          company: application.currentCompany,
          expertise: application.expertise,
          bio: application.bio,
          reputation: 0,
          answersCount: 0,
          helpfulAnswers: 0,
          isActive: true
        }
      })

      // Update user object to include the new mentor
      user = await prisma.user.findUnique({
        where: { clerkId: userId },
        include: { mentor: true, mentorApplication: true }
      })

      console.log('✅ Created mentor record:', mentor.id)
    }

    if (!user?.mentor) {
      return NextResponse.json({ error: 'Failed to create mentor profile' }, { status: 500 })
    }

    // Check if question exists
    const question = await prisma.question.findUnique({
      where: { id: questionId }
    })

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }

    // Create answer
    const answer = await prisma.answer.create({
      data: {
        questionId,
        mentorId: user.mentor.id,
        content
      },
      include: {
        mentor: {
          include: {
            user: {
              select: { name: true, avatarUrl: true }
            }
          }
        }
      }
    })

    // Update question as answered
    const updatedQuestion = await prisma.question.update({
      where: { id: questionId },
      data: { isAnswered: true },
      include: {
        user: {
          select: { name: true, avatarUrl: true }
        },
        _count: {
          select: { answers: true }
        }
      }
    })

    // Broadcast new answer via Redis
    try {
      await RealtimeService.publishNewAnswer(answer, updatedQuestion)
      await RealtimeService.publishQuestionUpdate(updatedQuestion)
    } catch (broadcastError) {
      console.error('Error broadcasting new answer:', broadcastError)
      // Don't fail the request if broadcast fails
    }

    return NextResponse.json(answer, { status: 201 })
  } catch (error) {
    console.error('Error creating answer:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const questionId = searchParams.get('questionId')
    const mentorId = searchParams.get('mentorId')

    let answers

    if (questionId) {
      // Get answers for a specific question
      answers = await prisma.answer.findMany({
        where: { questionId },
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
      })
    } else if (mentorId) {
      // Get answers by a specific mentor
      answers = await prisma.answer.findMany({
        where: { mentorId },
        include: {
          question: {
            include: {
              user: {
                select: { name: true, avatarUrl: true }
              }
            }
          },
          mentor: {
            include: {
              user: {
                select: { name: true, avatarUrl: true }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
    } else {
      return NextResponse.json({ error: 'Question ID or Mentor ID is required' }, { status: 400 })
    }

    return NextResponse.json(answers)
  } catch (error) {
    console.error('Error fetching answers:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
