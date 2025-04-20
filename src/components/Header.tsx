import React from 'react';
import { Cloud } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/50 py-4 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Cloud size={28} className="text-blue-600 dark:text-blue-400" />
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Cloud Skills Profile Viewer</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">View achievements and calculate arcade points</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium">
                Unofficial Tool
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;