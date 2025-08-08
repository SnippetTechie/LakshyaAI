import { auth } from '@clerk/nextjs/server'
import { prisma } from './prisma'
import { UserRole } from '@prisma/client'

export async function getCurrentUser() {
  const { userId } = await auth()
  
  if (!userId) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      preferences: true,
      mentor: true,
      mentorApplication: true,
    }
  })

  return user
}

export async function createUserIfNotExists(clerkId: string, email: string, name: string) {
  const existingUser = await prisma.user.findUnique({
    where: { clerkId }
  })

  if (existingUser) {
    return existingUser
  }

  const newUser = await prisma.user.create({
    data: {
      clerkId,
      email,
      name,
      role: UserRole.STUDENT, // Default role
    }
  })

  return newUser
}

export async function updateUserRole(clerkId: string, role: UserRole) {
  const user = await prisma.user.update({
    where: { clerkId },
    data: { role }
  })

  return user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }

  return user
}

export async function requireRole(requiredRole: UserRole) {
  const user = await requireAuth()
  
  if (user.role !== requiredRole) {
    throw new Error('Insufficient permissions')
  }

  return user
}

export async function requireRoles(requiredRoles: UserRole[]) {
  const user = await requireAuth()
  
  if (!user.role || !requiredRoles.includes(user.role)) {
    throw new Error('Insufficient permissions')
  }

  return user
}
