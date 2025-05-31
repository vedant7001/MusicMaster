import React from 'react';
import { Music } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 to-purple-700">
      <div className="flex items-center mb-4">
        <Music className="h-12 w-12 text-white animate-pulse" />
        <h1 className="text-3xl font-bold text-white ml-2">MusicEdu</h1>
      </div>
      <div className="flex space-x-2 mt-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i} 
            className="w-3 h-12 bg-white rounded-full animate-[bounce_1s_ease-in-out_infinite]" 
            style={{ 
              animationDelay: `${i * 0.1}s`,
              height: `${(i % 3 + 1) * 16}px`
            }}
          ></div>
        ))}
      </div>
      <p className="mt-4 text-white text-lg">Loading your musical journey...</p>
    </div>
  );
};

export default LoadingScreen;