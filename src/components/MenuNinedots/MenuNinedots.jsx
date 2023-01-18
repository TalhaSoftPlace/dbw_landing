import React, { useMemo } from 'react';
import { Box , useTheme} from '@mui/material';
import {
  ProfileMenu,
  Menulist,
  Nav,
  NineDotsIcon,
  StyledLink,
} from './MenuNinedots.style';
import { useWindowResize } from '../../hooks';
import { useLocation } from 'react-router-dom';

export const MenuNinedots = React.memo(() => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const isMenuOpen = useMemo(() => !!anchorEl, [anchorEl]);
  const winSize = useWindowResize();
  const muiTheme = useTheme();
  const menuItems = React.useMemo(() => {
    return [
      { title: 'Email', route: '/workspace' },
      { title: 'Calendar', route: '/workspace/calendar' },
      { title: 'Notes', route: '/workspace/meeting-notes' },
      { title: 'Workflows', route: '/workspace/workflow' },
      { title: 'MeetBlue', route: '/meetblue' },
    ];
  }, []);

  const activeMenuItem = React.useMemo(() => {
    return menuItems.find((item) => {
      return item.route === '/workspace'
        ? location.pathname === item.route
        : location.pathname.includes(item.route);
    });
  }, [menuItems, location]);

  const handleProfileMenuOpen = React.useCallback(
    (event) => {
      setAnchorEl(event?.currentTarget);
    },
    [setAnchorEl]
  );

  const handleMenuClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const menuId = 'primary-search-account-menu';
  const renderMenu = React.useMemo(
    () => (
      <>
      {winSize.width <= muiTheme.breakpoints.values.md && (
          <ProfileMenu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
          className="avatarMenu"
        >
          <Nav style={{ padding: '0px' }}>
            {menuItems.map((item, index) => (
              <StyledLink
                to={item.route}
                onClick={handleMenuClose}
                key={item + index}
              >
                <Box className="bt-1" sx={{ width: '100% !important' }}>
                  <Menulist
                    className={
                      activeMenuItem?.route === item.route ? 'active' : ''
                    }
                  >
                    <span className="icontxt"> {item.title}</span>
                  </Menulist>
                </Box>
              </StyledLink>
            ))}
          </Nav>
        </ProfileMenu>
      )}
      </>
      
    ),
    [winSize.width, muiTheme.breakpoints.values.md, anchorEl, isMenuOpen, handleMenuClose, menuItems, activeMenuItem?.route]
  );

  return (
    <>
      <NineDotsIcon onClick={handleProfileMenuOpen} />
      {renderMenu}
    </>
  );
});
