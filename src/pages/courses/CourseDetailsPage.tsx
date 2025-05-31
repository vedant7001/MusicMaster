import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Award } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../lib/store/authStore';
import Button from '../../components/ui/Button';

interface CourseDetails {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  instrument: string;
  genre: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructorName: string;
  instructorAvatar: string | null;
  lessonCount: number;
  totalDuration: number;
  totalXp: number;
  lessons: Array<{
    id: string;
    title: string;
    description: string;
    duration: number;
    xpReward: number;
    orderIndex: number;
  }>;
}

const CourseDetailsPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select(`
            *,
            instructor:profiles!courses_instructor_id_fkey(
              username,
              avatar_url
            )
          `)
          .eq('id', courseId)
          .single();

        if (courseError) throw courseError;

        const { data: lessons, error: lessonsError } = await supabase
          .from('lessons')
          .select('*')
          .eq('course_id', courseId)
          .order('order_index');

        if (lessonsError) throw lessonsError;

        if (user) {
          const { data: enrollment } = await supabase
            .from('user_courses')
            .select('id')
            .eq('course_id', courseId)
            .eq('user_id', user.id)
            .single();

          setIsEnrolled(!!enrollment);
        }

        const totalDuration = lessons.reduce((sum, lesson) => sum + lesson.duration_minutes, 0);
        const totalXp = lessons.reduce((sum, lesson) => sum + lesson.xp_reward, 0);

        setCourse({
          id: courseData.id,
          title: courseData.title,
          description: courseData.description,
          imageUrl: courseData.image_url,
          instrument: courseData.instrument,
          genre: courseData.genre,
          difficulty: courseData.difficulty,
          instructorName: courseData.instructor.username,
          instructorAvatar: courseData.instructor.avatar_url,
          lessonCount: lessons.length,
          totalDuration,
          totalXp,
          lessons: lessons.map(lesson => ({
            id: lesson.id,
            title: lesson.title,
            description: lesson.description,
            duration: lesson.duration_minutes,
            xpReward: lesson.xp_reward,
            orderIndex: lesson.order_index,
          })),
        });

        setIsLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId, user]);

  const handleEnroll = async () => {
    if (!user) {
      // Redirect to login
      return;
    }

    try {
      const { error: enrollError } = await supabase
        .from('user_courses')
        .insert({
          user_id: user.id,
          course_id: courseId,
        });

      if (enrollError) throw enrollError;

      setIsEnrolled(true);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Course not found'}
        </div>
      </div>
    );
  }

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/courses"
        className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Courses
      </Link>

      {/* Course Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-64 bg-purple-100">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute top-4 right-4 ${
              difficultyColors[course.difficulty]
            } px-3 py-1 rounded-full text-sm font-medium capitalize`}
          >
            {course.difficulty}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 rounded-full overflow-hidden bg-purple-100 mr-4">
              {course.instructorAvatar ? (
                <img
                  src={course.instructorAvatar}
                  alt={course.instructorName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-purple-200 text-purple-800 font-bold">
                  {course.instructorName[0].toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{course.title}</h2>
              <p className="text-gray-600">
                Instructor: <span className="font-medium">{course.instructorName}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2" />
              <span>{course.totalDuration} minutes</span>
            </div>
            <div className="flex items-center text-gray-600">
              <BookOpen className="h-5 w-5 mr-2" />
              <span>{course.lessonCount} lessons</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Award className="h-5 w-5 mr-2" />
              <span>{course.totalXp} XP</span>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{course.description}</p>

          {!isEnrolled ? (
            <Button
              onClick={handleEnroll}
              fullWidth
              disabled={!user}
              className="mb-4"
            >
              {user ? 'Enroll Now' : 'Sign in to Enroll'}
            </Button>
          ) : (
            <Button
              as={Link}
              to={`/lessons/${course.lessons[0]?.id}`}
              variant="secondary"
              fullWidth
              className="mb-4"
            >
              Continue Learning
            </Button>
          )}
        </div>
      </div>

      {/* Course Content */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Course Content</h3>
        <div className="bg-white rounded-lg shadow-md divide-y">
          {course.lessons.map((lesson) => (
            <div key={lesson.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                  <p className="text-sm text-gray-600">{lesson.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {lesson.duration} min
                  </span>
                  <span className="text-sm text-purple-600">
                    +{lesson.xpReward} XP
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;