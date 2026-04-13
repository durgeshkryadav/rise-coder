import type { ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';

interface ListProps {
  items?: Array<{ id?: string; [key: string]: unknown }>;
  component?: React.ComponentType<{ item?: unknown }>;
  children?: ReactNode;
}

/**
 * List — Renders a list of items using a supplied component.
 * Pattern from react-boilerplate.
 */
export default function List({ items, component: Component, children }: ListProps) {
  const theme = useTheme();

  if (children) {
    return (
      <ul
        className="list-none space-y-1"
        style={{ borderLeft: `2px solid ${theme.palette.divider}`, paddingLeft: 16 }}
      >
        {children}
      </ul>
    );
  }

  if (!items || items.length === 0) {
    return Component ? <Component /> : null;
  }

  return (
    <ul
      className="list-none space-y-1"
      style={{ borderLeft: `2px solid ${theme.palette.divider}`, paddingLeft: 16 }}
    >
      {items.map((item) => (
        <li key={item.id ?? JSON.stringify(item)}>
          {Component && <Component item={item} />}
        </li>
      ))}
    </ul>
  );
}
