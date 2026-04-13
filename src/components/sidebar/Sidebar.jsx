import { memo } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import navigation from '@/config/navigation';
import NavSection from './NavSection';
import { colors, layout } from '@/design-system/tokens';

/**
 * Sidebar — Left navigation panel.
 * Fixed position, dark surface, premium feel.
 */
function Sidebar() {
  return (
    <Box
      component="aside"
      sx={{
        width: layout.sidebarWidth,
        height: '100dvh',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.surface[100],
        borderRight: `1px solid ${colors.neutral[300]}`,
        zIndex: 1200,
      }}
    >
      {/* Brand */}
      <Box sx={{ px: 3, py: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '6px',
            background: `linear-gradient(135deg, ${colors.brand[400]}, ${colors.brand[600]})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: '0.875rem',
            boxShadow: `0 0 16px ${colors.brand[400]}50`,
          }}
        >
          R
        </Box>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: colors.neutral[950], letterSpacing: '-0.02em' }}
        >
          RiseCoders
        </Typography>
      </Box>

      <Divider sx={{ borderColor: colors.neutral[300] }} />

      {/* Navigation */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          py: 1.5,
        }}
      >
        <List component="nav" disablePadding>
          {navigation.map((section) => (
            <NavSection key={section.id} section={section} />
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Divider sx={{ borderColor: colors.neutral[300] }} />
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="caption" sx={{ color: colors.neutral[500] }}>
          © 2026 RiseCoders
        </Typography>
      </Box>
    </Box>
  );
}

export default memo(Sidebar);
