import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Sidebar } from '@/components/sidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { layout } from '@/design-system/tokens';

/**
 * App container — The skeleton around all pages.
 * Pattern from react-boilerplate's containers/App.
 * Contains sidebar + header + content area + footer.
 */
export default function App() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Sidebar />
      <Box
        component="div"
        sx={{
          marginLeft: `${layout.sidebarWidth}px`,
          flex: 1,
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
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
