// Data structure safety helpers to prevent runtime errors

export interface SafeQuestion {
  id: string
  title: string
  description: string
  tags: string[]
  upvotes: number
  views: number
  isAnswered: boolean
  createdAt: string
  user: {
    name: string
    avatarUrl?: string
  }
  answers: SafeAnswer[]
  _count: {
    answers: number
  }
}

export interface SafeAnswer {
  id: string
  content: string
  upvotes: number
  isAccepted: boolean
  createdAt: string
  mentor: {
    user: {
      name: string
      avatarUrl?: string
    }
  }
}

/**
 * Ensures a question object has all required fields with safe defaults
 */
export function ensureSafeQuestion(question: any): SafeQuestion {
  if (!question) {
    throw new Error('Question object is null or undefined')
  }

  return {
    id: question.id || '',
    title: question.title || 'Untitled Question',
    description: question.description || '',
    tags: Array.isArray(question.tags) ? question.tags : [],
    upvotes: typeof question.upvotes === 'number' ? question.upvotes : 0,
    views: typeof question.views === 'number' ? question.views : 0,
    isAnswered: Boolean(question.isAnswered),
    createdAt: question.createdAt || new Date().toISOString(),
    user: {
      name: question.user?.name || 'Anonymous User',
      avatarUrl: question.user?.avatarUrl
    },
    answers: Array.isArray(question.answers) 
      ? question.answers.map(ensureSafeAnswer)
      : [],
    _count: {
      answers: question._count?.answers ?? 
               (Array.isArray(question.answers) ? question.answers.length : 0)
    }
  }
}

/**
 * Ensures an answer object has all required fields with safe defaults
 */
export function ensureSafeAnswer(answer: any): SafeAnswer {
  if (!answer) {
    throw new Error('Answer object is null or undefined')
  }

  return {
    id: answer.id || '',
    content: answer.content || '',
    upvotes: typeof answer.upvotes === 'number' ? answer.upvotes : 0,
    isAccepted: Boolean(answer.isAccepted),
    createdAt: answer.createdAt || new Date().toISOString(),
    mentor: {
      user: {
        name: answer.mentor?.user?.name || 'Anonymous Mentor',
        avatarUrl: answer.mentor?.user?.avatarUrl
      }
    }
  }
}

/**
 * Safely processes an array of questions from API response
 */
export function processSafeQuestions(questions: any[]): SafeQuestion[] {
  if (!Array.isArray(questions)) {
    console.warn('Questions is not an array, returning empty array')
    return []
  }

  return questions.map((question, index) => {
    try {
      return ensureSafeQuestion(question)
    } catch (error) {
      console.error(`Error processing question at index ${index}:`, error, question)
      // Return a minimal safe question object
      return {
        id: question?.id || `error-${index}`,
        title: 'Error Loading Question',
        description: 'This question could not be loaded properly.',
        tags: [],
        upvotes: 0,
        views: 0,
        isAnswered: false,
        createdAt: new Date().toISOString(),
        user: { name: 'Unknown User' },
        answers: [],
        _count: { answers: 0 }
      }
    }
  })
}

/**
 * Validates that a question object is safe to render
 */
export function validateQuestionForRender(question: any): boolean {
  try {
    return (
      question &&
      typeof question.id === 'string' &&
      typeof question.title === 'string' &&
      Array.isArray(question.answers) &&
      question._count &&
      typeof question._count.answers === 'number'
    )
  } catch {
    return false
  }
}

/**
 * Safe getter for question answer count
 */
export function getAnswerCount(question: any): number {
  return question?._count?.answers ?? 
         (Array.isArray(question?.answers) ? question.answers.length : 0)
}

/**
 * Safe getter for question tags
 */
export function getQuestionTags(question: any): string[] {
  return Array.isArray(question?.tags) ? question.tags : []
}

/**
 * Safe getter for question answers
 */
export function getQuestionAnswers(question: any): SafeAnswer[] {
  if (!Array.isArray(question?.answers)) {
    return []
  }
  
  return question.answers.map((answer: any) => {
    try {
      return ensureSafeAnswer(answer)
    } catch {
      return {
        id: answer?.id || 'error',
        content: 'Error loading answer',
        upvotes: 0,
        isAccepted: false,
        createdAt: new Date().toISOString(),
        mentor: { user: { name: 'Unknown Mentor' } }
      }
    }
  })
}
