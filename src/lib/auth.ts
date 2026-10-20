import { getSupabaseClient, isSupabaseConfigured } from './supabase/client';

export interface AdminUser {
  email: string;
  isSupabaseAuth: boolean;
}

const LOCAL_ADMIN_KEY = 'sumit_portfolio_admin_auth';

export async function checkAdminSession(): Promise<AdminUser | null> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user?.email) {
        return {
          email: data.session.user.email,
          isSupabaseAuth: true,
        };
      }
    } catch (err) {
      console.warn('Error checking Supabase session:', err);
    }
  }

  // Check fallback session in browser localStorage
  if (typeof window !== 'undefined') {
    try {
      const local = localStorage.getItem(LOCAL_ADMIN_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        return {
          email: parsed.email || 'sumitkdesigns@gmail.com',
          isSupabaseAuth: false,
        };
      }
    } catch {
      return null;
    }
  }

  return null;
}

export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; error: string | null }> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data?.user) {
        return { success: true, error: null };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed' };
    }
  }

  // Fallback demo authentication when Supabase keys are not yet connected
  if (
    email.toLowerCase().trim() === 'sumitkdesigns@gmail.com' ||
    email.toLowerCase().trim() === 'admin@sumitk.in'
  ) {
    if (password.length >= 6) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify({ email, timestamp: Date.now() }));
      }
      return { success: true, error: null };
    } else {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }
  }

  return {
    success: false,
    error: 'Invalid credentials. Default admin email: sumitkdesigns@gmail.com',
  };
}

export async function logoutAdmin(): Promise<void> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Sign out error:', err);
    }
  }

  if (typeof window !== 'undefined') {
    localStorage.removeItem(LOCAL_ADMIN_KEY);
  }
}
