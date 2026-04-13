import { useTheme } from '@mui/material/styles';

/**
 * LoadingIndicator — Premium spinner.
 * 12-dot circular spinner animated with CSS.
 */
export default function LoadingIndicator() {
  const theme = useTheme();
  return (
    <div className="flex items-center justify-center py-12">
      <div
        className="w-10 h-10 rounded-full animate-spin"
        style={{
          border: `3px solid ${theme.palette.divider}`,
          borderTopColor: theme.palette.primary.main,
        }}
      />
    </div>
  );
}
