import React from 'react';
import { Trophy } from 'lucide-react';

interface XpProgressProps {
  currentXp: number;
  levelXp: number;
  level: number;
}

const XpProgress: React.FC<XpProgressProps> = ({ currentXp, levelXp, level }) => {
  const progress = (currentXp / levelXp) * 100;
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center mb-4">
        <div className="bg-yellow-100 rounded-full p-2 mr-3">
          <Trophy className="h-5 w-5 text-yellow-500" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800">Level {level}</h3>
          <p className="text-sm text-gray-600">
            {currentXp} / {levelXp} XP to level {level + 1}
          </p>
        </div>
      </div>
      
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="mt-2 text-xs text-gray-500 text-right">
        {Math.round(progress)}% complete
      </div>
    </div>
  );
};

export default XpProgress;