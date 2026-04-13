import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import H1 from '@/components/H1';
import Button from '@/components/Button';
import { colors } from '@/design-system/tokens';

/**
 * NotFoundPage — 404 container.
 */
export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <article>
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
        <Typography
          sx={{
            fontSize: '6rem',
            fontWeight: 800,
            letterSpacing: '-0.05em',
            background: `linear-gradient(135deg, ${colors.brand[400]}, ${colors.brand[600]})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          404
        </Typography>

        <H1 sx={{ fontSize: '1.5rem', mb: 1 }}>Page not found</H1>

        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>

        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </Box>
    </article>
  );
}
