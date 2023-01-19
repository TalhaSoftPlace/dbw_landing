import React from 'react';
import Box from '@mui/material/Box';
import { Nav, StyledLink } from './MenuActons.style';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/DashboardRounded';

import { useLocalization } from '../../hooks';
import { useLocation } from 'react-router-dom';


export const MenuActons = React.memo(() => {
  const { t } = useLocalization();

  const location = useLocation();

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

          </Box>
        )}
      </>
    );
  }, [location.pathname, t.Navbar.Workspace]);
  return (
    <Nav
      sx={{
        display: { xs: 'flex', md: 'flex', lg: 'flex' },
        width: '100% !important',
      }}
      className="workspace"
    >


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
          display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' },
          margin: 1,
        }}
      >
      </Box>
    </Nav>
  );
});
