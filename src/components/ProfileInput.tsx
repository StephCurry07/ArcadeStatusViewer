import React, { useState, FormEvent } from 'react';

interface ProfileInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const ProfileInput: React.FC<ProfileInputProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (url: string): boolean => {
    // Basic validation for Google Cloud Skills Boost URLs
    const regex = /^https:\/\/www\.cloudskillsboost\.google\/public_profiles\/[a-zA-Z0-9-]+$/;
    return regex.test(url);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a profile URL');
      return;
    }
    
    if (!validateUrl(url)) {
      setError('Please enter a valid Google Cloud Skills Boost profile URL');
      return;
    }
    
    setError('');
    onSubmit(url);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Enter Google Cloud Skills Boost Profile URL</h2>
        
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.cloudskillsboost.google/public_profiles/..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            disabled={isLoading}
          />
          
          <button
            type="submit"
            className={`absolute right-2 top-2 px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading
              </div>
            ) : (
              'View Stats'
            )}
          </button>
        </div>
        
        {error && (
          <p className="mt-2 text-red-600 text-sm">{error}</p>
        )}
        
        <div className="mt-4 text-gray-600 text-sm">
          <p>Example: https://www.cloudskillsboost.google/public_profiles/4d7932cb-6dc1-4e73-9c0e-c5ddcd3d84a0</p>
        </div>
      </form>
    </div>
  );
};

export default ProfileInput;