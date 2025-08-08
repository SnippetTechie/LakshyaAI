'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import MentorQuestions from '@/components/MentorQuestions';
import { CheckCircle } from 'lucide-react';

const MentorDashboard = () => {
  const { user } = useUser();
  const [mentorId, setMentorId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setMentorId(user.id);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-900">Mentor Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-10">
        {/* Welcome Message & Verified Badge */}
        <div className="mb-10">
          <h2 className="text-4xl font-extrabold text-slate-900">
            Welcome back, {user?.fullName || 'Mentor'}!
          </h2>
          <div className="inline-flex items-center mt-3 bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-full">
            <CheckCircle className="mr-2" size={20} />
            <span>Verified Mentor</span>
          </div>
        </div>

        {/* Mentees' Questions Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Your Mentees' Questions</h3>
          <div className="space-y-4">
            <MentorQuestions mentorId={mentorId || 'temp'} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorDashboard;
