import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Sidebar } from '@/components/sidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { layout, motion } from '@/design-system/tokens';
import { useSidebar } from '@/contexts/SidebarContext';

/**
 * App container — The skeleton around all pages.
 * Sidebar width adjusts dynamically based on collapsed state.
 */
export default function App() {
  const { collapsed, toggle } = useSidebar();
  const sidebarWidth = collapsed ? layout.sidebarCollapsedWidth : layout.sidebarWidth;

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Sidebar />

      {/* Sidebar toggle arrow — dark pill on the border edge, adjacent to nav */}
      <IconButton
        onClick={toggle}
        sx={{
          position: 'fixed',
          top: 12,
          left: sidebarWidth,
          transform: 'translateX(-50%)',
          zIndex: 1300,
          width: 32,
          height: 32,
          borderRadius: '50%',
          bgcolor: '#2e2d37',
          color: '#b0afb5',
          boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
          '&:hover': {
            bgcolor: '#3a3942',
            color: '#ffffff',
          },
          transition: `all ${motion.duration.normal} ${motion.easing.default}`,
        }}
      >
        <FontAwesomeIcon
          icon={collapsed ? faArrowRight : faArrowLeft}
          style={{ fontSize: '0.85rem' }}
        />
      </IconButton>

      <Box
        component="div"
        sx={{
          marginLeft: `${sidebarWidth}px`,
          flex: 1,
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          transition: `margin-left ${motion.duration.normal} ${motion.easing.default}`,
        }}
      >
        <Header />
        <Box
          component="main"
          sx={{ flex: 1, width: '100%', px: 4, py: 4 }}
        >
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
