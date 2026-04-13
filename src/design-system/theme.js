import { createTheme } from '@mui/material/styles';
import { colors, typography, spacing, motion, layout } from './tokens';

/**
 * RiseCoders — MUI Dark Theme
 * Dark blue-gray backgrounds, teal accents.
 * Portfolio-inspired. Built from design tokens.
 */
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.brand[500],
      light: colors.brand[400],
      dark: colors.brand[700],
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.neutral[600],
      light: colors.neutral[700],
      dark: colors.neutral[500],
    },
    background: {
      default: colors.surface[50],
      paper: colors.surface[100],
    },
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[600],
      disabled: colors.neutral[500],
    },
    error: { main: colors.semantic.error },
    warning: { main: colors.semantic.warning },
    success: { main: colors.semantic.success },
    info: { main: colors.semantic.info },
    divider: colors.neutral[300],
  },

  typography: {
    fontFamily: typography.fontFamily,
    h1: { fontSize: typography.scale['4xl'].size, fontWeight: typography.scale['4xl'].weight, lineHeight: typography.scale['4xl'].lineHeight, color: colors.neutral[950] },
    h2: { fontSize: typography.scale['3xl'].size, fontWeight: typography.scale['3xl'].weight, lineHeight: typography.scale['3xl'].lineHeight, color: colors.neutral[950] },
    h3: { fontSize: typography.scale['2xl'].size, fontWeight: typography.scale['2xl'].weight, lineHeight: typography.scale['2xl'].lineHeight, color: colors.neutral[900] },
    h4: { fontSize: typography.scale.xl.size, fontWeight: typography.scale.xl.weight, lineHeight: typography.scale.xl.lineHeight, color: colors.neutral[900] },
    h5: { fontSize: typography.scale.lg.size, fontWeight: typography.scale.lg.weight, lineHeight: typography.scale.lg.lineHeight, color: colors.neutral[800] },
    h6: { fontSize: typography.scale.base.size, fontWeight: 600, lineHeight: typography.scale.base.lineHeight, color: colors.neutral[800] },
    body1: { fontSize: typography.scale.base.size, lineHeight: typography.scale.base.lineHeight, color: colors.neutral[700] },
    body2: { fontSize: typography.scale.sm.size, lineHeight: typography.scale.sm.lineHeight, color: colors.neutral[600] },
    caption: { fontSize: typography.scale.xs.size, lineHeight: typography.scale.xs.lineHeight, color: colors.neutral[500] },
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
          backgroundColor: colors.surface[50],
          color: colors.neutral[700],
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
          background: `linear-gradient(135deg, ${colors.brand[600]}, ${colors.brand[500]})`,
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.brand[500]}, ${colors.brand[400]})`,
          },
        },
        outlined: {
          borderColor: colors.neutral[400],
          color: colors.neutral[700],
          '&:hover': {
            borderColor: colors.brand[500],
            backgroundColor: `${colors.brand[500]}10`,
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: layout.borderRadius.lg,
          border: `1px solid ${colors.neutral[300]}`,
          backgroundColor: colors.surface[150],
          backgroundImage: 'none',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: layout.borderRadius.md,
          transition: `all ${motion.duration.fast} ${motion.easing.default}`,
          '&:hover': {
            backgroundColor: colors.surface[200],
          },
          '&.Mui-selected': {
            backgroundColor: `${colors.brand[600]}18`,
            color: colors.brand[400],
            '&:hover': {
              backgroundColor: `${colors.brand[600]}24`,
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
          backgroundColor: colors.surface[300],
          border: `1px solid ${colors.neutral[400]}`,
          color: colors.neutral[800],
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

export default theme;
