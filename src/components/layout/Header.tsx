import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music, Menu, X, User, LogOut, BookOpen, BarChart3 } from 'lucide-react';
import { useAuthStore } from '../../lib/store/authStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-purple-900 to-purple-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <Music className="h-8 w-8" />
            <span>MusicEdu</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/courses" className="hover:text-purple-200 transition-colors">
              Courses
            </Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-purple-200 transition-colors">
                  Dashboard
                </Link>
                
                {user.role === 'admin' && (
                  <Link to="/admin" className="hover:text-purple-200 transition-colors">
                    Admin
                  </Link>
                )}
                
                <div className="relative group">
                  <button className="flex items-center space-x-1 hover:text-purple-200 transition-colors">
                    <span>{user.username}</span>
                    <User className="h-5 w-5" />
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <div className="font-medium">{user.email}</div>
                      <div className="text-gray-500 capitalize">{user.role}</div>
                    </div>
                    
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                    
                    <Link 
                      to="/courses" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      My Courses
                    </Link>
                    
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-md border border-purple-300 hover:bg-purple-800 transition-colors"
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded-md bg-purple-500 hover:bg-purple-600 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-purple-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/courses" 
              className="block px-3 py-2 rounded-md hover:bg-purple-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block px-3 py-2 rounded-md hover:bg-purple-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="block px-3 py-2 rounded-md hover:bg-purple-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                
                <div className="border-t border-purple-700 my-2 pt-2">
                  <div className="px-3 py-2">
                    <div className="font-medium">{user.username}</div>
                    <div className="text-sm text-purple-300">{user.email}</div>
                  </div>
                  
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-red-300 hover:bg-purple-700 rounded-md"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-purple-700 my-2 pt-2 space-y-2">
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md hover:bg-purple-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 rounded-md bg-purple-700 hover:bg-purple-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;