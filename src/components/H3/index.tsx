import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';

export default function H3({ children, sx, ...props }: TypographyProps) {
  return (
    <Typography
      variant="h3"
      sx={{ color: 'text.primary', letterSpacing: '-0.02em', mb: 1, ...sx }}
      {...props}
    >
      {children}
    </Typography>
  );
}
