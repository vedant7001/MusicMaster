export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      badges: {
        Row: {
          id: string
          name: string
          description: string
          image_url: string
          xp_reward: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          image_url: string
          xp_reward: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          image_url?: string
          xp_reward?: number
          created_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string
          instrument: string
          genre: string
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          instructor_id: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image_url: string
          instrument: string
          genre: string
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          instructor_id: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string
          instrument?: string
          genre?: string
          difficulty?: 'beginner' | 'intermediate' | 'advanced'
          instructor_id?: string
          created_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string
          content: string
          video_url: string | null
          order_index: number
          duration_minutes: number
          xp_reward: number
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description: string
          content: string
          video_url?: string | null
          order_index: number
          duration_minutes: number
          xp_reward: number
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string
          content?: string
          video_url?: string | null
          order_index?: number
          duration_minutes?: number
          xp_reward?: number
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          username: string
          avatar_url: string | null
          bio: string | null
          role: 'student' | 'instructor' | 'admin'
          xp_points: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          username: string
          avatar_url?: string | null
          bio?: string | null
          role?: 'student' | 'instructor' | 'admin'
          xp_points?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          username?: string
          avatar_url?: string | null
          bio?: string | null
          role?: 'student' | 'instructor' | 'admin'
          xp_points?: number
          created_at?: string
        }
      }
      quizzes: {
        Row: {
          id: string
          lesson_id: string
          title: string
          created_at: string
        }
        Insert: {
          id?: string
          lesson_id: string
          title: string
          created_at?: string
        }
        Update: {
          id?: string
          lesson_id?: string
          title?: string
          created_at?: string
        }
      }
      quiz_questions: {
        Row: {
          id: string
          quiz_id: string
          question: string
          options: Json
          correct_answer: string
          created_at: string
        }
        Insert: {
          id?: string
          quiz_id: string
          question: string
          options: Json
          correct_answer: string
          created_at?: string
        }
        Update: {
          id?: string
          quiz_id?: string
          question?: string
          options?: Json
          correct_answer?: string
          created_at?: string
        }
      }
      user_badges: {
        Row: {
          id: string
          user_id: string
          badge_id: string
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          badge_id: string
          earned_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          badge_id?: string
          earned_at?: string
        }
      }
      user_courses: {
        Row: {
          id: string
          user_id: string
          course_id: string
          enrolled_at: string
          completed_at: string | null
          last_accessed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          enrolled_at?: string
          completed_at?: string | null
          last_accessed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          enrolled_at?: string
          completed_at?: string | null
          last_accessed_at?: string | null
        }
      }
      user_lessons: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          completed: boolean
          completed_at: string | null
          progress_percent: number
          last_accessed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          completed?: boolean
          completed_at?: string | null
          progress_percent?: number
          last_accessed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          completed?: boolean
          completed_at?: string | null
          progress_percent?: number
          last_accessed_at?: string | null
        }
      }
      user_quiz_attempts: {
        Row: {
          id: string
          user_id: string
          quiz_id: string
          score: number
          max_score: number
          completed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          quiz_id: string
          score: number
          max_score: number
          completed_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          quiz_id?: string
          score?: number
          max_score?: number
          completed_at?: string
        }
      }
    }
  }
}