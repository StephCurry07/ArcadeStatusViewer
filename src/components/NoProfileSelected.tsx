import React from 'react';
import { Search } from 'lucide-react';

const NoProfileSelected: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 text-center animate-fadeIn">
      <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-full mb-6">
        <Search size={48} className="text-gray-400 dark:text-gray-500" />
      </div>
      
      <h2 className="text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
        No Profile Selected
      </h2>
      
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
        Enter a Google Cloud Skills Boost profile URL above to view statistics and calculate arcade points.
      </p>
      
    </div>
  );
};

export default NoProfileSelected;