import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const THEME_KEY = 'risecoder-theme-mode';

const ThemeContext = createContext(null);

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, mode);
    } catch {
      // localStorage unavailable
    }
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(() => ({ mode, toggleTheme }), [mode, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return context;
}
