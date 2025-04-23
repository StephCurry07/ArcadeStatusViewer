import React, { useEffect, useState } from 'react';
import { Lightbulb, Award, GraduationCap, FlaskConical } from 'lucide-react';
import { ProfileData } from '../types';
import StatCard from './StatCard';
import ArcadePointsCard from './ArcadePointsCard';

interface ProfileStatsProps {
  profileData: ProfileData;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ profileData }) => {
  const [profileName, setProfileName] = useState('');
  const [loading, setLoading] = useState(true);

  const specialGameSet = new Set(
    profileData.arcadeNames.filter(name =>
      name.includes('TechCare') || name.includes('Certification Zone')
    )
  );

  useEffect(() => {
      const fetchProfileName = async () => {
        setLoading(true);
        
        // Check for cached name in session storage
        const cachedName = sessionStorage.getItem(profileData.profileUrl);
        if (cachedName) {
          setProfileName(cachedName);
          setLoading(false);
          return; // Exit early if we have a cached name
        }
        
        try {
          const nameResponse = await fetch(`/api/fetch-profile-names?profiles=${[profileData.profileUrl].join(',')}`);
          
          if (!nameResponse.ok) {
            throw new Error('Error fetching profile name');
          }
  
          const nameData = await nameResponse.json();
          const name = nameData[profileData.profileUrl];
  
          // Set the profile name and store it in session storage
          setProfileName(name || 'Name not available');
          sessionStorage.setItem(profileData.profileUrl, name || 'Name not available');
  
        } catch (error) {
          console.error('Error fetching profile data:', error);
          setProfileName('Error fetching name');
        } finally {
          setLoading(false);
        }
    };

    if (profileData.profileUrl) {
      fetchProfileName();
    }
  }, [profileData.profileUrl]);

  return (
    <div className="w-full animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl underline font-semibold mb-2 text-gray-800 dark:text-gray-100">
          Profile Statistics
        </h2>
        
        <div className="space-y-4">
          {/* Profile Name */}
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-700 dark:text-gray-300">Name:</span>
            {/* Conditional rendering for the profile name */}
            <span className={`font-semibold text-gray-900 dark:text-gray-100 ${loading ? 'italic text-gray-500' : ''}`}>
              {loading ? 'Loading...' : profileName}
            </span>
          </div>
          
          {/* Profile URL */}
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-700 dark:text-gray-300">Profile URL:</span>
            <span className="font-semibold text-sm text-blue-600 dark:text-blue-400 truncate">
              <a href={profileData.profileUrl} target="_blank" rel="noopener noreferrer">
                {profileData.profileUrl}
              </a>
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ArcadePointsCard 
          arcadePoints={profileData.arcadePoints}
          skillCount={profileData.skillCount}
          arcadeCount={profileData.arcadeCount}
          bonusCount={specialGameSet.size}
          triviaCount={profileData.triviaCount}
        />
        
        <StatCard
          title="Skill Badges"
          count={profileData.skillCount}
          names={Array.isArray(profileData.skillNames) ? profileData.skillNames : [profileData.skillNames]}
          icon={<Award size={24} className="text-white" />}
          color="bg-yellow-500"
        />
        
        <StatCard
          title="Arcade Games"
          count={profileData.arcadeCount}
          names={Array.isArray(profileData.arcadeNames) ? profileData.arcadeNames : [profileData.arcadeNames]}
          icon={<GraduationCap size={24} className="text-white" />}
          color="bg-green-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Trivia Completions"
          count={profileData.triviaCount}
          names={Array.isArray(profileData.triviaNames) ? profileData.triviaNames : [profileData.triviaNames]}
          icon={<Lightbulb size={24} className="text-white" />}
          color="bg-blue-500"
        />
        
        <StatCard
          title="Lab Completions"
          count={profileData.labCount}
          names={Array.isArray(profileData.labNames) ? profileData.labNames : [profileData.labNames]}
          icon={<FlaskConical size={24} className="text-white" />}
          color="bg-purple-500"
        />
      </div>
    </div>
  );
};

export default ProfileStats;