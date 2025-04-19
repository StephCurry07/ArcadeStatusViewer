import React from 'react';

interface StatCardProps {
  title: string;
  count: number;
  names: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, count, names, icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-full mr-4 ${color}`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      
      <div className="flex items-end justify-between mb-4">
        <div className="text-3xl font-bold">{count}</div>
        <div className="text-sm text-gray-500">Completed</div>
      </div>
      
      {names ? (
        <div className="mt-2 text-sm text-gray-600 line-clamp-2" title={names}>
          {names}
        </div>
      ) : (
        <div className="mt-2 text-sm text-gray-400 italic">
          No {title.toLowerCase()} completed yet
        </div>
      )}
    </div>
  );
};

export default StatCard;