import React from 'react';

interface StatCardProps {
  title: string;
  count: number;
  names: string[];
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, count, names, icon, color }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-full mr-4 ${color}`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
      </div>
      
      <div className="flex items-end justify-between mb-4">
        <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{count}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
      </div>
      
      {names && names.length > 0 ? (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {names.map((name, index) => (
            <div key={index} className="whitespace-pre-line">{name}</div>
          ))}
        </div>
      ) : (
        <div className="mt-2 text-sm text-gray-400 dark:text-gray-500 italic">
          No {title.toLowerCase()} completed yet
        </div>
      )}

    </div>
  );
};

export default StatCard;