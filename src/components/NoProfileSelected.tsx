import React from 'react';
import { Search } from 'lucide-react';

const NoProfileSelected: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 text-center animate-fadeIn">
      <div className="bg-gray-100 p-5 rounded-full mb-6">
        <Search size={48} className="text-gray-400" />
      </div>
      
      <h2 className="text-2xl font-semibold mb-2 text-gray-700">
        No Profile Selected
      </h2>
      
      <p className="text-gray-500 max-w-md mb-8">
        Enter a Google Cloud Skills Boost profile URL above to view statistics and calculate arcade points.
      </p>
      
      <div className="bg-white rounded-lg shadow-md p-4 max-w-md">
        <h3 className="font-medium text-gray-700 mb-2">What are Arcade Points?</h3>
        <p className="text-sm text-gray-600">
          Arcade Points are calculated based on your completed items:
          <br />
          • Each Arcade item = 1 point
          <br />
          • Each Skill Badge = 0.5 points
        </p>
      </div>
    </div>
  );
};

export default NoProfileSelected;