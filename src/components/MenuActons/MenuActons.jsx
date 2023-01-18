import React from 'react';
import Box from '@mui/material/Box';
import { Nav, UsernameInfo, StyledLink } from './MenuActons.style';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { ReactComponent as NotificationIcon } from '../../images/notification.svg';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/DashboardRounded';
import { useAuth } from '../../hooks';
import { useLocalization } from '../../hooks';
import { Avatar } from '@mui/material';
import { MenuAvatar } from '../../components';
import { useLocation } from 'react-router-dom';
import { Notification } from '../Notifcation';
import { useMemo } from 'react';

export const MenuActons = React.memo(() => {
  const { t } = useLocalization();
  const { logout, user } = useAuth();
  const location = useLocation();
  const [notificationEl, setNotificationEl] = React.useState(false);
  const open = Boolean(notificationEl);

  const isAdmin = useMemo(() => user?.roleModel?.roleName === 'admin', [
    user?.roleModel?.roleName,
  ]);

  const handleClick = React.useCallback(() => {
    setNotificationEl(!notificationEl);
  }, [setNotificationEl, notificationEl]);

  const handleClose = React.useCallback(() => {
    setNotificationEl(false);
  }, [setNotificationEl]);

  const userFirstLetter = React.useMemo(() => {
    return user?.userName?.charAt(0)?.toUpperCase();
  }, [user]);

  const homeNavigation = React.useMemo(() => {
    return (
      <>
        {location.pathname.includes('admin') ? (
          <Box
            sx={{
              display: { xs: 'block', sm: 'block ', md: 'none', lg: 'none' },
              width: '100% !important',
            }}
          >
            <span className="icontxt">
              <StyledLink to="/workspace" className="adminroute">
                {t.Navbar.Workspace}
              </StyledLink>
            </span>
          </Box>
        ) : (
          <Box
            sx={{
              display: { xs: 'block', sm: 'block ', md: 'none', lg: 'none' },
              width: '100% !important',
            }}
          >
            <IconButton size="large" color="inherit">
              <Badge color="error">
                <DashboardIcon className="iconcolor" />
              </Badge>
            </IconButton>
            {isAdmin && (
              <span className="icontxt">
                <StyledLink to="/admin" className="adminroute">
                  {t.Navbar.admindashboard}
                </StyledLink>
              </span>
            )}
          </Box>
        )}
      </>
    );
  }, [isAdmin, location.pathname, t.Navbar.Workspace, t.Navbar.admindashboard]);
  return (
    <Nav
      sx={{
        display: { xs: 'flex', md: 'flex', lg: 'flex' },
        width: '100% !important',
      }}
      className="workspace"
    >
      <Box
        onClick={logout}
        className="bt-1-m"
        sx={{
          width: '100% !important',
          display: { xs: 'block', sm: 'block ', md: 'none', lg: 'none' },
        }}
      >
        <IconButton size="large" color="inherit">
          <Badge color="error">
            <LogoutIcon className="iconcolor" />
          </Badge>
        </IconButton>
        <span className="icontxt"> {t.Navbar.signout} </span>
      </Box>
      <Box
        className="bt-1-m"
        sx={{
          width: '100% !important',
          display: { xs: 'block', sm: 'block ', md: 'none', lg: 'none' },
        }}
      >
        <IconButton size="large" color="inherit">
          <Badge color="error">
            <Avatar
              sx={{
                bgcolor: 'background.primary',
                border: '1px solid',
                width: '20px',
                height: '20px',
                fontSize: '12px',
              }}
            >
              {userFirstLetter}
            </Avatar>
          </Badge>
        </IconButton>
        <span className="icontxt"> {t.Navbar.profile} </span>
      </Box>
      <Box className="bt-1-m" sx={{ width: '100% !important' }}>
        <IconButton onClick={handleClick} size="large" color="inherit">
          <Badge color="error">
            <NotificationIcon className="iconcolor" />
          </Badge>
        </IconButton>
        <span onClick={handleClick} className="icontxt">
          {t.Navbar.notification}
        </span>
        <Notification
          notificationEl={notificationEl}
          open={open}
          handleClose={handleClose}
        />
      </Box>
      <Box
        className="bt-1-m"
        sx={{
          display: { xs: 'block', sm: 'block ', md: 'none', lg: 'none' },
          width: '100% !important',
        }}
      >
        <IconButton size="large" color="inherit">
          <Badge color="error">
            <SearchIcon className="iconcolor" />
          </Badge>
        </IconButton>
        <span className="icontxt"> {t.Navbar.search} </span>
      </Box>
      {homeNavigation}
      <Box
        sx={{
          display: { xs: 'block', sm: 'block ', md: 'none', lg: 'none' },
          width: '100% !important',
        }}
      >
        <UsernameInfo>{user?.userName}</UsernameInfo>
      </Box>

      <Box
        sx={{
          display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' },
          margin: 1,
        }}
      >
        <MenuAvatar />
      </Box>
    </Nav>
  );
});
