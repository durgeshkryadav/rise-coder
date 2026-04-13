import { createTheme } from '@mui/material/styles';
import { colors, typography, spacing, motion, layout } from './tokens';

/**
 * Light-mode surface & neutral overrides.
 * Inverted from the portfolio dark palette for light mode support.
 */
const lightColors = {
  surface: {
    0: '#ffffff',
    50: '#f8f8fa',
    100: '#f0f0f3',
    150: '#e8e7ec',
    200: '#dddce2',
    300: '#c8c7cf',
  },
  neutral: {
    300: '#e2e1e8',
    400: '#c8c7cf',
    500: '#8b8a91',
    600: '#79787f',
    700: '#4f4f52',
    800: '#3a3942',
    900: '#24232c',
    950: '#14131a',
  },
};

/**
 * RiseCoders — MUI Theme Factory
 * Luxury dark theme: deep purple-black (#14131a) + gold (#D4A853).
 * Supports 'dark' (default) and 'light' modes.
 */
export function createAppTheme(mode = 'dark') {
  const isDark = mode === 'dark';
  const surface = isDark ? colors.surface : lightColors.surface;
  const neutral = isDark ? colors.neutral : lightColors.neutral;

  return createTheme({
    palette: {
      mode,
      primary: {
        main: colors.brand[400],     // #D4A853 luxury gold
        light: colors.brand[300],
        dark: colors.brand[600],
        contrastText: '#14131a',
      },
      secondary: {
        main: neutral[600],
        light: neutral[700],
        dark: neutral[500],
      },
      background: {
        default: surface[50],        // #14131a in dark mode
        paper: surface[100],         // #1c1b23 in dark mode
      },
      text: {
        primary: neutral[900],
        secondary: neutral[600],
        disabled: neutral[500],
      },
      error: { main: colors.semantic.error },
      warning: { main: colors.semantic.warning },
      success: { main: colors.semantic.success },
      info: { main: colors.semantic.info },
      divider: neutral[300],
    },

    typography: {
      fontFamily: typography.fontFamily,
      h1: { fontSize: typography.scale['4xl'].size, fontWeight: typography.scale['4xl'].weight, lineHeight: typography.scale['4xl'].lineHeight, color: neutral[950] },
      h2: { fontSize: typography.scale['3xl'].size, fontWeight: typography.scale['3xl'].weight, lineHeight: typography.scale['3xl'].lineHeight, color: neutral[950] },
      h3: { fontSize: typography.scale['2xl'].size, fontWeight: typography.scale['2xl'].weight, lineHeight: typography.scale['2xl'].lineHeight, color: neutral[900] },
      h4: { fontSize: typography.scale.xl.size, fontWeight: typography.scale.xl.weight, lineHeight: typography.scale.xl.lineHeight, color: neutral[900] },
      h5: { fontSize: typography.scale.lg.size, fontWeight: typography.scale.lg.weight, lineHeight: typography.scale.lg.lineHeight, color: neutral[800] },
      h6: { fontSize: typography.scale.base.size, fontWeight: 600, lineHeight: typography.scale.base.lineHeight, color: neutral[800] },
      body1: { fontSize: typography.scale.base.size, lineHeight: typography.scale.base.lineHeight, color: neutral[700] },
      body2: { fontSize: typography.scale.sm.size, lineHeight: typography.scale.sm.lineHeight, color: neutral[600] },
      caption: { fontSize: typography.scale.xs.size, lineHeight: typography.scale.xs.lineHeight, color: neutral[500] },
      button: { fontSize: typography.scale.sm.size, fontWeight: 600, textTransform: 'none', letterSpacing: '0.01em' },
    },

    shape: {
      borderRadius: layout.borderRadius.md,
    },

    spacing: spacing[1],

    transitions: {
      duration: {
        shortest: 100,
        shorter: 150,
        short: 250,
        standard: 350,
        complex: 500,
      },
      easing: {
        easeInOut: motion.easing.default,
        easeIn: motion.easing.in,
        easeOut: motion.easing.out,
        sharp: motion.easing.spring,
      },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: typography.fontFamily,
            backgroundColor: surface[50],
            color: neutral[700],
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: layout.borderRadius.md,
            padding: `${spacing[2]}px ${spacing[4]}px`,
            transition: `all ${motion.duration.fast} ${motion.easing.default}`,
          },
          contained: {
            backgroundColor: colors.brand[400],
            color: '#14131a',
            '&:hover': {
              backgroundColor: colors.brand[300],
            },
          },
          outlined: {
            borderColor: neutral[400],
            color: neutral[700],
            '&:hover': {
              borderColor: colors.brand[400],
              backgroundColor: `${colors.brand[400]}10`,
            },
          },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            borderRadius: layout.borderRadius.lg,
            border: `1px solid ${neutral[300]}`,
            backgroundColor: surface[150],
            backgroundImage: 'none',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: layout.borderRadius.md,
            transition: `background-color 300ms ${motion.easing.default}, color 300ms ${motion.easing.default}`,
            '&:hover': {
              backgroundColor: `${neutral[500]}20`,  // mode-aware subtle hover
            },
            '&.Mui-selected': {
              backgroundColor: `${colors.brand[400]}1A`,
              color: colors.brand[400],
              '&:hover': {
                backgroundColor: `${colors.brand[400]}30`,
              },
            },
          },
        },
      },
      MuiTooltip: {
        defaultProps: { arrow: true },
        styleOverrides: {
          tooltip: {
            fontSize: typography.scale.xs.size,
            borderRadius: layout.borderRadius.sm,
            backgroundColor: surface[300],
            border: `1px solid ${neutral[400]}`,
            color: neutral[800],
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: layout.borderRadius.sm,
          },
        },
      },
    },
  });
}

// Default export for backwards compatibility
const theme = createAppTheme('dark');
export default theme;
