import React from 'react';

interface LeaderboardItemProps {
  rank: number;
  username: string;
  avatarUrl?: string;
  xpPoints: number;
  isCurrentUser?: boolean;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  rank,
  username,
  avatarUrl,
  xpPoints,
  isCurrentUser = false,
}) => {
  const rankColors = {
    1: 'bg-yellow-400',
    2: 'bg-gray-300',
    3: 'bg-yellow-700',
  };

  return (
    <div 
      className={`flex items-center justify-between p-3 rounded-lg ${
        isCurrentUser ? 'bg-purple-50 border border-purple-200' : 'bg-white'
      }`}
    >
      <div className="flex items-center">
        <div 
          className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
            rankColors[rank as keyof typeof rankColors] || 'bg-gray-200 text-gray-700'
          }`}
        >
          {rank}
        </div>
        
        <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 mr-3">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={username} 
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-purple-100 text-purple-800 font-bold">
              {username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <span className={`font-medium ${isCurrentUser ? 'text-purple-800' : 'text-gray-800'}`}>
          {username}
          {isCurrentUser && <span className="ml-2 text-xs text-purple-600">(You)</span>}
        </span>
      </div>
      
      <div className="font-bold text-gray-700">{xpPoints} XP</div>
    </div>
  );
};

export default LeaderboardItem;