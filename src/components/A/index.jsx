import { colors, motion } from '@/design-system/tokens';

/**
 * A — Styled anchor link.
 * Premium hover transition with brand accent.
 */
export default function A({ href, children, className = '', ...props }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-1 ${className}`}
      style={{
        color: colors.brand[400],
        textDecoration: 'none',
        transition: `color ${motion.duration.fast} ${motion.easing.default}`,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = colors.brand[300]; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = colors.brand[400]; }}
      {...props}
    >
      {children}
    </a>
  );
}
