import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppTheme } from '@/design-system/theme';
import { AuthProvider } from '@/contexts/AuthContext';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { ThemeModeProvider, useThemeMode } from '@/contexts/ThemeContext';
import router from './router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Inner app — consumes ThemeMode context to build MUI theme.
 */
function ThemedApp() {
  const { mode } = useThemeMode();
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SidebarProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}

/**
 * App entry — Provider stack.
 * QueryClient > ThemeMode > MUI Theme > Auth > Router.
 */
export default function AppEntry() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeModeProvider>
        <ThemedApp />
      </ThemeModeProvider>
    </QueryClientProvider>
  );
}
