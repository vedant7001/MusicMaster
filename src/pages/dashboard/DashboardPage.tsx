import React from 'react';
import { useAuthStore } from '../../lib/store/authStore';
import { Award, TrendingUp, BookOpen } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Welcome, {user.username}!</h1>
          <p className="text-slate-600 mt-2">Track your learning progress and achievements</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* XP Points Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Total XP Points</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{user.xpPoints || 0}</p>
              </div>
              <div className="bg-amber-100 rounded-lg p-3">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          {/* Role Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Your Role</p>
                <p className="text-3xl font-bold text-slate-900 mt-2 capitalize">{user.role}</p>
              </div>
              <div className="bg-blue-100 rounded-lg p-3">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Courses Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Courses Enrolled</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">0</p>
              </div>
              <div className="bg-emerald-100 rounded-lg p-3">
                <BookOpen className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Activity</h2>
          <div className="text-center py-12">
            <p className="text-slate-500">No recent activity yet. Start learning!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
