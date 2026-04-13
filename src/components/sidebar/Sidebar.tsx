import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import navigation from '@/config/navigation';
import NavSection from './NavSection';
import { colors, layout, motion } from '@/design-system/tokens';
import { useSidebar } from '@/contexts/SidebarContext';

/**
 * Sidebar — Left navigation panel.
 * Collapsible: full (272px) or icon-only (64px).
 * Toggle chevron sits on the right border edge.
 * When collapsed, clicking empty space expands it.
 */
function Sidebar() {
  const { collapsed, toggle } = useSidebar();
  const navigate = useNavigate();
  const width = collapsed ? layout.sidebarCollapsedWidth : layout.sidebarWidth;

  return (
    <Box
      component="aside"
      onClick={collapsed ? toggle : undefined}
      sx={{
        width,
        height: '100dvh',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        zIndex: 1200,
        transition: `width ${motion.duration.normal} ${motion.easing.default}`,
        overflow: 'hidden',
        cursor: collapsed ? 'pointer' : 'default',
      }}
    >
      {/* Brand */}
      <Box
        sx={{
          px: collapsed ? 1 : 3,
          py: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          minHeight: 56,
        }}
      >
        <Box
          onClick={(e) => {
            e.stopPropagation();
            navigate('/');
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            overflow: 'hidden',
            cursor: 'pointer',
            '&:hover': { opacity: 0.85 },
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              minWidth: 32,
              borderRadius: '6px',
              background: `linear-gradient(135deg, ${colors.brand[400]}, ${colors.brand[600]})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#14131a',
              fontWeight: 800,
              fontSize: '0.875rem',
              boxShadow: `0 0 16px ${colors.brand[400]}40`,
            }}
          >
            R
          </Box>
          {!collapsed && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
              }}
            >
              RiseCoders
            </Typography>
          )}
        </Box>
      </Box>

      <Divider />

      {/* Navigation */}
      <Box sx={{ flex: 1, overflowY: 'auto', py: 1.5 }}>
        <List component="nav" disablePadding>
          {navigation.map((section) => (
            <NavSection key={section.id} section={section} />
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Divider />
      <Box sx={{ px: collapsed ? 1 : 3, py: 2, textAlign: collapsed ? 'center' : 'left' }}>
        {!collapsed && (
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            © 2026 RiseCoders
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default memo(Sidebar);
