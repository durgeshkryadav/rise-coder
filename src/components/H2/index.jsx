import Typography from '@mui/material/Typography';
import { colors } from '@/design-system/tokens';

export default function H2({ children, sx, ...props }) {
  return (
    <Typography
      variant="h2"
      sx={{ color: colors.neutral[950], letterSpacing: '-0.025em', mb: 1.5, ...sx }}
      {...props}
    >
      {children}
    </Typography>
  );
}
