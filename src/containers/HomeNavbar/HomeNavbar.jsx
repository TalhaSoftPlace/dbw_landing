import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../components';
import { SigninSignup } from '..';
import { Nav, NavItems, Menue, MenueIcon,StyledLink  } from './HomeNavbar.styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';

export const HomeNavbar = React.memo(({ pages = [] }) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event?.currentTarget);
  };
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menue
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      onClick={handleMobileMenuClose}
      className="mobile-menu"
    >
      {pages.map(({ name, to }) => (
        <MenuItem className="b-b pl-25" key={name}>
          <StyledLink to={to} key={name}>
            {name}
          </StyledLink>
        </MenuItem>
      ))}

      <MenuItem>
        <Box sx={{ display: { xs: 'flex', md: 'none', lg: 'none' } }}>
          <SigninSignup />
        </Box>
      </MenuItem>
    </Menue>
  );
  return (
    <Box>
      <Nav>
        <Link to="/" className='logo'>
          <Logo height="35" variant="light" />
        </Link>
        <Box sx={{ flexGrow: 2 }} />
        <NavItems sx={{ display: { xs: 'none', md: 'none', lg: 'flex' } }}>
          {pages.map(({ name, to }) => (
            <StyledLink key={name} to={to}>
              {name}
            </StyledLink>
          ))}
        </NavItems>
        <Box sx={{ display: { xs: 'none', md: 'flex', lg: 'flex' } }}>
          <SigninSignup />
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'flex', lg: 'none' } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MenueIcon />
          </IconButton>
        </Box>
      </Nav>
      {renderMobileMenu}
    </Box>
  );
});
