import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import AuthService from '@/services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const signUp = useCallback(async ({ email, password }) => {
    return AuthService.signUp({ email, password });
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    return AuthService.signIn({ email, password });
  }, []);

  const signOut = useCallback(async () => {
    await AuthService.signOut();
  }, []);

  const resetPassword = useCallback(async (email) => {
    return AuthService.resetPassword(email);
  }, []);

  const updatePassword = useCallback(async (newPassword) => {
    return AuthService.updatePassword(newPassword);
  }, []);

  const value = useMemo(() => ({
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
