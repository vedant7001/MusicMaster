export type UserRole = 'student' | 'instructor' | 'admin';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  username: string;
  avatarUrl: string | null;
  xpPoints: number;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
}