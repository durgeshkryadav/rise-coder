import type { AuthChangeEvent, Session, SupabaseClient } from '@supabase/supabase-js';
import { supabase } from './supabase';
import type { AuthCredentials } from '../types';

function requireSupabase(): SupabaseClient {
  if (!supabase) {
    throw new Error('Supabase client is not configured.');
  }
  return supabase;
}

/**
 * AuthService — Wraps Supabase Auth methods.
 * Centralizes all authentication logic for maintainability.
 */
const AuthService = {
  /**
   * Sign up with email & password.
   * Supabase sends a confirmation email by default.
   */
  async signUp({ email, password }: AuthCredentials) {
    const { data, error } = await requireSupabase().auth.signUp({ email, password });
    if (error) throw error;
    return data;
  },

  /**
   * Sign in with email & password.
   */
  async signIn({ email, password }: AuthCredentials) {
    const { data, error } = await requireSupabase().auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  /**
   * Sign out the current user.
   */
  async signOut() {
    const { error } = await requireSupabase().auth.signOut();
    if (error) throw error;
  },

  /**
   * Send a password reset email.
   * The user will receive a link pointing to your reset password page.
   */
  async resetPassword(email: string) {
    const { data, error } = await requireSupabase().auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    if (error) throw error;
    return data;
  },

  /**
   * Update the user's password (after clicking reset link).
   */
  async updatePassword(newPassword: string) {
    const { data, error } = await requireSupabase().auth.updateUser({ password: newPassword });
    if (error) throw error;
    return data;
  },

  /**
   * Get current session.
   */
  async getSession() {
    const { data: { session }, error } = await requireSupabase().auth.getSession();
    if (error) throw error;
    return session;
  },

  /**
   * Get current user.
   */
  async getUser() {
    const { data: { user }, error } = await requireSupabase().auth.getUser();
    if (error) throw error;
    return user;
  },

  /**
   * Subscribe to auth state changes.
   * Returns an unsubscribe function.
   */
  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    const { data: { subscription } } = requireSupabase().auth.onAuthStateChange(callback);
    return subscription;
  },
};

export default AuthService;
