'use client'

import { useState, useEffect, useCallback } from 'react'
import { MessageSquare, Clock, CheckCircle, Eye, ThumbsUp, User, Wifi, WifiOff, Users } from 'lucide-react'
import AskQuestionForm from './AskQuestionForm'
import { useRealtime } from '@/hooks/useRealtime'

interface Question {
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
  answers: Answer[]
  _count: {
    answers: number
  }
}

interface Answer {
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

interface StudentQuestionsProps {
  userId: string
}

export default function StudentQuestions({ userId }: StudentQuestionsProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Real-time updates
  const handleNewAnswer = useCallback((data: any) => {
    console.log('📨 StudentQuestions: Received new answer data:', data)

    // Update the specific question with the new answer
    setQuestions(prev => prev.map(q => {
      if (q.id === data.question?.id || q.id === data.questionId) {
        const currentAnswerCount = q._count?.answers || 0
        return {
          ...q,
          isAnswered: true,
          answers: [...(q.answers || []), data.answer || data],
          _count: {
            answers: currentAnswerCount + 1
          }
        }
      }
      return q
    }))

    console.log('✅ StudentQuestions: New answer processed for your question!')
  }, [])

  const handleQuestionUpdated = useCallback((updatedQuestion: Question) => {
    console.log('🔄 StudentQuestions: Question updated:', updatedQuestion.id, updatedQuestion._count)

    setQuestions(prev => prev.map(q => {
      if (q.id === updatedQuestion.id) {
        // Ensure _count field is properly maintained
        const safeUpdatedQuestion = {
          ...updatedQuestion,
          _count: {
            answers: updatedQuestion._count?.answers ?? q._count?.answers ?? 0
          },
          answers: updatedQuestion.answers || q.answers || []
        }
        console.log('✅ StudentQuestions: Question updated with safe _count:', safeUpdatedQuestion._count)
        return safeUpdatedQuestion
      }
      return q
    }))
  }, [])

  const { isConnected, connectionError, activeUsers } = useRealtime({
    onNewAnswer: handleNewAnswer,
    onQuestionUpdated: handleQuestionUpdated,
    enabled: true
  })

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`/api/questions?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        // Ensure each question has an answers array
        const questionsWithAnswers = data.map((question: any) => ({
          ...question,
          answers: question.answers || [],
          _count: question._count || { answers: 0 }
        }))
        setQuestions(questionsWithAnswers)
      }
    } catch (error) {
      console.error('Error fetching questions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [userId])

  const handleSubmitQuestion = async (questionData: { title: string; description: string; tags: string[] }) => {
    console.log('🚀 StudentQuestions: Submitting question:', questionData.title)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      })

      if (response.ok) {
        const newQuestion = await response.json()
        console.log('✅ StudentQuestions: Question posted successfully!', newQuestion.id)
        await fetchQuestions() // Refresh questions
      } else {
        const errorData = await response.json()
        console.error('❌ StudentQuestions: Failed to submit question:', response.status, errorData)
        throw new Error(errorData.error || 'Failed to submit question')
      }
    } catch (error) {
      console.error('❌ StudentQuestions: Error submitting question:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-background-secondary rounded-xl p-6 shadow-lg border border-dark-400/20 animate-pulse">
          <div className="h-4 bg-dark-300 rounded w-1/4 mb-4"></div>
          <div className="h-3 bg-dark-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-dark-300 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <AskQuestionForm onSubmit={handleSubmitQuestion} isLoading={isSubmitting} />

        <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MessageSquare size={20} />
            Your Questions ({questions.length})
          </h3>

          {/* Real-time connection indicator */}
          <div className="flex items-center gap-4">
            {isConnected ? (
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <Wifi size={14} />
                <span>Live</span>
              </div>
            ) : connectionError ? (
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <WifiOff size={14} />
                <span>Offline</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <WifiOff size={14} />
                <span>Connecting...</span>
              </div>
            )}

            {activeUsers > 0 && (
              <div className="flex items-center gap-1 text-gray-600 text-sm">
                <Users size={14} />
                <span>{activeUsers} online</span>
              </div>
            )}
          </div>
        </div>
        
        {questions.length === 0 ? (
          <div className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200 text-center">
            <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No questions yet</h4>
            <p className="text-gray-600">Ask your first question to get expert advice from mentors!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((question) => (
              <div key={question.id} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{question.title}</h4>
                    <p className="text-gray-600 mb-3">{question.description}</p>
                    
                    {question.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {question.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    question.isAnswered 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {question.isAnswered ? (
                      <>
                        <CheckCircle size={12} />
                        Answered
                      </>
                    ) : (
                      <>
                        <Clock size={12} />
                        Pending
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      {question.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp size={14} />
                      {question.upvotes} upvotes
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare size={14} />
                      {question._count?.answers ?? 0} answers
                    </span>
                  </div>
                  <span>{formatDate(question.createdAt)}</span>
                </div>
                
                {question.answers && question.answers.length > 0 && (
                  <div className="border-t pt-4">
                    <h5 className="font-medium text-gray-900 mb-3">Answers:</h5>
                    <div className="space-y-3">
                      {question.answers.map((answer) => (
                        <div key={answer.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              {answer.mentor.user.avatarUrl ? (
                                <img
                                  src={answer.mentor.user.avatarUrl}
                                  alt={answer.mentor.user.name}
                                  className="w-8 h-8 rounded-full"
                                />
                              ) : (
                                <User size={16} className="text-blue-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-gray-900">{answer.mentor.user.name}</span>
                                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded">Mentor</span>
                                <span className="text-xs text-gray-500">{formatDate(answer.createdAt)}</span>
                              </div>
                              <p className="text-gray-700">{answer.content}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600">
                                  <ThumbsUp size={12} />
                                  {answer.upvotes}
                                </button>
                                {answer.isAccepted && (
                                  <span className="flex items-center gap-1 text-xs text-green-600">
                                    <CheckCircle size={12} />
                                    Accepted Answer
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        </div>
    </div>
  )
}
