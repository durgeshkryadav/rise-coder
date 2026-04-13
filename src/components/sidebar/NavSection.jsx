import { memo, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { colors, motion } from '@/design-system/tokens';

/**
 * NavSection — A single collapsible sidebar section.
 * Renders the parent item with expand/collapse toggle
 * and a smooth Collapse animation for children.
 */
function NavSection({ section }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname.startsWith(section.basePath);
  const [open, setOpen] = useState(isActive);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleChildClick = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate],
  );

  return (
    <li>
      <ListItemButton
        onClick={handleToggle}
        selected={isActive && !open}
        sx={{ mx: 1, mb: 0.5 }}
      >
        <ListItemIcon sx={{ minWidth: 36, color: isActive ? 'primary.main' : 'text.disabled' }}>
          <FontAwesomeIcon icon={section.icon} style={{ fontSize: '1rem' }} />
        </ListItemIcon>
        <ListItemText
          primary={section.label}
          primaryTypographyProps={{
            fontSize: '0.875rem',
            fontWeight: isActive ? 600 : 500,
            color: isActive ? 'primary.main' : 'text.primary',
          }}
        />
        <FontAwesomeIcon
          icon={faChevronDown}
          style={{
            fontSize: '0.75rem',
            color: colors.neutral[500],
            transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
            transition: `transform ${motion.duration.fast} ${motion.easing.default}`,
          }}
        />
      </ListItemButton>

      <Collapse in={open} timeout={250} unmountOnExit>
        <List component="div" disablePadding>
          {section.children.map((child) => {
            const childActive = location.pathname === child.path;
            return (
              <ListItemButton
                key={child.id}
                onClick={() => handleChildClick(child.path)}
                selected={childActive}
                sx={{ pl: 7, mx: 1, mb: 0.25, minHeight: 36 }}
              >
                <ListItemText
                  primary={child.label}
                  primaryTypographyProps={{
                    fontSize: '0.8125rem',
                    fontWeight: childActive ? 600 : 400,
                    color: childActive ? 'primary.main' : 'text.secondary',
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </li>
  );
}

export default memo(NavSection);
