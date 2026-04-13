import { memo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { useSidebar } from '@/contexts/SidebarContext';

/**
 * NavSection — A single sidebar navigation item.
 * Clicking navigates to the section's basePath.
 * Sub-topics render as content on the right side, not in sidebar.
 */
function NavSection({ section }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { collapsed } = useSidebar();
  const isActive = location.pathname.startsWith(section.basePath);

  const handleClick = useCallback(() => {
    navigate(section.basePath);
  }, [navigate, section.basePath]);

  const button = (
    <ListItemButton
      onClick={handleClick}
      selected={isActive}
      sx={{
        mx: 1,
        mb: 0.5,
        justifyContent: collapsed ? 'center' : 'flex-start',
        px: collapsed ? 1 : 2,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: collapsed ? 0 : 36,
          justifyContent: 'center',
          color: isActive ? 'primary.main' : 'text.secondary',
        }}
      >
        <FontAwesomeIcon icon={section.icon} style={{ fontSize: '1.1rem' }} />
      </ListItemIcon>
      {!collapsed && (
        <ListItemText
          primary={section.label}
          primaryTypographyProps={{
            fontSize: '0.875rem',
            fontWeight: isActive ? 600 : 500,
            color: isActive ? 'primary.main' : 'text.primary',
          }}
        />
      )}
    </ListItemButton>
  );

  if (collapsed) {
    return (
      <li>
        <Tooltip title={section.label} placement="right">
          {button}
        </Tooltip>
      </li>
    );
  }

  return <li>{button}</li>;
}

export default memo(NavSection);
