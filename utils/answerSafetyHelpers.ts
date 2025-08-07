// Answer safety helpers to prevent runtime errors in student dashboard

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
 * Ensures an answer object has all required fields with safe defaults
 */
export function ensureSafeAnswer(answer: any): SafeAnswer {
  if (!answer) {
    console.warn('Answer object is null or undefined, creating safe default')
    return createDefaultAnswer()
  }

  return {
    id: answer.id || `temp-${Date.now()}-${Math.random()}`,
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
 * Creates a default safe answer object
 */
function createDefaultAnswer(): SafeAnswer {
  return {
    id: `default-${Date.now()}`,
    content: 'Answer content unavailable',
    upvotes: 0,
    isAccepted: false,
    createdAt: new Date().toISOString(),
    mentor: {
      user: {
        name: 'Anonymous Mentor'
      }
    }
  }
}

/**
 * Safely processes an array of answers from API response or real-time updates
 */
export function processSafeAnswers(answers: any[]): SafeAnswer[] {
  if (!Array.isArray(answers)) {
    console.warn('Answers is not an array, returning empty array')
    return []
  }

  return answers.map((answer, index) => {
    try {
      return ensureSafeAnswer(answer)
    } catch (error) {
      console.error(`Error processing answer at index ${index}:`, error, answer)
      return createDefaultAnswer()
    }
  })
}

/**
 * Validates that an answer object is safe to render
 */
export function validateAnswerForRender(answer: any): boolean {
  try {
    return (
      answer &&
      typeof answer.id === 'string' &&
      typeof answer.content === 'string' &&
      answer.mentor &&
      answer.mentor.user &&
      typeof answer.mentor.user.name === 'string'
    )
  } catch {
    return false
  }
}

/**
 * Safe getter for answer mentor name
 */
export function getAnswerMentorName(answer: any): string {
  return answer?.mentor?.user?.name || 'Anonymous Mentor'
}

/**
 * Safe getter for answer mentor avatar
 */
export function getAnswerMentorAvatar(answer: any): string | undefined {
  return answer?.mentor?.user?.avatarUrl
}

/**
 * Safe getter for answer upvotes
 */
export function getAnswerUpvotes(answer: any): number {
  return typeof answer?.upvotes === 'number' ? answer.upvotes : 0
}

/**
 * Safe getter for answer content
 */
export function getAnswerContent(answer: any): string {
  return answer?.content || 'No content available'
}

/**
 * Processes real-time answer data to ensure safety
 */
export function processRealtimeAnswerData(data: any): SafeAnswer {
  console.log('🔄 Processing real-time answer data:', data)
  
  // Handle different possible data structures from real-time updates
  const answerData = data.answer || data
  
  const safeAnswer = ensureSafeAnswer(answerData)
  
  console.log('✅ Real-time answer processed safely:', safeAnswer.id)
  return safeAnswer
}

/**
 * Validates and fixes answer data structure in questions
 */
export function validateQuestionAnswers(question: any): any {
  if (!question) return question
  
  return {
    ...question,
    answers: processSafeAnswers(question.answers || [])
  }
}

/**
 * Emergency fallback for corrupted answer data
 */
export function createEmergencyAnswer(questionId: string): SafeAnswer {
  return {
    id: `emergency-${questionId}-${Date.now()}`,
    content: 'This answer could not be loaded properly. Please refresh the page.',
    upvotes: 0,
    isAccepted: false,
    createdAt: new Date().toISOString(),
    mentor: {
      user: {
        name: 'System'
      }
    }
  }
}

/**
 * Comprehensive answer safety check for rendering
 */
export function renderSafeAnswer(answer: any): SafeAnswer {
  if (!validateAnswerForRender(answer)) {
    console.warn('Answer failed validation, using safe defaults:', answer)
    return ensureSafeAnswer(answer)
  }
  return answer as SafeAnswer
}
