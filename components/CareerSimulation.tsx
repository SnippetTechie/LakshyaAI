'use client';

import { challenges } from '@/lib/challenges';
import ChallengeCard from './ChallengeCard';

const CareerSimulation = () => {
  return (
    <section className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Career Simulation</h2>
        <p className="text-slate-600 mt-2">Try tasks from real careers through interactive challenges and mini-games to see what fits you.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map(challenge => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </section>
  );
};

export default CareerSimulation;
