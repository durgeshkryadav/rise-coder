import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { colors } from '@/design-system/tokens';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" sx={{ color: colors.brand[500], mb: 1 }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 1, color: colors.neutral[800] }}>
        Page not found
      </Typography>
      <Typography variant="body1" sx={{ color: colors.neutral[500], mb: 4 }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </Box>
  );
}
