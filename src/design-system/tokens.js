/**
 * RiseCoders — Design Tokens (JS)
 * Single source of truth. Portfolio dark theme.
 * Deep purple-black backgrounds, luxury gold (#D4A853) accent.
 */

export const colors = {
  // Accent — Luxury Gold / Amber
  brand: {
    50: '#fdf8ed',
    100: '#f9edcc',
    200: '#f3da99',
    300: '#ecc566',
    400: '#D4A853',    // primary gold accent
    500: '#c49a3d',
    600: '#a47d2e',
    700: '#836325',
    800: '#6b4f1f',
    900: '#563f19',
  },
  // Surfaces — deep dark purple-black (from --bg-primary: #14131a)
  surface: {
    0: '#0e0d13',     // deepest background
    50: '#14131a',    // app background
    100: '#1c1b23',   // sidebar / panels
    150: '#1c1b23',   // card background
    200: '#24232c',   // card hover / input bg
    300: '#2e2d37',   // elevated hover
  },
  // Borders & muted text
  neutral: {
    300: '#2a2933',   // subtle borders
    400: '#3a3942',   // borders
    500: '#4f4f52',   // muted text
    600: '#79787f',   // secondary text
    700: '#8b8a91',   // primary text
    800: '#b0afb5',   // bright text
    900: '#d4d3d8',   // headline text
    950: '#ffffff',   // white text
  },
  // Semantic
  semantic: {
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa',
  },
  // Tech card category accents
  category: {
    frontend: '#4f91f2',
    backend: '#f37c36',
    database: '#e0558a',
    devops: '#10c0a2',
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
