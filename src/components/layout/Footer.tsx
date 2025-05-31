import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Github, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
              <Music className="h-7 w-7" />
              <span>MusicEdu</span>
            </Link>
            <p className="text-gray-400 max-w-xs">
              Learn music your way with our gamified platform designed to make learning fun and engaging.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Courses</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses?instrument=guitar" className="text-gray-400 hover:text-white transition-colors">
                  Guitar
                </Link>
              </li>
              <li>
                <Link to="/courses?instrument=piano" className="text-gray-400 hover:text-white transition-colors">
                  Piano
                </Link>
              </li>
              <li>
                <Link to="/courses?instrument=drums" className="text-gray-400 hover:text-white transition-colors">
                  Drums
                </Link>
              </li>
              <li>
                <Link to="/courses?instrument=violin" className="text-gray-400 hover:text-white transition-colors">
                  Violin
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-white transition-colors">
                  All Courses
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-white transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/become-instructor" className="text-gray-400 hover:text-white transition-colors">
                  Become an Instructor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} MusicEdu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;