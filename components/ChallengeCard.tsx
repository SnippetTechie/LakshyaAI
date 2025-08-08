'use client';

import Link from 'next/link';
import { Clock, Star, Code, Stethoscope, BarChart2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Challenge } from '@/lib/challenges';

const iconMap: { [key: string]: React.ElementType } = {
  'Software Developer': Code,
  'Medical Doctor': Stethoscope,
  'Data Scientist': BarChart2,
};

const difficultyColorMap: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
    Easy: 'default',
    Medium: 'secondary',
    Hard: 'destructive',
};

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard = ({ challenge }: ChallengeCardProps) => {
  const Icon = iconMap[challenge.career] || Code;
  const badgeVariant = difficultyColorMap[challenge.difficulty] || 'outline';

  return (
    <Card className="flex flex-col h-full transition-transform transform hover:-translate-y-1 hover:shadow-xl">
      <CardHeader className="flex-row items-start gap-4 pb-4">
        <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
            <Icon size={24} />
        </div>
        <div className="flex-grow">
            <Badge variant={badgeVariant} className="float-right">{challenge.difficulty}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <h3 className="text-lg font-bold mb-1">{challenge.title}</h3>
        <p className="text-sm text-blue-500 font-semibold mb-3">{challenge.career}</p>
        <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>
        <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
            <div className="flex items-center"><Clock size={16} className="mr-1" /> {challenge.duration} mins</div>
            <div className="flex items-center"><Star size={16} className="mr-1" /> {challenge.points} pts</div>
        </div>
        <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">Skills you'll practice:</p>
            <div className="flex flex-wrap gap-2">
                {challenge.skills.map(skill => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                ))}
                {challenge.skills.length > 2 && (
                    <Badge variant="outline">+{challenge.skills.length - 2} more</Badge>
                )}
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/student/challenges/${challenge.id}`} className="w-full bg-blue-600 text-white text-center font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Try Challenge
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
