-- Create tables for MusicEdu platform

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  username TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  role TEXT NOT NULL CHECK (role IN ('student', 'instructor', 'admin')) DEFAULT 'student',
  xp_points INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, role, xp_points)
  VALUES (NEW.id, NEW.email, 'student', 0);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  instrument TEXT NOT NULL,
  genre TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  instructor_id UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Lessons table
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  video_url TEXT,
  order_index INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,
  xp_reward INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- User course enrollments
CREATE TABLE user_courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  course_id UUID REFERENCES courses(id) NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, course_id)
);

-- User lesson progress
CREATE TABLE user_lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  lesson_id UUID REFERENCES lessons(id) NOT NULL,
  completed BOOLEAN DEFAULT FALSE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  progress_percent INTEGER DEFAULT 0 NOT NULL,
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, lesson_id)
);

-- Badges
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  xp_reward INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- User badges
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  badge_id UUID REFERENCES badges(id) NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, badge_id)
);

-- Quizzes
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID REFERENCES lessons(id) NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Quiz questions
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID REFERENCES quizzes(id) NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- User quiz attempts
CREATE TABLE user_quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  quiz_id UUID REFERENCES quizzes(id) NOT NULL,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Policies
-- Profiles: Users can read all profiles, but only update their own
CREATE POLICY "Public profiles are viewable by everyone" 
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profiles" 
  ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- Courses: Anyone can read courses, only instructors/admins can create/update
CREATE POLICY "Courses are viewable by everyone" 
  ON courses FOR SELECT USING (true);

CREATE POLICY "Instructors and admins can create courses" 
  ON courses FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND (profiles.role = 'instructor' OR profiles.role = 'admin')
    )
  );

CREATE POLICY "Instructors can update their own courses" 
  ON courses FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.id = courses.instructor_id
    )
  );

CREATE POLICY "Admins can update any course" 
  ON courses FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Create indexes for performance
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_courses_instructor_id ON courses(instructor_id);
CREATE INDEX idx_lessons_course_id ON lessons(course_id);
CREATE INDEX idx_user_courses_user_id ON user_courses(user_id);
CREATE INDEX idx_user_courses_course_id ON user_courses(course_id);
CREATE INDEX idx_user_lessons_user_id ON user_lessons(user_id);
CREATE INDEX idx_user_lessons_lesson_id ON user_lessons(lesson_id);
CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX idx_user_badges_badge_id ON user_badges(badge_id);
CREATE INDEX idx_quizzes_lesson_id ON quizzes(lesson_id);
CREATE INDEX idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);
CREATE INDEX idx_user_quiz_attempts_user_id ON user_quiz_attempts(user_id);
CREATE INDEX idx_user_quiz_attempts_quiz_id ON user_quiz_attempts(quiz_id);

-- Insert default badges
INSERT INTO badges (name, description, image_url, xp_reward)
VALUES 
  ('First Lesson', 'Complete your first lesson', 'https://example.com/badges/first-lesson.png', 50),
  ('Perfect Quiz', 'Get 100% on a quiz', 'https://example.com/badges/perfect-quiz.png', 100),
  ('Course Master', 'Complete a full course', 'https://example.com/badges/course-master.png', 200);