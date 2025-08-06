import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      console.log('❌ No userId in auth')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('✅ Auth successful, userId:', userId)

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
      console.log('🔄 User not found in database, creating new user...')

      // User doesn't exist in our database, get their info from Clerk and create them
      const clerkUser = await currentUser()

      if (!clerkUser) {
        console.error('❌ User not found in Clerk')
        return NextResponse.json({ error: 'User not found in Clerk' }, { status: 404 })
      }

      console.log('📝 Creating user with Clerk data:', {
        clerkId: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim()
      })

      try {
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
        console.log('✅ User created successfully:', user.id)
      } catch (createError) {
        console.error('❌ Error creating user:', createError)
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
      }
    } else {
      console.log('✅ User found in database:', user.id)
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('❌ Error in GET /api/auth/user:', error)
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
