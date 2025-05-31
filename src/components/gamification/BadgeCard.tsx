import React from 'react';

interface BadgeCardProps {
  name: string;
  description: string;
  imageUrl: string;
  earned: boolean;
  xpReward: number;
}

const BadgeCard: React.FC<BadgeCardProps> = ({
  name,
  description,
  imageUrl,
  earned,
  xpReward,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow p-4 text-center ${earned ? '' : 'opacity-60 filter grayscale'}`}>
      <div className="relative inline-block mb-3">
        <img
          src={imageUrl || "https://images.pexels.com/photos/1337247/pexels-photo-1337247.jpeg?auto=compress&cs=tinysrgb&w=800"}
          alt={name}
          className="w-16 h-16 mx-auto rounded-full"
        />
        {earned && (
          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      
      <h3 className="font-bold text-sm text-gray-800 mb-1">{name}</h3>
      
      <p className="text-xs text-gray-600 mb-2">{description}</p>
      
      <div className="text-xs font-medium">
        {earned ? (
          <span className="text-green-600">Earned: +{xpReward} XP</span>
        ) : (
          <span className="text-purple-600">Reward: +{xpReward} XP</span>
        )}
      </div>
    </div>
  );
};

export default BadgeCard;