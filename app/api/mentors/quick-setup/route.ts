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

    const body = await request.json()
    const {
      currentTitle,
      currentCompany,
      yearsOfExperience,
      expertise,
      bio
    } = body

    // Get user from database
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { mentorApplication: true, mentor: true }
    })

    if (!user) {
      // Create user if doesn't exist
      const clerkUser = await currentUser()
      
      if (!clerkUser) {
        return NextResponse.json({ error: 'User not found in Clerk' }, { status: 404 })
      }
      
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User',
          avatarUrl: clerkUser.imageUrl,
          role: UserRole.MENTOR_VERIFIED,
        }
      })
    }

    // Check if user already has mentor setup
    if (user.mentorApplication && user.mentor) {
      return NextResponse.json({
        message: 'Mentor profile already exists',
        mentor: user.mentor
      })
    }

    // Get or create mentor application
    let application = user.mentorApplication
    if (!application) {
      // Create mentor application (auto-approved)
      application = await prisma.mentorApplication.create({
        data: {
          userId: user.id,
          currentTitle,
          currentCompany,
          yearsOfExperience: parseInt(yearsOfExperience.split('-')[0]) || 3,
          expertise,
          linkedinProfile: '',
          professionalCertificates: [],
          bio,
          whyMentor: 'Wants to help students with career guidance',
          availableHours: 5,
          status: VerificationStatus.APPROVED
        }
      })
    }

    // Create mentor profile if it doesn't exist
    let mentor = user.mentor
    if (!mentor) {
      mentor = await prisma.mentor.create({
        data: {
          userId: user.id,
          applicationId: application.id,
          title: currentTitle,
          company: currentCompany,
          expertise: expertise,
          bio: bio,
          reputation: 0,
          answersCount: 0,
          helpfulAnswers: 0,
          isActive: true
        }
      })
    }

    // Update user role to MENTOR_VERIFIED
    await prisma.user.update({
      where: { id: user.id },
      data: { role: UserRole.MENTOR_VERIFIED }
    })

    return NextResponse.json({ 
      message: 'Mentor profile created successfully',
      mentor: mentor,
      application: application
    }, { status: 201 })

  } catch (error) {
    console.error('❌ Error creating mentor profile:', error)
    console.error('❌ Error details:', JSON.stringify(error, null, 2))
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
