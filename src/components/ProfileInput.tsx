import React, { useState, FormEvent } from 'react';

interface ProfileInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const ProfileInput: React.FC<ProfileInputProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (url: string): boolean => {
    const regex = /^https:\/\/www\.cloudskillsboost\.google\/public_profiles\/[a-zA-Z0-9-]+$/;
    return regex.test(url);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setError('Please enter a profile URL');
      return;
    }

    if (!validateUrl(trimmedUrl)) {
      setError('Please enter a valid Google Cloud Skills Boost profile URL');
      return;
    }

    setError('');
    onSubmit(trimmedUrl);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Enter Google Cloud Skills Boost Profile URL</h2>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.cloudskillsboost.google/public_profiles/..."
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            disabled={isLoading}
          />
          
          <button
            type="submit"
            className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Loading
              </div>
            ) : (
              'View Stats'
            )}
          </button>
        </div>
        
        {error && (
          <p className="mt-2 text-red-600 dark:text-red-400 text-sm">{error}</p>
        )}
        
        <div className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
          <p>Example: https://www.cloudskillsboost.google/public_profiles/0201af2b-c2ca-46ab-92ce-2c2fca6a536d</p>
        </div>
      </form>
    </div>
  );
};

export default ProfileInput;