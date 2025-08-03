'use client'

import { useState } from 'react'
import { MessageSquare, Send, Tag, X } from 'lucide-react'

interface AskQuestionFormProps {
  onSubmit: (question: { title: string; description: string; tags: string[] }) => Promise<void>
  isLoading?: boolean
}

export default function AskQuestionForm({ onSubmit, isLoading = false }: AskQuestionFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !description.trim()) {
      alert('Please fill in both title and description')
      return
    }

    try {
      await onSubmit({ title: title.trim(), description: description.trim(), tags })
      
      // Reset form
      setTitle('')
      setDescription('')
      setTags([])
      setCurrentTag('')
      setIsExpanded(false)
    } catch (error) {
      console.error('Error submitting question:', error)
      alert('Failed to submit question. Please try again.')
    }
  }

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim()) && tags.length < 5) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  if (!isExpanded) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center gap-3 text-left hover:bg-gray-50 p-4 rounded-lg transition-colors"
        >
          <div className="p-2 bg-blue-100 rounded-lg">
            <MessageSquare className="text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Ask a Question</h3>
            <p className="text-sm text-gray-600">Get expert advice from verified mentors</p>
          </div>
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <MessageSquare className="text-blue-600" size={20} />
          </div>
          <h3 className="font-semibold text-gray-900">Ask a Question</h3>
        </div>
        <button
          onClick={() => setIsExpanded(false)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <X size={16} className="text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Question Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What would you like to know?"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={200}
            required
          />
          <p className="text-xs text-gray-500 mt-1">{title.length}/200 characters</p>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide more details about your question..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            maxLength={1000}
            required
          />
          <p className="text-xs text-gray-500 mt-1">{description.length}/1000 characters</p>
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
            Tags (Optional)
          </label>
          <div className="flex gap-2 mb-2">
            <div className="flex-1 flex items-center gap-2">
              <Tag size={16} className="text-gray-400" />
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={handleTagKeyPress}
                placeholder="Add a tag..."
                className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
                maxLength={20}
              />
              <button
                type="button"
                onClick={addTag}
                disabled={!currentTag.trim() || tags.length >= 5}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
          <p className="text-xs text-gray-500 mt-1">Add up to 5 tags to help mentors find your question</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading || !title.trim() || !description.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
            {isLoading ? 'Posting...' : 'Post Question'}
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
