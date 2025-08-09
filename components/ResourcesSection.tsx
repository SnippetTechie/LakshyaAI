'use client';

import { useState } from 'react';
import { Play, FileText, ExternalLink, Clock, Eye, Calendar, BookOpen, Download, Star } from 'lucide-react';
import { careerResources, VideoResource, DocumentResource } from '@/lib/careerResources';

const ResourcesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(careerResources[0].id);
  const [activeTab, setActiveTab] = useState<'videos' | 'documents'>('videos');

  const currentCategory = careerResources.find(cat => cat.id === selectedCategory);

  const formatViews = (views: string) => {
    return views.replace('K', 'K').replace('M', 'M');
  };

  const formatDuration = (duration: string) => {
    return duration;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText size={16} className="text-red-600" />;
      case 'Course':
        return <BookOpen size={16} className="text-blue-600" />;
      case 'Guide':
        return <Star size={16} className="text-yellow-600" />;
      case 'Documentation':
        return <FileText size={16} className="text-green-600" />;
      case 'Article':
        return <FileText size={16} className="text-purple-600" />;
      default:
        return <FileText size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Career Path</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {careerResources.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                selectedCategory === category.id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="text-sm font-medium text-gray-900 text-center leading-tight">
                {category.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {currentCategory && (
        <div className="space-y-6">
          {/* Category Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center gap-4 mb-3">
              <div className="text-4xl">{currentCategory.icon}</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{currentCategory.name}</h3>
                <p className="text-gray-700">{currentCategory.description}</p>
              </div>
            </div>
          </div>

          {/* Content Type Tabs */}
          <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 p-2">
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all ${
                activeTab === 'videos'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Play size={20} />
              YouTube Videos ({currentCategory.videos.length})
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all ${
                activeTab === 'documents'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FileText size={20} />
              Documents & Guides ({currentCategory.documents.length})
            </button>
          </div>

          {/* Videos Tab */}
          {activeTab === 'videos' && (
            <div className="grid md:grid-cols-2 gap-6">
              {currentCategory.videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="grid md:grid-cols-2 gap-6">
              {currentCategory.documents.map((document) => (
                <DocumentCard 
                  key={document.id} 
                  document={document} 
                  getDifficultyColor={getDifficultyColor}
                  getTypeIcon={getTypeIcon}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Video Card Component
const VideoCard = ({ video }: { video: VideoResource }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="bg-red-600 text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
            <Play size={24} fill="white" />
          </div>
        </div>
        
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h4 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
          {video.title}
        </h4>
        <p className="text-gray-700 text-sm mb-4 line-clamp-2 font-medium">
          {video.description}
        </p>

        {/* Channel Info */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
              <Play size={12} className="text-red-600" />
            </div>
            <span className="font-semibold text-gray-800">{video.channel}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={14} className="text-gray-600" />
            <span className="font-medium text-gray-700">{video.views} views</span>
          </div>
        </div>

        {/* Watch Button */}
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-red-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2 group"
        >
          <Play size={18} />
          Watch on YouTube
          <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>
    </div>
  );
};

// Document Card Component
const DocumentCard = ({ 
  document, 
  getDifficultyColor, 
  getTypeIcon 
}: { 
  document: DocumentResource;
  getDifficultyColor: (difficulty: string) => string;
  getTypeIcon: (type: string) => JSX.Element;
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {getTypeIcon(document.type)}
          <div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(document.difficulty)}`}>
              {document.difficulty}
            </span>
          </div>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
          {document.type}
        </span>
      </div>

      {/* Content */}
      <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {document.title}
      </h4>
      <p className="text-gray-700 text-sm mb-4 line-clamp-3 font-medium">
        {document.description}
      </p>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <BookOpen size={14} className="text-gray-600" />
          <span className="font-medium text-gray-700">{document.source}</span>
        </div>
        {document.pages && (
          <div className="flex items-center gap-1">
            <FileText size={14} className="text-gray-600" />
            <span className="font-medium text-gray-700">{document.pages} pages</span>
          </div>
        )}
      </div>

      {/* Access Button */}
      <a
        href={document.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group"
      >
        <Download size={18} />
        Access {document.type}
        <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
    </div>
  );
};

export default ResourcesSection;
