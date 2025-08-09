'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getChallengeById } from '@/lib/challenges';
import { ChallengeProgressManager } from '@/lib/challengeProgress';
import { ArrowLeft, Clock, Star, CheckCircle, Play, Lightbulb, Target, Trophy, Sparkles } from 'lucide-react';

const ChallengePage = () => {
  const params = useParams();
  const router = useRouter();
  const challengeId = params.challengeId as string;
  const challenge = getChallengeById(challengeId);
  
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (challengeId) {
      const progress = ChallengeProgressManager.getProgress(challengeId);
      if (progress?.completed) {
        setIsCompleted(true);
      }
    }
  }, [challengeId]);

  const handleComplete = (score: number = 100) => {
    const timeSpent = Math.round((Date.now() - startTime) / 60000); // Convert to minutes
    ChallengeProgressManager.markCompleted(challengeId, score, timeSpent);
    setIsCompleted(true);
    setShowCelebration(true);
    
    // Hide celebration after 3 seconds
    setTimeout(() => setShowCelebration(false), 3000);
  };

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background-primary pt-20 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Challenge Not Found</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const getInteractiveContent = () => {
    switch (challenge.career) {
      case 'Software Developer':
        return <SoftwareDeveloperChallenge onComplete={handleComplete} isCompleted={isCompleted} />;
      case 'UI/UX Designer':
        return <DesignerChallenge onComplete={handleComplete} isCompleted={isCompleted} />;
      case 'Medical Doctor':
        return <MedicalChallenge onComplete={handleComplete} isCompleted={isCompleted} />;
      default:
        return <GenericChallenge challenge={challenge} onComplete={handleComplete} isCompleted={isCompleted} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-primary pt-20">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4 transform animate-bounce">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h2>
            <p className="text-gray-600 mb-4">You've successfully completed this challenge!</p>
            <div className="flex items-center justify-center gap-2 text-yellow-600">
              <Trophy size={24} />
              <span className="font-semibold">+{challenge.points} points earned!</span>
            </div>
            <div className="mt-6 flex justify-center">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="text-yellow-400 animate-pulse" size={16} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-100/20 to-accent-100/20"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">{challenge.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full">{challenge.career}</span>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{challenge.duration} mins</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={16} />
                <span>{challenge.points} pts</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                challenge.difficulty === 'Easy' 
                  ? 'bg-green-100 text-green-800' 
                  : challenge.difficulty === 'Medium' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {challenge.difficulty}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Challenge Description</h2>
            <p className="text-gray-800 leading-relaxed font-medium">{challenge.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills You'll Practice</h3>
            <div className="flex flex-wrap gap-2">
              {challenge.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold border border-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            {getInteractiveContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ChallengeProps {
  onComplete: (score?: number) => void;
  isCompleted: boolean;
}

const SoftwareDeveloperChallenge = ({ onComplete, isCompleted }: ChallengeProps) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Lightbulb className="text-blue-600 mt-1" size={20} />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Your Mission</h4>
            <p className="text-blue-800 text-sm">
              Build a functional calculator using HTML, CSS, and JavaScript. Try the interactive code editor below!
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
        >
          <Play size={16} />
          {showPreview ? 'Hide' : 'Start'} Coding Challenge
        </button>
      </div>

      {showPreview && (
        <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono border border-gray-700">
          <div className="mb-4">
            <div className="text-yellow-400 font-semibold">// Welcome to the Calculator Challenge!</div>
            <div className="text-gray-300">// Your task: Build a working calculator</div>
          </div>
          <div className="space-y-2 text-green-300">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">1.</span>
              <span>Create HTML structure for calculator buttons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">2.</span>
              <span>Style with CSS for better appearance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">3.</span>
              <span>Add JavaScript for calculations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">4.</span>
              <span>Test your calculator functionality</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        {isCompleted ? (
          <div className="text-center">
            <div className="bg-green-100 text-green-800 px-8 py-3 rounded-lg flex items-center gap-2 mb-4">
              <Trophy size={20} />
              <span className="font-semibold">Challenge Completed!</span>
            </div>
            <p className="text-gray-600 text-sm">Great job! You've mastered this coding challenge.</p>
          </div>
        ) : (
          <button 
            onClick={() => onComplete(95)}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <CheckCircle size={20} />
            Complete Challenge
          </button>
        )}
      </div>
    </div>
  );
};

const DesignerChallenge = ({ onComplete, isCompleted }: ChallengeProps) => {
  const [selectedColor, setSelectedColor] = useState('');
  
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Target className="text-purple-600 mt-1" size={20} />
          <div>
            <h4 className="font-semibold text-purple-900 mb-2">Design Challenge</h4>
            <p className="text-purple-800 text-sm">
              Create a mobile app interface for a food delivery service. Choose your color palette!
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Choose Primary Color</h4>
        <div className="flex gap-4">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`w-16 h-16 rounded-full cursor-pointer border-4 transition-all shadow-md hover:shadow-lg ${
                selectedColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>

      {selectedColor && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Your Design Preview</h4>
          <div className="bg-gray-100 rounded-lg p-4 max-w-sm mx-auto">
            <div 
              className="h-2 rounded-t-lg mb-4"
              style={{ backgroundColor: selectedColor }}
            />
            <h5 className="font-bold text-lg mb-2 text-gray-900">FoodieApp</h5>
            <p className="text-gray-600 text-sm mb-4">Delicious food delivered fast</p>
            <div className="space-y-2">
              <div className="bg-white rounded p-3 shadow-sm text-gray-800 font-medium">Restaurant 1</div>
              <div className="bg-white rounded p-3 shadow-sm text-gray-800 font-medium">Restaurant 2</div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        {isCompleted ? (
          <div className="text-center">
            <div className="bg-purple-100 text-purple-800 px-8 py-3 rounded-lg flex items-center gap-2 mb-4">
              <Trophy size={20} />
              <span className="font-semibold">Design Completed!</span>
            </div>
            <p className="text-gray-600 text-sm">Excellent work! Your design skills are improving.</p>
          </div>
        ) : (
          <button 
            onClick={() => onComplete(90)}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <CheckCircle size={20} />
            Submit Design
          </button>
        )}
      </div>
    </div>
  );
};

const MedicalChallenge = ({ onComplete, isCompleted }: ChallengeProps) => {
  const [diagnosis, setDiagnosis] = useState('');

  const diagnoses = [
    'Heart Attack',
    'Panic Attack', 
    'Pulmonary Embolism',
    'Pneumonia'
  ];

  return (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h4 className="font-semibold text-red-900 mb-2">Patient Case</h4>
        <p className="text-red-800 text-sm">
          45-year-old female with chest pain, shortness of breath, and rapid heart rate.
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Your Diagnosis</h4>
        <div className="space-y-2">
          {diagnoses.map((diagnosisOption, index) => (
            <div
              key={index}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                diagnosis === diagnosisOption
                  ? 'border-red-500 bg-red-50 text-red-900'
                  : 'border-gray-200 hover:border-red-300 bg-white text-gray-900 hover:bg-red-50'
              }`}
              onClick={() => setDiagnosis(diagnosisOption)}
            >
              <span className="font-medium">{diagnosisOption}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        {isCompleted ? (
          <div className="text-center">
            <div className="bg-red-100 text-red-800 px-8 py-3 rounded-lg flex items-center gap-2 mb-4">
              <Trophy size={20} />
              <span className="font-semibold">Diagnosis Completed!</span>
            </div>
            <p className="text-gray-600 text-sm">Well done! Your medical reasoning skills are developing.</p>
          </div>
        ) : (
          <button 
            onClick={() => onComplete(85)}
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <CheckCircle size={20} />
            Submit Diagnosis
          </button>
        )}
      </div>
    </div>
  );
};

const GenericChallenge = ({ challenge, onComplete, isCompleted }: { challenge: any } & ChallengeProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
        <h4 className="font-semibold text-gray-900 mb-3">Interactive Challenge Coming Soon!</h4>
        <p className="text-gray-700 mb-4">
          This {challenge.career} simulation is being developed. 
          For now, explore the challenge description and skills above.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <h5 className="font-semibold text-blue-900 mb-2">What You'll Learn</h5>
          <ul className="text-blue-800 text-sm space-y-1 text-left">
            {challenge.skills.map((skill: string, index: number) => (
              <li key={index} className="font-medium">• {skill}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-center">
        {isCompleted ? (
          <div className="text-center">
            <div className="bg-gray-100 text-gray-800 px-8 py-3 rounded-lg flex items-center gap-2 mb-4">
              <Trophy size={20} />
              <span className="font-semibold">Challenge Explored!</span>
            </div>
            <p className="text-gray-600 text-sm">Great! You've explored this {challenge.career} simulation.</p>
          </div>
        ) : (
          <button 
            onClick={() => onComplete(75)}
            className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <CheckCircle size={20} />
            Mark as Explored
          </button>
        )}
      </div>
    </div>
  );
};

export default ChallengePage;
