import Typography from '@mui/material/Typography';
import { colors } from '@/design-system/tokens';

export default function H1({ children, sx, ...props }) {
  return (
    <Typography
      variant="h1"
      sx={{ color: colors.neutral[950], letterSpacing: '-0.03em', mb: 2, ...sx }}
      {...props}
    >
      {children}
    </Typography>
  );
}
