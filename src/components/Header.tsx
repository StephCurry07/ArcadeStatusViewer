import React from 'react';
import { Cloud } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Cloud size={28} className="text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Cloud Skills Profile Viewer</h1>
              <p className="text-xs text-gray-500">View achievements and calculate arcade points</p>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
              Unofficial Tool
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;