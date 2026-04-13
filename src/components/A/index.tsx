import { colors, motion } from '@/design-system/tokens';

interface AProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

/**
 * A — Styled anchor link.
 * Premium hover transition with brand accent.
 */
export default function A({ href, children, className = '', ...props }: AProps) {
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
