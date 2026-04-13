import { memo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRightFromBracket, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useThemeMode } from '@/contexts/ThemeContext';
import { colors } from '@/design-system/tokens';

function ProfileMenu() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { mode, toggleTheme } = useThemeMode();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = useCallback((e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget), []);
  const handleClose = useCallback(() => setAnchorEl(null), []);

  const handleSignOut = useCallback(async () => {
    handleClose();
    await signOut();
    navigate('/auth/login', { replace: true });
  }, [signOut, navigate, handleClose]);

  const handleSettings = useCallback(() => {
    handleClose();
    // Settings page can be added later
  }, [handleClose]);

  const handleThemeToggle = useCallback((e: React.MouseEvent | React.ChangeEvent) => {
    e.stopPropagation();
    toggleTheme();
  }, [toggleTheme]);

  const initials = user?.email
    ? user.email.charAt(0).toUpperCase()
    : '?';

  return (
    <>
      <IconButton onClick={handleOpen} size="small" sx={{ p: 0.5 }}>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            fontSize: '0.875rem',
            fontWeight: 700,
            background: `linear-gradient(135deg, ${colors.brand[400]}, ${colors.brand[600]})`,
            color: '#fff',
          }}
        >
          {initials}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 220,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
            },
          },
        }}
      >
        {/* User info */}
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {user?.email || 'User'}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Signed in
          </Typography>
        </Box>

        <Divider />

        {/* Theme toggle */}
        <MenuItem onClick={handleThemeToggle} sx={{ py: 1 }}>
          <ListItemIcon sx={{ color: 'text.secondary', minWidth: 36 }}>
            <FontAwesomeIcon icon={mode === 'dark' ? faSun : faMoon} style={{ fontSize: '0.875rem' }} />
          </ListItemIcon>
          <ListItemText
            primary={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
            primaryTypographyProps={{ fontSize: '0.875rem' }}
          />
          <Switch
            size="small"
            checked={mode === 'dark'}
            onChange={handleThemeToggle}
            onClick={(e) => e.stopPropagation()}
          />
        </MenuItem>

        {/* Settings */}
        <MenuItem onClick={handleSettings} sx={{ py: 1 }}>
          <ListItemIcon sx={{ color: 'text.secondary', minWidth: 36 }}>
            <FontAwesomeIcon icon={faGear} style={{ fontSize: '0.875rem' }} />
          </ListItemIcon>
          <ListItemText
            primary="Settings"
            primaryTypographyProps={{ fontSize: '0.875rem' }}
          />
        </MenuItem>

        <Divider />

        {/* Logout */}
        <MenuItem onClick={handleSignOut} sx={{ py: 1 }}>
          <ListItemIcon sx={{ color: 'error.main', minWidth: 36 }}>
            <FontAwesomeIcon icon={faRightFromBracket} style={{ fontSize: '0.875rem' }} />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ fontSize: '0.875rem', color: 'error.main' }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}

export default memo(ProfileMenu);
