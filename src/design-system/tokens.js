/**
 * RiseCoders — Design Tokens (JS)
 * Single source of truth. Portfolio-inspired dark theme.
 * Dark blue-gray backgrounds, teal/emerald accents.
 * Inspired by dev-portfolio dark UI.
 */

export const colors = {
  // Accent — Teal / Emerald
  brand: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  // Surfaces — dark blue-gray, portfolio-style
  surface: {
    0: '#0a0c10',     // deepest background
    50: '#0d1117',    // app background
    100: '#111720',   // sidebar / elevated panels
    150: '#161b27',   // card background
    200: '#1c2333',   // card hover / input bg
    300: '#242d3d',   // elevated hover
  },
  // Borders & muted text
  neutral: {
    300: '#1e293b',   // subtle borders
    400: '#2d3a4f',   // borders
    500: '#64748b',   // muted text
    600: '#94a3b8',   // secondary text
    700: '#cbd5e1',   // primary text
    800: '#e2e8f0',   // bright text
    900: '#f1f5f9',   // headline text
    950: '#f8fafc',   // white text
  },
  // Semantic
  semantic: {
    success: '#34d399',   // emerald-400
    warning: '#fbbf24',   // amber-400
    error: '#f87171',     // red-400
    info: '#60a5fa',      // blue-400
  },
};

export const typography = {
  fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
  scale: {
    xs: { size: '0.75rem', lineHeight: '1rem', weight: 400 },
    sm: { size: '0.875rem', lineHeight: '1.25rem', weight: 400 },
    base: { size: '1rem', lineHeight: '1.5rem', weight: 400 },
    lg: { size: '1.125rem', lineHeight: '1.75rem', weight: 500 },
    xl: { size: '1.25rem', lineHeight: '1.75rem', weight: 600 },
    '2xl': { size: '1.5rem', lineHeight: '2rem', weight: 700 },
    '3xl': { size: '1.875rem', lineHeight: '2.25rem', weight: 700 },
    '4xl': { size: '2.25rem', lineHeight: '2.5rem', weight: 800 },
  },
};

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
};

export const motion = {
  duration: {
    instant: '100ms',
    fast: '150ms',
    normal: '250ms',
    smooth: '350ms',
    slow: '500ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};

export const layout = {
  sidebarWidth: 272,
  sidebarCollapsedWidth: 64,
  headerHeight: 56,
  maxContentWidth: 1200,
  borderRadius: {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
};
