import React from 'react';

interface ArcadePointsCardProps {
  arcadePoints: number;
  skillCount: number;
  arcadeCount: number;
  bonusCount: number;
  triviaCount: number;
}

const ArcadePointsCard: React.FC<ArcadePointsCardProps> = ({ 
  arcadePoints, 
  skillCount, 
  arcadeCount,
  bonusCount,
  triviaCount
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 rounded-xl shadow-lg p-6 text-white">
      <h3 className="text-xl font-semibold mb-4">Arcade Points</h3>
      
      <div className="flex items-end justify-between mb-6">
        <div className="text-4xl font-bold">{arcadePoints.toFixed(1)}</div>
        <div className="text-sm opacity-80">Total Points</div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span>Arcade Games</span>
          <span className="font-medium">{arcadeCount - bonusCount} × 1.0 = {(arcadeCount - bonusCount).toFixed(1)}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span>Skill Badges</span>
          <span className="font-medium">{skillCount} × 0.5 = {(skillCount * 0.5).toFixed(1)}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span>Bonus Games</span>
          <span className="font-medium">{bonusCount} × 2.0 = {(bonusCount * 2).toFixed(1)}</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span>Trivia</span>
          <span className="font-medium">{triviaCount} × 1.0 = {(triviaCount).toFixed(1)}</span>
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