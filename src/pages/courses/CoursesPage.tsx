import React, { useEffect } from 'react';
import { useCourseStore } from '../../lib/store/courseStore';
import CourseCard from '../../components/courses/CourseCard';
import CourseFilters from '../../components/courses/CourseFilters';

const CoursesPage: React.FC = () => {
  const { courses, filters, isLoading, error, fetchCourses, setFilter, resetFilters } = useCourseStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleFilterChange = (key: string, value: string | null) => {
    setFilter(key as any, value);
  };

  const handleSearch = (query: string) => {
    setFilter('search', query);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar with filters */}
        <div className="w-full md:w-1/4">
          <CourseFilters 
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onReset={resetFilters}
          />
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Explore Courses</h1>
            
            <div className="flex flex-wrap gap-2">
              {filters.instrument && (
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  Instrument: {filters.instrument}
                  <button
                    onClick={() => handleFilterChange('instrument', null)}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    &times;
                  </button>
                </div>
              )}
              
              {filters.genre && (
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  Genre: {filters.genre}
                  <button
                    onClick={() => handleFilterChange('genre', null)}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    &times;
                  </button>
                </div>
              )}
              
              {filters.difficulty && (
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  Difficulty: {filters.difficulty}
                  <button
                    onClick={() => handleFilterChange('difficulty', null)}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    &times;
                  </button>
                </div>
              )}
              
              {filters.search && (
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  Search: "{filters.search}"
                  <button
                    onClick={() => handleFilterChange('search', null)}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              Error loading courses: {error}
            </div>
          ) : courses.length === 0 ? (
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search criteria
              </p>
              <button
                onClick={resetFilters}
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  imageUrl={course.imageUrl}
                  instructor={course.instructorName || 'Unknown Instructor'}
                  difficulty={course.difficulty}
                  lessonCount={course.lessonCount}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;