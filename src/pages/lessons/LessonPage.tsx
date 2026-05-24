import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import LoadingScreen from '../../components/ui/LoadingScreen';

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  duration_minutes: number;
  course_id: string;
  order_index: number;
  created_at: string;
}

export default function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lessonId) return;

    const fetchLesson = async () => {
      try {
        setIsLoading(true);
        const { data, error: fetchError } = await supabase
          .from('lessons')
          .select('*')
          .eq('id', lessonId)
          .single();

        if (fetchError) throw fetchError;
        if (!data) throw new Error('Lesson not found');

        setLesson(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  if (isLoading) return <LoadingScreen />;

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Lesson Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{lesson.title}</h1>
          <p className="text-slate-500 mb-6">{lesson.duration_minutes} minutes</p>
          
          <div className="mb-8">
            <p className="text-lg text-slate-600">{lesson.description}</p>
          </div>

          <div className="prose prose-sm max-w-none text-slate-700">
            <div className="whitespace-pre-wrap">{lesson.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
