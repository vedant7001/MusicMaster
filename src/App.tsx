import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './lib/store/authStore';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import CoursesPage from './pages/courses/CoursesPage';
import CourseDetailsPage from './pages/courses/CourseDetailsPage';
import LessonPage from './pages/lessons/LessonPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleProtectedRoute from './components/auth/RoleProtectedRoute';
import LoadingScreen from './components/ui/LoadingScreen';

function App() {
  const { isLoading, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:courseId" element={<CourseDetailsPage />} />
          
          {/* Protected routes - require authentication */}
          <Route path="lessons/:lessonId" element={
            <ProtectedRoute>
              <LessonPage />
            </ProtectedRoute>
          } />
          
          <Route path="dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          
          {/* Admin routes - require admin role */}
          <Route path="admin/*" element={
            <RoleProtectedRoute requiredRole="admin">
              <AdminDashboardPage />
            </RoleProtectedRoute>
          } />
          
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;