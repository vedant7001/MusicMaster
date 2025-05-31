import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../lib/store/authStore';
import { UserRole } from '../../types/auth.types';

interface RoleProtectedRouteProps {
  requiredRole: UserRole;
  children: React.ReactNode;
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ requiredRole, children }) => {
  const { user, isLoading } = useAuthStore();
  
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== requiredRole) {
    return <Navigate to="/dashboard\" replace />;
  }
  
  return <>{children}</>;
};

export default RoleProtectedRoute;