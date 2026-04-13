import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProfileMenu from '@/components/ProfileMenu';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Header — Top navigation bar.
 * Adapted from react-boilerplate Header component.
 */
export default function Header() {
  const { user } = useAuth();

  return (
    <Box
      component="header"
      sx={{
        px: 3,
        py: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        RiseCoders — Learn. Build. Rise.
      </Typography>
      {user && <ProfileMenu />}
    </Box>
  );
}
