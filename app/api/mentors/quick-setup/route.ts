import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { UserRole, VerificationStatus } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        mentorApplication: true,
        mentor: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user already has mentor application and mentor
    if (user.mentorApplication && user.mentor) {
      return NextResponse.json({
        message: 'User already has mentor profile',
        mentor: user.mentor
      })
    }

    // Create mentor application if doesn't exist
    if (!user.mentorApplication) {
      const application = await prisma.mentorApplication.create({
        data: {
          userId: user.id,
          currentTitle: 'Professional Mentor',
          currentCompany: 'Career Guidance Expert',
          yearsOfExperience: 3,
          expertise: JSON.stringify(['General Career Guidance']),
          linkedinProfile: 'https://linkedin.com/in/mentor',
          professionalCertificates: JSON.stringify([]),
          bio: 'Experienced professional ready to help students with career guidance.',
          whyMentor: 'Passionate about helping students find their career path',
          availableHours: 5,
          status: VerificationStatus.APPROVED
        }
      })

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
        where: { id: user.id },
        include: { mentor: true, mentorApplication: true }
      })

      console.log('✅ Created mentor record:', mentor.id)
    }

    if (!user?.mentor) {
      return NextResponse.json({ error: 'Failed to create mentor profile' }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Mentor profile created successfully',
      mentor: user.mentor
    })

  } catch (error) {
    console.error('Error in mentor quick setup:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
