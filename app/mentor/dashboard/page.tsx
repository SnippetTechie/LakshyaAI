'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import MentorQuestions from '@/components/MentorQuestions';
import { CheckCircle, Sparkles } from 'lucide-react';

const MentorDashboard = () => {
  const { user } = useUser();
  const [mentorId, setMentorId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setMentorId(user.id);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-background-primary pt-20">
      {/* Background overlay - same as landing page */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-100/20 to-accent-100/20"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl shadow-2xl p-8 mb-8 text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-teal-600/90"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-3 text-white">
                  Welcome back, {user?.fullName || 'Mentor'}! 
                  <span className="inline-block ml-2 text-4xl filter drop-shadow-lg">👨‍🏫</span>
                </h1>
                <p className="text-emerald-100 text-xl font-medium mb-4">
                  Ready to guide and inspire the next generation? Let's make a difference together.
                </p>
                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-full border border-white/30">
                  <CheckCircle className="mr-3" size={24} />
                  <span className="text-lg">Verified Mentor</span>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mentees' Questions Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full -translate-y-16 translate-x-16"></div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 relative z-10">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
              <CheckCircle className="text-white" size={24} />
            </div>
            Your Mentees' Questions
          </h3>
          <div className="space-y-4 relative z-10">
            <MentorQuestions mentorId={mentorId || 'temp'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
