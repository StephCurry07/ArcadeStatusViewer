import React from 'react';

interface ArcadePointsCardProps {
  arcadePoints: number;
  skillCount: number;
  arcadeCount: number;
}

const ArcadePointsCard: React.FC<ArcadePointsCardProps> = ({ 
  arcadePoints, 
  skillCount, 
  arcadeCount 
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
      <h3 className="text-xl font-semibold mb-4">Arcade Points</h3>
      
      <div className="flex items-end justify-between mb-6">
        <div className="text-4xl font-bold">{arcadePoints.toFixed(1)}</div>
        <div className="text-sm opacity-80">Total Points</div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span>Arcade Items</span>
          <span className="font-medium">{arcadeCount} × 1.0 = {arcadeCount}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span>Skill Badges</span>
          <span className="font-medium">{skillCount} × 0.5 = {(skillCount * 0.5).toFixed(1)}</span>
        </div>
        
        <div className="pt-2 mt-2 border-t border-white border-opacity-20">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Points</span>
            <span className="font-bold">{arcadePoints.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArcadePointsCard;