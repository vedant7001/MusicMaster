import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, BookOpen, BarChart3 } from 'lucide-react';
import LoadingScreen from '../../components/ui/LoadingScreen';

interface AdminStats {
  totalUsers: number;
  totalCourses: number;
  totalLessons: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);

        const [usersRes, coursesRes, lessonsRes] = await Promise.all([
          supabase.from('profiles').select('id', { count: 'exact' }),
          supabase.from('courses').select('id', { count: 'exact' }),
          supabase.from('lessons').select('id', { count: 'exact' }),
        ]);

        setStats({
          totalUsers: usersRes.count || 0,
          totalCourses: coursesRes.count || 0,
          totalLessons: lessonsRes.count || 0,
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600 mt-2">Monitor platform statistics and manage content</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Users Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stats?.totalUsers || 0}</p>
              </div>
              <div className="bg-blue-100 rounded-lg p-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Courses Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Total Courses</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stats?.totalCourses || 0}</p>
              </div>
              <div className="bg-emerald-100 rounded-lg p-3">
                <BookOpen className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Total Lessons Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Total Lessons</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stats?.totalLessons || 0}</p>
              </div>
              <div className="bg-purple-100 rounded-lg p-3">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Users Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Users Management</h2>
            <div className="text-center py-12">
              <p className="text-slate-500 mb-4">Manage user accounts and permissions</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                View Users
              </button>
            </div>
          </div>

          {/* Content Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Content Management</h2>
            <div className="text-center py-12">
              <p className="text-slate-500 mb-4">Create and edit courses and lessons</p>
              <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition">
                Manage Content
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
