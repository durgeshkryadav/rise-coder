import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Sidebar } from '@/components/sidebar';
import { layout } from '@/design-system/tokens';

/**
 * AppLayout — Main shell.
 * Fixed sidebar + scrollable content area.
 */
function AppLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          marginLeft: `${layout.sidebarWidth}px`,
          flex: 1,
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="flex-1 w-full max-w-5xl mx-auto px-6 py-8 lg:px-10">
          <Outlet />
        </div>
      </Box>
    </Box>
  );
}

export default memo(AppLayout);
