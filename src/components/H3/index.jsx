import Typography from '@mui/material/Typography';
import { colors } from '@/design-system/tokens';

export default function H3({ children, sx, ...props }) {
  return (
    <Typography
      variant="h3"
      sx={{ color: colors.neutral[900], letterSpacing: '-0.02em', mb: 1, ...sx }}
      {...props}
    >
      {children}
    </Typography>
  );
}
