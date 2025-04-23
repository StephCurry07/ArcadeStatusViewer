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

      const cachedNames: Record<string, string> = {};
      const uncachedUrls: string[] = [];

      profileUrls.forEach((url) => {
        const cachedName = sessionStorage.getItem(url);
        if (cachedName) {
          cachedNames[url] = cachedName;
        } else {
          uncachedUrls.push(url);
        }
      });

      // Update state with cached names
      if (Object.keys(cachedNames).length > 0) {
        setProfileNames((prev) => ({ ...prev, ...cachedNames }));
      }

      // Fetch names for uncached URLs
      if (uncachedUrls.length > 0) {
        try {
          const queryString = new URLSearchParams({
            profiles: uncachedUrls.join(','),
          }).toString();

          const response = await fetch(`/api/fetch-profile-names?${queryString}`);

          if (!response.ok) throw new Error('Failed to fetch profile names');

          const data: Record<string, string> = await response.json();

          // Update state and cache
          setProfileNames((prev) => ({ ...prev, ...data }));
          Object.entries(data).forEach(([url, name]) =>
            sessionStorage.setItem(url, name)
          );
        } catch (error) {
          console.error('Error fetching profile names:', error);
        }
      }
    };

    if (Object.keys(profiles).length > 0) {
      fetchProfileNames();
    }
  }, [profiles]);

  const topProfiles = Object.values(profiles)
    .sort((a, b) => b.arcadePoints - a.arcadePoints)
    .slice(0, 3);

  const medals = ['🥇', '🥈', '🥉'];


  if (!Object.keys(profileNames).length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="text-yellow-500" size={24} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Top Achievers
          </h2>
        </div>
        <div className="text-center text-lg text-gray-500 dark:text-gray-400">
          Fetching top achievers...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="text-yellow-500" size={24} />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Top Achievers
        </h2>
      </div>
      <div className="space-y-4">
        {topProfiles.map((profile, index) => {
          const name = profileNames[profile.profileUrl];
          if (!name) return null; // Skip rendering until name is loaded

          return (
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
                    {name}
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
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
