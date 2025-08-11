import { getChallengeById } from '@/lib/challenges';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Award } from 'lucide-react';

type ChallengePageParams = { challengeId: string };

export default async function Page({
  params,
}: {
  params: Promise<ChallengePageParams>;
}) {
  const { challengeId } = await params;
  const challenge = getChallengeById(challengeId);

  if (!challenge) {
    notFound();
  }

  const colorVariants = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    purple: 'border-purple-500',
    pink: 'border-pink-500',
    indigo: 'border-indigo-500',
    yellow: 'border-yellow-500',
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className={`max-w-4xl mx-auto ${colorVariants[challenge.color as keyof typeof colorVariants]} border-t-4`}>
        <CardHeader>
          <Badge variant="secondary" className="w-fit mb-2">{challenge.career}</Badge>
          <CardTitle className="text-4xl font-bold">{challenge.title}</CardTitle>
          <p className="text-gray-600 mt-2">{challenge.description}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center my-6 border-y py-4">
            <div>
              <p className="text-sm text-gray-500">Difficulty</p>
              <p className="font-semibold">{challenge.difficulty}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-semibold flex items-center justify-center"><Clock className="w-4 h-4 mr-1" /> {challenge.duration} mins</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Points</p>
              <p className="font-semibold flex items-center justify-center"><Award className="w-4 h-4 mr-1" /> {challenge.points} pts</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Skills you'll practice</h3>
            <div className="flex flex-wrap gap-2">
              {challenge.skills.map(skill => (
                <Badge key={skill.name} variant="outline" className="flex items-center gap-2 py-1 px-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{skill.name}</span>
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold">Interactive Challenge Area</h3>
            <p className="text-gray-500 mt-2">The mini-game or interactive component will be displayed here.</p>
            {/* Placeholder for the actual interactive challenge */}
            <div className="mt-4 p-8 bg-gray-100 rounded-lg min-h-[200px] flex items-center justify-center">
              <p className="text-gray-400">[Mini-Game Coming Soon]</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105">
              Start Challenge
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
