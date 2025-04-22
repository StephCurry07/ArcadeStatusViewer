import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { ProfileData } from '../types';

interface LeaderboardProps {
  profiles: Record<string, ProfileData>;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ profiles }) => {
    const [profileNames, setProfileNames] = useState<Record<string, string>>({});

    useEffect(() => {
        const fetchProfileNames = async () => {
          const topProfiles = Object.values(profiles)
            .sort((a, b) => b.arcadePoints - a.arcadePoints)
            .slice(0, 3);
      
          const profileUrls = topProfiles.map((profile) => profile.profileUrl);
      
          // Build the query string with profile URLs
          const queryString = new URLSearchParams({
            profiles: profileUrls.join(','),
          }).toString();
      
          try {
            // Make the API request
            const response = await fetch(`/api/fetch-profile-names?${queryString}`);
            
            // Check if the response is successful
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            // Parse the response JSON
            const data = await response.json();
            setProfileNames(data);
          } catch (error) {
            console.error('Error fetching profile names:', error);
          }
        };
      
        fetchProfileNames();
      }, [profiles]);
  
    const topProfiles = Object.values(profiles)
      .sort((a, b) => b.arcadePoints - a.arcadePoints)
      .slice(0, 3);

  const medals = ['🥇', '🥈', '🥉'];
    
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="text-yellow-500" size={24} />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Top Achievers</h2>
      </div>

      <div className="space-y-4">
        {topProfiles.map((profile, index) => (
          <div
            key={profile.profileUrl}
            className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-label={`Rank ${index + 1}`}>
                {medals[index]}
              </span>
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                {profileNames[profile.profileUrl] || 'Loading...'}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {profile.skillCount} Skills • {profile.arcadeCount} Arcade Items
                </div>
              </div>
            </div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {profile.arcadePoints.toFixed(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;