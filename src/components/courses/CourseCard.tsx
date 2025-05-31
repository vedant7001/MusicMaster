import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award } from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  instructor: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lessonCount?: number;
  duration?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  instructor,
  difficulty,
  lessonCount = 0,
  duration,
}) => {
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };

  return (
    <Link 
      to={`/courses/${id}`}
      className="block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
    >
      <div className="relative h-48 bg-purple-100">
        <img 
          src={imageUrl || "https://images.pexels.com/photos/4087991/pexels-photo-4087991.jpeg"}
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-3 right-3 ${difficultyColors[difficulty]} px-2 py-1 rounded-full text-xs font-medium capitalize`}>
          {difficulty}
        </div>
      </div>
      
      <div className="p-5 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h3>
        
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        
        <div className="pt-2 text-sm text-gray-500">
          By <span className="font-medium">{instructor}</span>
        </div>
        
        <div className="pt-2 flex items-center justify-between border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>{lessonCount} lessons</span>
          </div>
          
          {duration && (
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>{duration} min</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;