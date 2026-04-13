import { useTheme } from '@mui/material/styles';

/**
 * List — Renders a list of items using a supplied component.
 * Pattern from react-boilerplate.
 */
export default function List({ items, component: Component }) {
  const theme = useTheme();

  if (!items || items.length === 0) {
    return <Component />;
  }

  return (
    <ul
      className="list-none space-y-1"
      style={{ borderLeft: `2px solid ${theme.palette.divider}`, paddingLeft: 16 }}
    >
      {items.map((item) => (
        <li key={item.id || item}>
          <Component item={item} />
        </li>
      ))}
    </ul>
  );
}
