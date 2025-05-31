import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="text-9xl font-bold text-gray-200">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Broken guitar" 
                  className="h-24 w-24 object-cover rounded-full border-4 border-white"
                />
              </div>
            </div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h1>
        
        <p className="text-gray-600 mb-6">
          We can't seem to find the page you're looking for. The melody has drifted elsewhere.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button leftIcon={<Home className="h-5 w-5" />} variant="primary">
              Go Home
            </Button>
          </Link>
          
          <Link to="/courses">
            <Button leftIcon={<Search className="h-5 w-5" />} variant="outline">
              Find Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;