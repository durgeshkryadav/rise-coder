import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from '@/design-system/tokens';

/**
 * Header — Top navigation bar.
 * Adapted from react-boilerplate Header component.
 */
export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        px: 3,
        py: 2,
        borderBottom: `1px solid ${colors.neutral[300]}`,
        backgroundColor: colors.surface[100],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="body2" sx={{ color: colors.neutral[600] }}>
        RiseCoders — Learn. Build. Rise.
      </Typography>
    </Box>
  );
}
