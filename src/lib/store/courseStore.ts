import { create } from 'zustand';
import { supabase } from '../supabase';

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  instrument: string;
  genre: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructorId: string;
  instructorName?: string;
  lessonCount?: number;
  createdAt: string;
}

interface CourseFilters {
  instrument: string | null;
  genre: string | null;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | null;
  search: string | null;
}

interface CoursesState {
  courses: Course[];
  popularCourses: Course[];
  filters: CourseFilters;
  isLoading: boolean;
  error: string | null;
}

export const useCourseStore = create<
  CoursesState & {
    fetchCourses: () => Promise<void>;
    fetchPopularCourses: () => Promise<void>;
    setFilter: (key: keyof CourseFilters, value: string | null) => void;
    resetFilters: () => void;
  }
>((set, get) => ({
  courses: [],
  popularCourses: [],
  filters: {
    instrument: null,
    genre: null,
    difficulty: null,
    search: null,
  },
  isLoading: false,
  error: null,

  fetchCourses: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { filters } = get();
      let query = supabase
        .from('courses')
        .select(`
          *,
          profiles:instructor_id(username)
        `);

      if (filters.instrument) {
        query = query.eq('instrument', filters.instrument);
      }
      
      if (filters.genre) {
        query = query.eq('genre', filters.genre);
      }
      
      if (filters.difficulty) {
        query = query.eq('difficulty', filters.difficulty);
      }
      
      if (filters.search) {
        query = query.ilike('title', `%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      const coursesWithLessonCount = await Promise.all(
        data.map(async (course) => {
          const { count, error: lessonError } = await supabase
            .from('lessons')
            .select('id', { count: 'exact' })
            .eq('course_id', course.id);
            
          if (lessonError) throw lessonError;
          
          return {
            id: course.id,
            title: course.title,
            description: course.description,
            imageUrl: course.image_url,
            instrument: course.instrument,
            genre: course.genre,
            difficulty: course.difficulty,
            instructorId: course.instructor_id,
            instructorName: course.profiles?.username || 'Unknown Instructor',
            lessonCount: count || 0,
            createdAt: course.created_at,
          };
        })
      );
      
      set({ courses: coursesWithLessonCount, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchPopularCourses: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // This is a simplified approach - in production, you might use a more complex query
      // to determine popularity based on enrollment counts or other metrics
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          profiles:instructor_id(username)
        `)
        .limit(4);

      if (error) throw error;
      
      const formattedCourses = data.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        imageUrl: course.image_url,
        instrument: course.instrument,
        genre: course.genre,
        difficulty: course.difficulty,
        instructorId: course.instructor_id,
        instructorName: course.profiles?.username || 'Unknown Instructor',
        createdAt: course.created_at,
      }));
      
      set({ popularCourses: formattedCourses, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  setFilter: (key, value) => {
    set(state => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }));
    get().fetchCourses();
  },

  resetFilters: () => {
    set({
      filters: {
        instrument: null,
        genre: null,
        difficulty: null,
        search: null,
      },
    });
    get().fetchCourses();
  },
}));