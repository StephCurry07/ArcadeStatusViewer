import { useState, useEffect } from 'react';
import { ProfileData } from './types';
import Header from './components/Header';
import ProfileInput from './components/ProfileInput';
import ProfileStats from './components/ProfileStats';
import NoProfileSelected from './components/NoProfileSelected';
import Leaderboard from './components/Leaderboard'

function App() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<Record<string, ProfileData>>({});

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const res = await fetch('/api/profiles');
        const data = await res.json();
        setProfiles(data);
      } catch (err) {
        setError("Failed to load profile data. Please try again later.");
        console.log(err);
      }
    };

    loadProfiles();
  }, []);

  const fetchProfileData = (url: string) => {
    setIsLoading(true);
    setError(null);
    
    setTimeout(() => {
      if (profiles[url]) {
        setProfileData(profiles[url]);
        setIsLoading(false);
      } else {
        setProfileData(null);
        setError("Profile not found. Please check the URL and try again.");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      
      <main className="container flex-grow">
        <ProfileInput 
          onSubmit={fetchProfileData} 
          isLoading={isLoading} 
        />
        
        {error && (
          <div className="w-full max-w-2xl mx-auto bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}
        

        {isLoading ? (
          <div className="w-full flex justify-center items-center py-16">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">Loading profile data...</p>
            </div>
          </div>
        ) : profileData ? (
          <ProfileStats profileData={profileData} />
        ) : (
          <NoProfileSelected />
        )}

        <br /><br />
        <Leaderboard profiles={profiles} />
      </main>
      
      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-12 py-6">
        <div className="container">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            This is an unofficial tool for Google Cloud Skills Boost profiles. Not affiliated with Google.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;