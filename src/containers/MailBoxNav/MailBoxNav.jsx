import * as React from 'react';
import { DashboardLogo, Notification, QuotaProgress } from '../../components';
import {
  Nav,
  WorkSpace,
  WorkSpaceWrapper,
  MenuBarWrapper,
  ProgressAvatarWrapper,
} from './MailBoxNav.style';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { ReactComponent as NotificationIcon } from '../../images/notification.svg';
import { Link, useLocation } from 'react-router-dom';
import { MenuAvatar, MenuNinedots } from '../../components';
import { Badge } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { composeBoxAtom, notificationsAtom } from '../../atoms';
import { useAuth, useWindowResize } from '../../hooks';

export const MailBoxNav = React.memo(() => {
  const { user } = useAuth();
  const { isAdmin } = useAuth();
  const composeOpen = useRecoilValue(composeBoxAtom);
  const [{ show }, setNotificationState] = useRecoilState(notificationsAtom);
  const location = useLocation();
  const [notificationEl, setNotificationEl] = React.useState(null);

  const size = useWindowResize();
  React.useEffect(() => {
    show &&
      setTimeout(
        () => setNotificationState(state => ({ ...state, show: false })),
        5000
      );
  }, [setNotificationState, show]);

  const handleNotificationClick = React.useCallback(
    event => {
      setNotificationEl(event?.currentTarget);

      setNotificationState(state => ({ ...state, show: true }));
    },
    [setNotificationState]
  );

  const handleNotificationClose = React.useCallback(
    event => {
      setNotificationEl(null);
      setNotificationState(state => ({ ...state, show: false }));
    },
    [setNotificationState]
  );

  const mailNavClasses = React.useMemo(() => {
    return composeOpen ? 'tabs compose ' : 'tabs';
  }, [composeOpen]);

  const menuItems = React.useMemo(() => {
    return [
      { title: 'Email', route: '/workspace' },
      { title: 'Calendar', route: '/workspace/calendar' },
      { title: 'Notes', route: '/workspace/meeting-notes' },
      { title: 'Workflows', route: '/workspace/workflow' },
      { title: 'MeetBlue', route: '/meetblue' },
      ...(isAdmin ? [{ title: 'Dashboard', route: '/admin' }] : []),
    ];
  }, [isAdmin]);

  const activeMenuItem = React.useMemo(() => {
    return menuItems.find(item => {
      return item.route === '/workspace'
        ? location.pathname === item.route
        : location.pathname.includes(item.route);
    });
  }, [menuItems, location]);

  const workSpaceNavItems = React.useMemo(() => {
    return (
      <>
        {menuItems.map((item, index) => (
          <WorkSpace
            sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' } }}
            key={item.route + index}
            className={activeMenuItem?.route === item.route ? 'active' : ''}
          >
            <Link
              to={item.route}
              className={
                !!user &&
                user?.domainModel?.domainStatus === 'PENDING' &&
                item.route !== '/admin'
                  ? 'disabled-link'
                  : ''
              }
            >
              {item.title}
            </Link>
          </WorkSpace>
        ))}
      </>
    );
  }, [menuItems, activeMenuItem?.route, user]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box position="static">
        <Nav>
          <Toolbar sx={{ p: 0 }} className="navtoolbar">
            <Box className="logo">
              <DashboardLogo height={35} showMobile={size?.width < 768} />
            </Box>
            <MenuBarWrapper
              className="navitem"
              sx={{
                display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' },
              }}
            >
              <WorkSpaceWrapper className={mailNavClasses}>
                {workSpaceNavItems}
              </WorkSpaceWrapper>
            </MenuBarWrapper>
            <Box
              className="searchItem"
              sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}
            ></Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none' },
              }}
            >
              <MenuNinedots />
            </Box>
            <Box sx={{ display: 'flex' }}>
              <IconButton
                onClick={handleNotificationClick}
                size="large"
                color="inherit"
              >
                <Badge color="error">
                  <NotificationIcon className="iconcolor" />
                </Badge>
              </IconButton>
              <Notification
                notificationEl={notificationEl}
                open={show}
                handleClose={handleNotificationClose}
              />
            </Box>

            <ProgressAvatarWrapper sx={{ display: 'flex' }}>
              <QuotaProgress className="mailBoxQuota" progress={60}>
                <MenuAvatar />
              </QuotaProgress>
            </ProgressAvatarWrapper>
          </Toolbar>
        </Nav>
      </Box>
    </Box>
  );
});
