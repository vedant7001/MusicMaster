import React, { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

interface CourseFiltersProps {
  onFilterChange: (key: string, value: string | null) => void;
  onSearch: (query: string) => void;
  onReset: () => void;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({ 
  onFilterChange, 
  onSearch, 
  onReset 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const instruments = [
    'Guitar', 'Piano', 'Drums', 'Violin', 'Vocal', 'Bass', 'Ukulele', 'Saxophone'
  ];

  const genres = [
    'Classical', 'Rock', 'Jazz', 'Blues', 'Pop', 'Electronic', 'Folk', 'Country'
  ];

  const difficulties = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-4 relative">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>

      {/* Mobile Filter Toggle */}
      <button
        className="md:hidden flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-lg mb-4"
        onClick={() => setIsFilterExpanded(!isFilterExpanded)}
      >
        <div className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          <span>Filters</span>
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isFilterExpanded ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {/* Filters - Always visible on desktop, toggle on mobile */}
      <div className={`${isFilterExpanded ? 'block' : 'hidden md:block'} space-y-4`}>
        {/* Instrument Filter */}
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Instrument</h3>
          <div className="flex flex-wrap gap-2">
            {instruments.map((instrument) => (
              <button
                key={instrument}
                onClick={() => onFilterChange('instrument', instrument.toLowerCase())}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-purple-100 hover:text-purple-700 transition-colors"
              >
                {instrument}
              </button>
            ))}
          </div>
        </div>

        {/* Genre Filter */}
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Genre</h3>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => onFilterChange('genre', genre.toLowerCase())}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-purple-100 hover:text-purple-700 transition-colors"
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Difficulty</h3>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty.value}
                onClick={() => onFilterChange('difficulty', difficulty.value)}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-purple-100 hover:text-purple-700 transition-colors"
              >
                {difficulty.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Filters */}
        <button
          onClick={onReset}
          className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center"
        >
          Reset all filters
        </button>
      </div>
    </div>
  );
};

export default CourseFilters;