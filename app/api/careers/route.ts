import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const careerId = searchParams.get('id')

    if (careerId) {
      const career = await prisma.career.findUnique({
        where: { id: careerId },
        include: {
          simulations: {
            select: {
              id: true,
              title: true,
              level: true,
              participants: true,
              rating: true
            }
          }
        }
      })

      if (!career) {
        return NextResponse.json({ error: 'Career not found' }, { status: 404 })
      }

      return NextResponse.json(career)
    }

    // Return all careers
    const careers = await prisma.career.findMany({
      include: {
        simulations: {
          select: {
            id: true,
            title: true,
            level: true,
            participants: true,
            rating: true
          }
        }
      },
      orderBy: {
        title: 'asc'
      }
    })

    return NextResponse.json(careers)
  } catch (error) {
    console.error('Error fetching careers:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      entrySalary,
      midSalary,
      seniorSalary,
      workLifeBalance,
      growthProspects,
      jobMarketDemand,
      requiredSkills,
      educationPath,
      industries,
      icon,
      color
    } = body

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 })
    }

    const career = await prisma.career.create({
      data: {
        title,
        description,
        entrySalary,
        midSalary,
        seniorSalary,
        workLifeBalance,
        growthProspects,
        jobMarketDemand,
        requiredSkills: requiredSkills || [],
        educationPath: educationPath || [],
        industries: industries || [],
        icon,
        color
      }
    })

    return NextResponse.json(career, { status: 201 })
  } catch (error) {
    console.error('Error creating career:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
