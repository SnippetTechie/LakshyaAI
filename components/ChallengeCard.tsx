'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, Star, Code, Stethoscope, BarChart2, Trophy, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Challenge } from '@/lib/challenges';
import { ChallengeProgressManager } from '@/lib/challengeProgress';

const iconMap: { [key: string]: React.ElementType } = {
  'Software Developer': Code,
  'Medical Doctor': Stethoscope,
  'Data Scientist': BarChart2,
};

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard = ({ challenge }: ChallengeCardProps) => {
  const Icon = iconMap[challenge.career] || Code;
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState<any>(null);

  useEffect(() => {
    const challengeProgress = ChallengeProgressManager.getProgress(challenge.id);
    if (challengeProgress?.completed) {
      setIsCompleted(true);
      setProgress(challengeProgress);
    }

    // Listen for completion events
    const handleCompletion = (event: CustomEvent) => {
      if (event.detail.challengeId === challenge.id) {
        setIsCompleted(true);
        const updatedProgress = ChallengeProgressManager.getProgress(challenge.id);
        setProgress(updatedProgress);
      }
    };

    window.addEventListener('challengeCompleted', handleCompletion as EventListener);
    return () => {
      window.removeEventListener('challengeCompleted', handleCompletion as EventListener);
    };
  }, [challenge.id]);

  return (
    <Card className={`flex flex-col h-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl min-h-[400px] ${
      isCompleted 
        ? 'bg-gradient-to-br from-green-50 to-emerald-50/30 border-green-200' 
        : 'bg-gradient-to-br from-white to-blue-50/30 border-blue-100'
    }`}>
      <CardHeader className="flex-row items-start gap-4 pb-4">
        <div className={`p-3 rounded-xl shadow-sm ${
          isCompleted 
            ? 'bg-gradient-to-br from-green-50 to-green-100 text-green-600' 
            : 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600'
        }`}>
          {isCompleted ? <Trophy size={24} /> : <Icon size={24} />}
        </div>
        <div className="flex-grow">
            <Badge 
              variant="secondary" 
              className={`float-right text-xs font-medium px-2 py-1 rounded-full ${
                challenge.difficulty === 'Easy' 
                  ? 'bg-green-50 text-green-600 border-green-200' 
                  : challenge.difficulty === 'Medium' 
                  ? 'bg-yellow-50 text-yellow-600 border-yellow-200' 
                  : 'bg-red-50 text-red-600 border-red-200'
              }`}
            >
              {challenge.difficulty}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <h3 className="text-lg font-bold mb-1 text-gray-800">{challenge.title}</h3>
        <p className="text-sm text-blue-600 font-semibold mb-3">{challenge.career}</p>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{challenge.description}</p>
        <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
            <div className="flex items-center bg-gray-50 px-2 py-1 rounded-md">
              <Clock size={14} className="mr-1 text-gray-400" /> 
              <span className="text-xs">{challenge.duration} mins</span>
            </div>
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md">
              <Star size={14} className="mr-1 text-yellow-500" /> 
              <span className="text-xs">{challenge.points} pts</span>
            </div>
        </div>
        <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">Skills you'll practice:</p>
            <div className="flex flex-wrap gap-2">
                {challenge.skills.slice(0, 2).map(skill => (
                    <Badge 
                      key={skill} 
                      variant="outline" 
                      className="text-xs bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                      {skill}
                    </Badge>
                ))}
                {challenge.skills.length > 2 && (
                    <Badge 
                      variant="outline" 
                      className="text-xs bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      +{challenge.skills.length - 2} more
                    </Badge>
                )}
            </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            {isCompleted ? (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle size={16} />
                <span className="font-medium">Completed</span>
                {progress?.score && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full ml-2">
                    {progress.score}% score
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1 text-gray-500">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Available</span>
              </div>
            )}
          </div>
          <Link 
            href={`/student/challenges/${challenge.id}`} 
            className={`font-medium text-sm hover:underline transition-colors duration-200 ${
              isCompleted 
                ? 'text-green-600 hover:text-green-700' 
                : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            {isCompleted ? 'Review →' : 'Start Challenge →'}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
