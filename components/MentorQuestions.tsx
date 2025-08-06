'use client'

import { useState, useEffect, useCallback } from 'react'
import { MessageSquare, Clock, CheckCircle, Eye, ThumbsUp, User, Send, Filter, Wifi, WifiOff, Users } from 'lucide-react'
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

interface MentorQuestionsProps {
  mentorId: string
}

export default function MentorQuestions({ mentorId }: MentorQuestionsProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unanswered' | 'answered'>('unanswered')
  const [answeringQuestionId, setAnsweringQuestionId] = useState<string | null>(null)
  const [answerContent, setAnswerContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Real-time updates
  const handleNewQuestion = useCallback((newQuestion: Question) => {
    setQuestions(prev => [newQuestion, ...prev])
    console.log('🆕 New question received:', newQuestion.title)
  }, [])

  const handleQuestionUpdated = useCallback((updatedQuestion: Question) => {
    setQuestions(prev => prev.map(q =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    ))
  }, [])

  const { isConnected, connectionError, activeUsers } = useRealtime({
    onNewQuestion: handleNewQuestion,
    onQuestionUpdated: handleQuestionUpdated,
    enabled: true
  })

  const fetchQuestions = async () => {
    try {
      // Explicitly fetch all questions for mentors (no userId filter)
      // Add timestamp to prevent caching
      const timestamp = Date.now()
      const response = await fetch(`/api/questions?limit=50&t=${timestamp}`)
      if (response.ok) {
        const data = await response.json()
        console.log('✅ Fetched questions for mentor:', data.length, 'questions')
        setQuestions(data)
      } else {
        console.error('❌ Failed to fetch questions:', response.status)
      }
    } catch (error) {
      console.error('❌ Error fetching questions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  const handleSubmitAnswer = async (questionId: string) => {
    console.log('🚀 Attempting to submit answer:', { questionId, content: answerContent.trim() })

    if (!answerContent.trim()) {
      console.log('❌ No answer content provided')
      return
    }

    setIsSubmitting(true)
    try {
      console.log('📡 Sending POST request to /api/answers...')
      const response = await fetch('/api/answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId,
          content: answerContent.trim()
        }),
      })

      if (response.ok) {
        const newAnswer = await response.json()
        console.log('✅ MentorQuestions: Answer submitted successfully!', newAnswer.id)
        setAnswerContent('')
        setAnsweringQuestionId(null)
        await fetchQuestions() // Refresh questions
      } else {
        const errorData = await response.json()
        console.error('❌ MentorQuestions: Answer submission failed:', response.status, errorData)
        throw new Error(errorData.error || 'Failed to submit answer')
      }
    } catch (error) {
      console.error('Error submitting answer:', error)
      alert('Failed to submit answer. Please try again.')
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

  const filteredQuestions = questions.filter(question => {
    if (filter === 'unanswered') return !question.isAnswered
    if (filter === 'answered') return question.isAnswered
    return true
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <p className="text-sm text-gray-500 mt-4">Loading questions from API...</p>
        </div>
      </div>
    )
  }

  console.log('🔍 MentorQuestions render:', {
    questionsCount: questions.length,
    filteredCount: filteredQuestions.length,
    filter,
    isLoading
  })

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <MessageSquare size={32} />
              Q&A Dashboard
            </h1>
            <p className="text-blue-100 mt-2">Help students achieve their career goals • {filteredQuestions.length} questions</p>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center gap-3">
            {isConnected ? (
              <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-300/50">
                <Wifi size={18} />
                <span className="font-medium">Live</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-red-500/20 px-4 py-2 rounded-full border border-red-300/50">
                <WifiOff size={18} />
                <span className="font-medium">Offline</span>
              </div>
            )}

            {activeUsers > 0 && (
              <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full border border-white border-opacity-30">
                <Users size={18} />
                <span className="font-medium">{activeUsers} online</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter & Stats Bar */}
      <div className="bg-background-secondary rounded-2xl shadow-lg border border-dark-400/20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Modern Filter Buttons */}
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-text-tertiary" />
              <span className="text-sm font-medium text-text-secondary">Filter:</span>
            </div>
            <div className="flex items-center bg-background-tertiary rounded-xl p-1 border border-dark-400/20">
              <button
                onClick={() => setFilter('unanswered')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  filter === 'unanswered'
                    ? 'bg-red-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                🔥 Unanswered
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  filter === 'unanswered' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600'
                }`}>
                  {filteredQuestions.filter(q => !q.isAnswered).length}
                </span>
              </button>
              <button
                onClick={() => setFilter('answered')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  filter === 'answered'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                ✅ Answered
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  filter === 'answered' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600'
                }`}>
                  {filteredQuestions.filter(q => q.isAnswered).length}
                </span>
              </button>
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  filter === 'all'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                📋 All Questions
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  filter === 'all' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
                }`}>
                  {questions.length}
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Showing {filteredQuestions.length} of {questions.length} questions</span>
          </div>
        </div>
      </div>
      
      {filteredQuestions.length === 0 ? (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
          <MessageSquare className="mx-auto text-gray-400 mb-4" size={64} />
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            {filter === 'unanswered' ? '🎉 All caught up!' :
             filter === 'answered' ? 'No answered questions yet' : 'Waiting for questions...'}
          </h4>
          <p className="text-gray-600 text-lg">
            {filter === 'unanswered' ? 'All questions have been answered! Great work!' : 'Students will ask questions soon.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredQuestions.map((question) => (
            <div key={question.id} className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              {/* Question Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {question.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">{question.user.name}</h5>
                      <p className="text-sm text-gray-500">{formatDate(question.createdAt)}</p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    question.isAnswered
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    {question.isAnswered ? (
                      <>
                        <CheckCircle size={16} />
                        Answered
                      </>
                    ) : (
                      <>
                        <Clock size={16} />
                        Needs Answer
                      </>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{question.title}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{question.description}</p>

                {question.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {question.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Question Stats */}
              <div className="px-6 py-3 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Eye size={16} />
                    <span>{question.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare size={16} />
                    <span>{question._count.answers} answers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp size={16} />
                    <span>{question.upvotes} upvotes</span>
                  </div>
                </div>

                {!question.isAnswered && (
                  <button
                    onClick={() => setAnsweringQuestionId(answeringQuestionId === question.id ? null : question.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Send size={16} />
                    Answer Question
                  </button>
                )}
              </div>

              {/* Existing Answers */}
              {question.answers.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-100">
                  <h5 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MessageSquare size={18} />
                    Previous Answers ({question.answers.length})
                  </h5>
                  <div className="space-y-4">
                    {question.answers.map((answer) => (
                      <div key={answer.id} className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            {answer.mentor.user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-gray-900">{answer.mentor.user.name}</span>
                              <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full font-medium border border-green-200">✓ Mentor</span>
                              <span className="text-sm text-gray-500">{formatDate(answer.createdAt)}</span>
                            </div>
                            <p className="text-gray-800 leading-relaxed">{answer.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Answer Form */}
              {answeringQuestionId === question.id && !question.isAnswered && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <h5 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Send size={18} />
                    Write Your Answer
                  </h5>
                  <textarea
                    value={answerContent}
                    onChange={(e) => setAnswerContent(e.target.value)}
                    placeholder="Share your expertise and help this student achieve their goals..."
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-800"
                    maxLength={2000}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-sm text-gray-500">{answerContent.length}/2000 characters</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setAnsweringQuestionId(null)
                          setAnswerContent('')
                        }}
                        className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSubmitAnswer(question.id)}
                        disabled={isSubmitting || !answerContent.trim()}
                        className="flex items-center gap-2 px-6 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                      >
                        <Send size={16} />
                        {isSubmitting ? 'Posting Answer...' : 'Post Answer'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
