import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../lib/store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuthStore();
  
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;