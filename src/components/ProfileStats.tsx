import React from 'react';
import { Lightbulb, Award, GraduationCap, FlaskConical } from 'lucide-react';
import { ProfileData } from '../types';
import StatCard from './StatCard';
import ArcadePointsCard from './ArcadePointsCard';

interface ProfileStatsProps {
  profileData: ProfileData | null;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ profileData }) => {
  if (!profileData) return null;

  return (
    <div className="w-full animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">

        <h2 className="text-xl font-semibold mb-1 text-gray-800 dark:text-gray-100">
          Profile Statistics
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm truncate">
          {profileData.profileUrl}
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex">
            <span className="font-medium mr-2 text-gray-700 dark:text-gray-300">Access:</span>
            <span className={`${
              profileData.access === 'All Good' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {profileData.access}
            </span>
          </div>
          
          <div className="flex">
            <span className="font-medium mr-2 text-gray-700 dark:text-gray-300">Milestone:</span>
            <span className={`${
              profileData.milestone === 'Yes' ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'
            }`}>
              {profileData.milestone}
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ArcadePointsCard 
          arcadePoints={profileData.arcadePoints}
          skillCount={profileData.skillCount}
          arcadeCount={profileData.arcadeCount}
        />
        
        <StatCard
          title="Skill Badges"
          count={profileData.skillCount}
          names={profileData.skillNames}
          icon={<Award size={24} className="text-white" />}
          color="bg-yellow-500"
        />
        
        <StatCard
          title="Arcade Items"
          count={profileData.arcadeCount}
          names={profileData.arcadeNames}
          icon={<GraduationCap size={24} className="text-white" />}
          color="bg-green-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Trivia Completions"
          count={profileData.triviaCount}
          names={profileData.triviaNames}
          icon={<Lightbulb size={24} className="text-white" />}
          color="bg-blue-500"
        />
        
        <StatCard
          title="Lab Completions"
          count={profileData.labCount}
          names={profileData.labNames}
          icon={<FlaskConical size={24} className="text-white" />}
          color="bg-purple-500"
        />
      </div>
    </div>
  );
};

export default ProfileStats;