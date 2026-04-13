import MuiButton from '@mui/material/Button';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';

/**
 * Button — Thin wrapper over MUI Button.
 * Route-aware: if `onClick` is given, renders a button; otherwise renders via href.
 */
export default function Button({ children, variant = 'contained', ...props }: MuiButtonProps) {
  return (
    <MuiButton variant={variant} {...props}>
      {children}
    </MuiButton>
  );
}
