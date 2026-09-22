import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { AUTH_ENABLED, GUEST_USER } from '@/config/auth';
import AuthService from '@/services/authService';
import type { AuthContextValue, AuthCredentials } from '@/types';

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!AUTH_ENABLED) {
      setUser(GUEST_USER);
      setLoading(false);
      return undefined;
    }

    // Get initial session
    AuthService.getSession().then((sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });

    // Listen for auth state changes
    const subscription = AuthService.onAuthStateChange((_event, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = useCallback(async ({ email, password }: AuthCredentials) => {
    return AuthService.signUp({ email, password });
  }, []);

  const signIn = useCallback(async ({ email, password }: AuthCredentials) => {
    return AuthService.signIn({ email, password });
  }, []);

  const signOut = useCallback(async () => {
    await AuthService.signOut();
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    return AuthService.resetPassword(email);
  }, []);

  const updatePassword = useCallback(async (newPassword: string) => {
    return AuthService.updatePassword(newPassword);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
  }), [user, session, loading, signUp, signIn, signOut, resetPassword, updatePassword]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook export alongside provider — standard context pattern.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
