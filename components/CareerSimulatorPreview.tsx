'use client'

import { useState } from 'react'
import { Clock, Users, Star, ArrowRight, Play, X, Check } from 'lucide-react'
import {
  simulatorCards,
  challengeContent,
  handleCheckAnswer as checkAnswer,
  testSolution,
  evaluateCodeSolution,
  CardId
} from './career_simulator_functionalities'

const CareerSimulatorPreview = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [activeChallenge, setActiveChallenge] = useState<CardId | null>(null)
  const [challengeStep, setChallengeStep] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [userSolution, setUserSolution] = useState('')
  const [testResults, setTestResults] = useState<{ passed: boolean, actual: number }[]>([])
  // Add these right after your other state variables
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  const [completedChallenge, setCompletedChallenge] = useState<CardId | null>(null)

  const handleTryChallenge = (cardId: CardId) => {
    setActiveChallenge(cardId)
    setChallengeStep(0)
    setSelectedOption(null)
    setShowAnswer(false)
    setUserSolution('')
    setTestResults([])
  }

  const handleCloseChallenge = () => {
    setActiveChallenge(null)
    setChallengeStep(0)
    setSelectedOption(null)
    setShowAnswer(false)
    setUserSolution('')
    setTestResults([])
  }

  const handleNextStep = () => {
    if (!activeChallenge) return

    const challenge = challengeContent[activeChallenge]
    const maxSteps = challenge?.steps.length || 0

    if (challengeStep < maxSteps) {
      // If not on the last step, go to next step
      setChallengeStep(challengeStep + 1)
      setSelectedOption(null)
      setShowAnswer(false)
    } else {
      // If on the last step, this is the "Complete Challenge" button
      // Show completion modal instead of alert
      setCompletedChallenge(activeChallenge)
      setShowCompletionModal(true)
    }
  }

  const handleCloseCompletionModal = () => {
    setShowCompletionModal(false)
    handleCloseChallenge() // Close the challenge after closing the modal
  }

  const handleCheckAnswer = () => {
    if (
      activeChallenge === 'software-developer' &&
      challengeStep === 2 &&
      selectedOption !== null
    ) {
      setShowAnswer(true)
    }
  }

  const handleSubmitSolution = () => {
    // In a real app, we would validate the solution
    if (activeChallenge === 'software-developer' && challengeStep === 3) {
      alert('Solution submitted successfully! You\'ve fixed the bug.')
    }
  }

  const handleRunTest = (testIndex: number) => {
    // In a real app, we would actually run the code
    if (activeChallenge === 'software-developer' && challengeStep === 4) {
      const newResults = [...testResults]
      newResults[testIndex] = {
        passed: true,
        actual: challengeContent['software-developer'].stepContent![3].testCases![testIndex].expectedOutput
      }
      setTestResults(newResults)
    }
  }

  const handleViewAll = () => {
    console.log('Viewing all simulations')
    // This would navigate to a page with all simulations
  }

  const currentCard = activeChallenge ? simulatorCards.find(card => card.id === activeChallenge) : null
  const currentChallenge = activeChallenge ? challengeContent[activeChallenge] : null
  const currentStepContent = activeChallenge && currentChallenge?.stepContent && challengeStep > 0
    ? currentChallenge.stepContent[challengeStep - 1]
    : null

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-white via-purple-50 to-pink-50 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Challenge Modal */}
        {activeChallenge && currentCard && currentChallenge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{currentCard.icon}</div>
                    <div>
                      <h3 className="font-bold text-2xl text-gray-900">{currentChallenge.title}</h3>
                      <p className="text-gray-600">{currentChallenge.subtitle}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseChallenge}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-gray-200">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${(challengeStep / currentChallenge.steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-6">
                {challengeStep === 0 ? (
                  // Introduction screen
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-xl mb-3">Instructions</h4>
                      <p className="text-gray-700">{currentChallenge.instructions}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-xl mb-3">Challenge Steps</h4>
                      <ul className="space-y-3">
                        {currentChallenge.steps.map((step, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="bg-gray-100 rounded-full p-1 mt-0.5">
                              <div className="w-5 h-5 flex items-center justify-center bg-blue-600 text-white rounded-full text-xs">
                                {index + 1}
                              </div>
                            </div>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-xl mb-3">Tools You'll Use</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentChallenge.tools.map((tool, index) => (
                          <li key={index} className="bg-gray-50 p-3 rounded-lg">
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Add Start Challenge button */}
                    <div className="flex justify-end mt-8">
                      <button
                        onClick={handleNextStep}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2"
                      >
                        Start Challenge
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  // Step screens
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-xl mb-2">
                        Step {challengeStep}: {currentChallenge.steps[challengeStep - 1]}
                      </h4>
                      <p className="text-gray-700">
                        {currentStepContent?.instructions || 'Complete this step of the challenge to continue your progress.'}
                      </p>
                    </div>

                    {/* Interactive area for the specific step */}
                    <div className="bg-gray-50 p-6 rounded-xl min-h-[200px]">
                      {currentStepContent ? (
                        <div className="space-y-4">
                          {/* Content section */}
                          {currentStepContent.content && (
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                              <p className="text-gray-700 whitespace-pre-wrap">{currentStepContent.content}</p>
                            </div>
                          )}

                          {/* Hints section */}
                          {currentStepContent.hints && currentStepContent.hints.length > 0 && (
                            <div className="mt-4">
                              <h5 className="font-medium text-gray-900 mb-2">Hints:</h5>
                              <ul className="list-disc list-inside space-y-1">
                                {currentStepContent.hints.map((hint, index) => (
                                  <li key={index} className="text-gray-700">{hint}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {/* Multiple choice options */}
                          {currentStepContent.options && currentStepContent.options.length > 0 && (
                            <div className="mt-4 space-y-3">
                              <h5 className="font-medium text-gray-900 mb-2">Select an option:</h5>
                              {currentStepContent.options.map((option, index) => (
                                <div
                                  key={index}
                                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedOption === index
                                      ? 'bg-blue-100 border-blue-300'
                                      : 'bg-white border-gray-200 hover:bg-gray-50'
                                    }`}
                                  onClick={() => setSelectedOption(index)}
                                >
                                  <p className="text-gray-800">{option}</p>
                                </div>
                              ))}

                              {selectedOption !== null && (
                                <button
                                  onClick={handleCheckAnswer}
                                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                  Check Answer
                                </button>
                              )}

                              {showAnswer && currentStepContent.correctAnswer !== undefined && (
                                <div className={`mt-4 p-4 rounded-lg ${selectedOption === currentStepContent.correctAnswer
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                  }`}>
                                  {selectedOption === currentStepContent.correctAnswer
                                    ? '✅ Correct! Great job!'
                                    : '❌ Incorrect. Try again!'}
                                  {currentStepContent.explanation && (
                                    <p className="mt-2 text-gray-700">{currentStepContent.explanation}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Code section */}
                          {currentStepContent.buggyCode && (
                            <div className="mt-4 space-y-3">
                              <h5 className="font-medium text-gray-900 mb-2">Fix the bug in this code:</h5>
                              <div className="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
                                <pre className="whitespace-pre-wrap">{currentStepContent.buggyCode}</pre>
                              </div>
                              <textarea
                                className="w-full h-48 p-3 border border-gray-300 rounded-lg font-mono text-sm"
                                value={userSolution}
                                onChange={(e) => setUserSolution(e.target.value)}
                                placeholder="Write your solution here..."
                              />
                              <button
                                onClick={handleSubmitSolution}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                              >
                                Submit Solution
                              </button>
                            </div>
                          )}

                          {/* Test cases section */}
                          {currentStepContent.testCases && currentStepContent.testCases.length > 0 && (
                            <div className="mt-4 space-y-3">
                              <h5 className="font-medium text-gray-900 mb-2">Test your solution:</h5>
                              {currentStepContent.testCases.map((testCase, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                  <div className="bg-gray-50 p-3 border-b border-gray-200">
                                    <p className="font-medium text-gray-800">{testCase.description}</p>
                                  </div>
                                  <div className="p-3 flex justify-between items-center">
                                    <div>
                                      <p className="text-sm text-gray-600">
                                        Input: {JSON.stringify(testCase.input)}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        Expected: {testCase.expectedOutput}
                                      </p>
                                      {testResults[index] && (
                                        <p className={`text-sm font-medium ${testResults[index].passed ? 'text-green-600' : 'text-red-600'}`}>
                                          Actual: {testResults[index].actual}
                                        </p>
                                      )}
                                    </div>
                                    <button
                                      onClick={() => handleRunTest(index)}
                                      className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                    >
                                      Run Test
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="flex justify-center mb-4">
                            {currentChallenge.icon}
                          </div>
                          <p className="text-gray-500">
                            No content available for this step.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between mt-8">
                      <button
                        onClick={handleCloseChallenge}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                      >
                        Exit Challenge
                      </button>

                      <button
                        onClick={handleNextStep}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2"
                      >
                        {challengeStep < currentChallenge.steps.length ? (
                          <>
                            Next Step
                            <ArrowRight size={16} />
                          </>
                        ) : (
                          <>
                            Complete Challenge
                            <Check size={16} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Challenge Completion Modal */}
        {showCompletionModal && completedChallenge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-green-600" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Challenge Completed!
              </h3>

              <p className="text-gray-700 mb-6">
                Congratulations! You have successfully completed the {completedChallenge} challenge.
              </p>

              <div className="flex justify-between gap-4">
                <button
                  onClick={handleCloseCompletionModal}
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  Return to Challenges
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Career Simulator
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Try real tasks from different careers to see what actually fits you.
            No textbook theory – just hands-on experience.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {simulatorCards.map((card, index) => (
            <div
              key={card.id}
              className={`bg-white border-2 border-gray-200 rounded-2xl p-6 card-hover animate-fade-in-up ${selectedCard === card.id ? 'border-blue-500 shadow-lg' : ''
                }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setSelectedCard(card.id)}
              onMouseLeave={() => setSelectedCard(null)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{card.icon}</div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${card.levelColor}`}>
                      {card.level}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-500">{card.company}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">
                    Challenge: {card.challenge}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                  {/* Render tasks if available */}
                  {card.tasks && (
                    <ul className="mt-3 list-disc list-inside text-sm text-gray-700">
                      {card.tasks.map((task, idx) => (
                        <li key={idx}>{task}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <div className="flex flex-wrap gap-2">
                    {card.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{card.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users size={14} />
                      <span>{card.participants}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="text-yellow-500 fill-current" />
                      <span>{card.rating}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleTryChallenge(card.id as CardId)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                >
                  <Play size={16} />
                  Try Challenge
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={handleViewAll}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-semibold inline-flex items-center gap-2"
          >
            View All Simulations
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default CareerSimulatorPreview