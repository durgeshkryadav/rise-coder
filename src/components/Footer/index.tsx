import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import A from '@/components/A';

/**
 * Footer — App footer.
 * Adapted from react-boilerplate Footer component.
 */
export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        px: 3,
        py: 2.5,
        borderTop: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Typography variant="caption">
        © 2026 RiseCoders. All rights reserved.
      </Typography>
      <Typography variant="caption">
        Made with care by{' '}
        <A href="https://github.com/risecoders">RiseCoders Team</A>
      </Typography>
    </Box>
  );
}
