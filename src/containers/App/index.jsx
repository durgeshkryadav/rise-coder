import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Sidebar } from '@/components/sidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { colors, layout, motion } from '@/design-system/tokens';
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

      {/* Sidebar toggle arrow — outside sidebar, on the border line */}
      <IconButton
        onClick={toggle}
        size="small"
        sx={{
          position: 'fixed',
          top: 68,
          left: sidebarWidth,
          transform: 'translateX(-50%)',
          zIndex: 1300,
          width: 28,
          height: 28,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          color: 'text.secondary',
          '&:hover': {
            bgcolor: colors.brand[400],
            color: '#14131a',
            borderColor: colors.brand[400],
          },
          transition: `all ${motion.duration.normal} ${motion.easing.default}`,
        }}
      >
        <FontAwesomeIcon
          icon={collapsed ? faChevronRight : faChevronLeft}
          style={{ fontSize: '0.75rem' }}
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
          className="flex-1 w-full max-w-5xl mx-auto px-6 py-8 lg:px-10"
        >
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
