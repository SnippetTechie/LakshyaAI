import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get or create user in our database
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        preferences: true,
        mentor: true,
        mentorApplication: true,
      }
    })

    if (!user) {
      // User doesn't exist in our database, get their info from Clerk and create them
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
          // No default role - they'll select in onboarding
        },
        include: {
          preferences: true,
          mentor: true,
          mentorApplication: true,
        }
      })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
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
    const { email, name } = body

    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 })
    }

    // Create or update user in our database
    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {
        email,
        name,
      },
      create: {
        clerkId: userId,
        email,
        name,
        // No default role - they'll select in onboarding
      },
      include: {
        preferences: true,
        mentor: true,
        mentorApplication: true,
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error creating/updating user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
