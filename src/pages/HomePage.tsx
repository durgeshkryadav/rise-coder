import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function HomePage() {
  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 2, letterSpacing: '-0.03em' }}>
        Welcome to RiseCoders
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 560 }}>
        Master DSA, System Design, React, and JavaScript with structured, premium learning paths.
        Pick a topic from the sidebar to begin.
      </Typography>
    </Box>
  );
}
