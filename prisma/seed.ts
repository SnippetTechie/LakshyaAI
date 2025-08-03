import { PrismaClient, SimulationLevel, TaskType, JobMarketDemand } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create careers
  const careers = await Promise.all([
    prisma.career.create({
      data: {
        title: 'Software Developer',
        description: 'Design, develop, and maintain software applications and systems.',
        entrySalary: 400000,
        midSalary: 800000,
        seniorSalary: 1500000,
        workLifeBalance: 7,
        growthProspects: 9,
        jobMarketDemand: JobMarketDemand.HIGH,
        requiredSkills: ['Programming', 'Problem Solving', 'Debugging', 'Version Control'],
        educationPath: ['Computer Science Degree', 'Coding Bootcamp', 'Self-taught'],
        industries: ['Technology', 'Finance', 'Healthcare', 'E-commerce'],
        icon: '💻',
        color: 'blue'
      }
    }),
    prisma.career.create({
      data: {
        title: 'Data Scientist',
        description: 'Analyze complex data to help organizations make informed decisions.',
        entrySalary: 500000,
        midSalary: 900000,
        seniorSalary: 1800000,
        workLifeBalance: 6,
        growthProspects: 9,
        jobMarketDemand: JobMarketDemand.HIGH,
        requiredSkills: ['Python', 'Statistics', 'Machine Learning', 'Data Visualization'],
        educationPath: ['Statistics Degree', 'Computer Science', 'Data Science Bootcamp'],
        industries: ['Technology', 'Finance', 'Healthcare', 'Retail'],
        icon: '📊',
        color: 'green'
      }
    }),
    prisma.career.create({
      data: {
        title: 'UI/UX Designer',
        description: 'Create intuitive and visually appealing user interfaces and experiences.',
        entrySalary: 350000,
        midSalary: 700000,
        seniorSalary: 1200000,
        workLifeBalance: 8,
        growthProspects: 7,
        jobMarketDemand: JobMarketDemand.HIGH,
        requiredSkills: ['Design Thinking', 'Prototyping', 'User Research', 'Visual Design'],
        educationPath: ['Design Degree', 'HCI Degree', 'Design Bootcamp'],
        industries: ['Technology', 'Media', 'E-commerce', 'Gaming'],
        icon: '🎨',
        color: 'purple'
      }
    }),
    prisma.career.create({
      data: {
        title: 'Digital Marketer',
        description: 'Develop and execute marketing strategies across digital channels.',
        entrySalary: 300000,
        midSalary: 600000,
        seniorSalary: 1000000,
        workLifeBalance: 6,
        growthProspects: 7,
        jobMarketDemand: JobMarketDemand.HIGH,
        requiredSkills: ['Analytics', 'Content Creation', 'SEO/SEM', 'Social Media'],
        educationPath: ['Marketing Degree', 'Digital Marketing Certification', 'MBA'],
        industries: ['E-commerce', 'Media', 'Retail', 'Technology'],
        icon: '📱',
        color: 'orange'
      }
    })
  ])

  console.log(`✅ Created ${careers.length} careers`)

  // Create simulations for each career
  for (const career of careers) {
    const simulation = await prisma.simulation.create({
      data: {
        title: `${career.title} Challenge`,
        careerId: career.id,
        company: 'Tech Startup',
        level: SimulationLevel.BEGINNER,
        challenge: `Experience a day in the life of a ${career.title}`,
        description: `Try real-world tasks and challenges that ${career.title}s face daily.`,
        skills: career.requiredSkills.slice(0, 3),
        duration: '15 mins',
        participants: Math.floor(Math.random() * 5000) + 1000,
        rating: 4.5 + Math.random() * 0.5,
        icon: career.icon
      }
    })

    // Create tasks for each simulation
    await Promise.all([
      prisma.simulationTask.create({
        data: {
          simulationId: simulation.id,
          title: 'Multiple Choice Challenge',
          description: 'Test your knowledge with this quiz',
          type: TaskType.MULTIPLE_CHOICE,
          content: {
            question: `What is the most important skill for a ${career.title}?`,
            options: career.requiredSkills,
            correctAnswer: 0
          },
          points: 10,
          timeLimit: 60,
          orderIndex: 1
        }
      }),
      prisma.simulationTask.create({
        data: {
          simulationId: simulation.id,
          title: 'Practical Task',
          description: 'Complete this hands-on challenge',
          type: TaskType.TEXT,
          content: {
            prompt: `Describe how you would approach a typical ${career.title} project`,
            placeholder: 'Write your approach here...'
          },
          points: 20,
          timeLimit: 300,
          orderIndex: 2
        }
      })
    ])
  }

  console.log(`✅ Created simulations and tasks for all careers`)

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
