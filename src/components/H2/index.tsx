import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';

export default function H2({ children, sx, ...props }: TypographyProps) {
  return (
    <Typography
      variant="h2"
      sx={{ color: 'text.primary', letterSpacing: '-0.025em', mb: 1.5, ...sx }}
      {...props}
    >
      {children}
    </Typography>
  );
}
