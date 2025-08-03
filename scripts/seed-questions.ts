import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedQuestions() {
  try {
    // First, let's find or create a test student user
    const testStudent = await prisma.user.upsert({
      where: { email: 'student@test.com' },
      update: {},
      create: {
        clerkId: 'test-student-clerk-id',
        email: 'student@test.com',
        name: 'Test Student',
        role: 'STUDENT'
      }
    })

    // Create some sample questions
    const questions = [
      {
        title: "How do I transition from software development to data science?",
        description: "I'm currently working as a software developer with 3 years of experience. I'm interested in moving to data science but don't know where to start. What skills should I focus on learning first?",
        tags: ["career-transition", "data-science", "software-development"],
        userId: testStudent.id
      },
      {
        title: "What skills are most important for a UI/UX designer in 2024?",
        description: "I'm a fresh graduate looking to start my career in UI/UX design. With so many tools and technologies available, I'm confused about what to prioritize. What are the must-have skills for 2024?",
        tags: ["ui-ux", "design", "skills", "career-start"],
        userId: testStudent.id
      },
      {
        title: "Is an MBA necessary for product management roles?",
        description: "I'm considering a career in product management. I have a technical background but no MBA. Do I need to get an MBA to be competitive for PM roles, or can I transition without it?",
        tags: ["product-management", "mba", "career-advice"],
        userId: testStudent.id
      },
      {
        title: "How to negotiate salary as a fresher in tech industry?",
        description: "I just got my first job offer in tech, but I feel the salary might be low. As a fresher with no prior experience, how should I approach salary negotiation? What factors should I consider?",
        tags: ["salary", "negotiation", "fresher", "tech"],
        userId: testStudent.id
      },
      {
        title: "Should I learn multiple programming languages or master one?",
        description: "I'm in my second year of computer science. I know basics of Java and Python. Should I focus on becoming really good at one language or learn multiple languages? What's better for career prospects?",
        tags: ["programming", "languages", "learning", "computer-science"],
        userId: testStudent.id
      }
    ]

    // Create questions
    for (const questionData of questions) {
      await prisma.question.create({
        data: questionData
      })
    }

    console.log('✅ Successfully seeded questions!')
    console.log(`Created ${questions.length} sample questions`)

  } catch (error) {
    console.error('Error seeding questions:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedQuestions()
