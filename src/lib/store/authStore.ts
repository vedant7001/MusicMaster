import { create } from 'zustand';
import { supabase } from '../supabase';
import { AuthState, LoginCredentials, RegisterCredentials } from '../../types/auth.types';

export const useAuthStore = create<
  AuthState & {
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
  }
>((set) => ({
  user: null,
  isLoading: true,
  error: null,

  login: async ({ email, password }: LoginCredentials) => {
    try {
      set({ isLoading: true, error: null });
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      await useAuthStore.getState().fetchUser();
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  register: async ({ email, password, username }: RegisterCredentials) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Registration failed');

      // Create profile
      const { error: profileError } = await supabase.from('profiles').insert({
        user_id: authData.user.id,
        username,
        role: 'student',
        xp_points: 0,
      });

      if (profileError) throw profileError;
      
      await useAuthStore.getState().fetchUser();
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      set({ user: null, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchUser: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      
      if (authError) throw authError;
      if (!session?.user) {
        set({ user: null, isLoading: false });
        return;
      }

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (profileError) throw profileError;
      
      set({
        user: {
          id: session.user.id,
          email: session.user.email || '',
          username: profile.username,
          role: profile.role,
          avatarUrl: profile.avatar_url,
          xpPoints: profile.xp_points,
        },
        isLoading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false, user: null });
    }
  },
}));