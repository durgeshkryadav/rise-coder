import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';

export default function H1({ children, sx, ...props }: TypographyProps) {
  return (
    <Typography
      variant="h1"
      sx={{ color: 'text.primary', letterSpacing: '-0.03em', mb: 2, ...sx }}
      {...props}
    >
      {children}
    </Typography>
  );
}
