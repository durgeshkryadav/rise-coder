import { colors } from '@/design-system/tokens';

/**
 * LoadingIndicator — Premium spinner.
 * 12-dot circular spinner animated with CSS.
 */
export default function LoadingIndicator() {
  return (
    <div className="flex items-center justify-center py-12">
      <div
        className="w-10 h-10 rounded-full animate-spin"
        style={{
          border: `3px solid ${colors.neutral[300]}`,
          borderTopColor: colors.brand[500],
        }}
      />
    </div>
  );
}
