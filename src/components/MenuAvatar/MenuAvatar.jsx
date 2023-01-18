import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import {
  ProfileMenu,
  StyledLink,
  Nav,
  ProgressAvatarWrapper,
  SettingIcon,
  FeedBackIcon,
  StyledAvatar,
  AvatarStyled,
} from './MenuAvatar.style';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../hooks';
import { useLocalization } from '../../hooks';
import {  Badge, IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { QuotaProgress } from '../QuotaProgress';
import { FeedBackDialog } from '../../containers';
import { useProfilePicture } from '../../queries';

export const MenuAvatar = React.memo(() => {
  const { t } = useLocalization();
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const { data: picture } = useProfilePicture();
  const isMenuOpen = useMemo(() => !!anchorEl, [anchorEl]);
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = React.useState(false);
  const hadleOpen = React.useCallback(() => {
    setOpenDialog(true);
  }, []);
  const handleClose = React.useCallback(() => {
    setOpenDialog(false);
  }, []);

  const isAdmin = useMemo(() => user?.roleModel?.roleName === 'admin', [
    user?.roleModel?.roleName,
  ]);

  const userFirstLetter = React.useMemo(() => {
    return user?.userName?.charAt(0)?.toUpperCase();
  }, [user]);

  const handleProfileMenuOpen = React.useCallback(
    event => {
      setAnchorEl(event?.currentTarget);
    },
    [setAnchorEl]
  );

  const handleMenuClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const userTotalQuota = React.useMemo(() => {
    const quotaInGB = user?.quota / 1024 / 1024 / 1024;
    return quotaInGB?.toFixed(2);
  }, [user?.quota]);

  const userUsedQuota = React.useMemo(() => {
    const quotaInGB = user?.quotaModel?.bytes / 1024 / 1024 / 1024;
    return !!quotaInGB ? quotaInGB?.toFixed(3) : '0';
  }, [user?.quotaModel?.bytes]);

  const totalUsedQuota = React.useMemo(() => {
    const quotaPercent = (userUsedQuota / userTotalQuota) * 100;
    return quotaPercent?.toFixed(1);
  }, [userTotalQuota, userUsedQuota]);
  const menuId = 'primary-search-account-menu';

  const renderMenu = React.useMemo(
    () => (
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
        <Nav>
          <Box sx={{ pr: 1 }}>
            <IconButton size="large" color="inherit">
              <Badge color="error">
                {!!picture ? (
                  <StyledAvatar
                    sx={{
                      bgcolor: 'background.primary',
                      border: '1px solid',
                      width: '20px',
                      height: '20px',
                      fontSize: '12px',
                    }}
                    src={
                      picture ? `data:image/png;base64,${picture}` : undefined
                    }
                  ></StyledAvatar>
                ) : (
                  <AvatarStyled
                    sx={{
                      bgcolor: 'background.primary',
                      border: '1px solid',
                      width: '20px',
                      height: '20px',
                      fontSize: '12px',
                    }}
                  >
                    {userFirstLetter}
                  </AvatarStyled>
                )}
              </Badge>
            </IconButton>
            <span className="icontxt"> {user?.userName} </span>
          </Box>
          <Box className="bt-1">
            <IconButton size="large" color="inherit">
              <Badge color="error">
                <DataUsageIcon className="materialiconcolor" />
              </Badge>
            </IconButton>
            <span className="icontxt">
              {' '}
              {userUsedQuota} GB {t.Navbar.used}{' '}
            </span>
          </Box>
          <Box className="bt-1" sx={{ minWidth: '200px' }}>
            {isAdmin ? (
              <>
                {location.pathname.includes('admin') ? (
                  <StyledLink
                    to="/workspace"
                    className={
                      !!user && user?.domainModel?.domainStatus === 'PENDING'
                        ? 'disabled-link'
                        : ''
                    }
                  >
                    <IconButton size="large" color="inherit">
                      <Badge color="error">
                        <WorkspacesIcon className="materialiconcolor" />
                      </Badge>
                    </IconButton>
                    <span className="icontxt"> {t.Navbar.Workspace} </span>
                  </StyledLink>
                ) : location.pathname.includes('workspace') ? (
                  <></>
                ) : (
                  <>
                    <Box className="bt-1" sx={{ width: '100% !important' }}>
                      <StyledLink
                        to="/workspace"
                        className={
                          !!user &&
                          user?.domainModel?.domainStatus === 'PENDING'
                            ? 'disabled-link'
                            : ''
                        }
                      >
                        <IconButton size="large" color="inherit">
                          <Badge color="error">
                            <WorkspacesIcon className="materialiconcolor" />
                          </Badge>
                        </IconButton>
                        <span className="icontxt"> {t.Navbar.Workspace} </span>
                      </StyledLink>
                    </Box>
                  </>
                )}
              </>
            ) : (
              <>
                {location.pathname.includes('workspace') ? (
                  <></>
                ) : (
                  <Box className="bt-1" sx={{ width: '100% !important' }}>
                    <StyledLink
                      to="/workspace"
                      className={
                        !!user && user?.domainModel?.domainStatus === 'PENDING'
                          ? 'disabled-link'
                          : ''
                      }
                    >
                      <IconButton size="large" color="inherit">
                        <Badge color="error">
                          <WorkspacesIcon className="materialiconcolor" />
                        </Badge>
                      </IconButton>
                      <span className="icontxt"> {t.Navbar.Workspace} </span>
                    </StyledLink>
                  </Box>
                )}
              </>
            )}
          </Box>
          <StyledLink
            to="/user-dashboard/"
            className={
              !!user && user?.domainModel?.domainStatus === 'PENDING'
                ? 'disabled-link'
                : ''
            }
          >
            <Box className="bt-1">
              <IconButton size="large" color="inherit">
                <Badge color="error">
                  <SettingIcon className="materialiconcolor" color="inherit" />
                </Badge>
              </IconButton>
              <span className="icontxt"> {t.Navbar.setting} </span>
            </Box>
          </StyledLink>
          <Box
            onClick={hadleOpen}
            className={
              !!user && user?.domainModel?.domainStatus === 'PENDING'
                ? 'disabled-link bt-1'
                : 'bt-1'
            }
          >
            <IconButton size="large" color="inherit">
              <Badge color="error">
                <FeedBackIcon className="materialiconcolor" />
              </Badge>
            </IconButton>
            <span className="icontxt"> FeedBack & Request </span>
          </Box>
          <Box onClick={logout} className="bt-1">
            <IconButton size="large" color="inherit">
              <Badge color="error">
                <LogoutIcon className="materialiconcolor" />
              </Badge>
            </IconButton>
            <span className="icontxt"> {t.Navbar.Logout} </span>
          </Box>
        </Nav>
      </ProfileMenu>
    ),
    [
      anchorEl,
      isMenuOpen,
      handleMenuClose,
      picture,
      userFirstLetter,
      user,
      userUsedQuota,
      t.Navbar.used,
      t.Navbar.Workspace,
      t.Navbar.setting,
      t.Navbar.Logout,
      isAdmin,
      location.pathname,
      hadleOpen,
      logout,
    ]
  );

  return (
    <>
      <ProgressAvatarWrapper>
        <QuotaProgress progress={totalUsedQuota}>
          {!!picture ? (
            <StyledAvatar
              aria-label="show more"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{ bgcolor: 'text.blueDark', width: '31px', height: '31px' }}
              src={picture ? `data:image/png;base64,${picture}` : undefined}
            ></StyledAvatar>
          ) : (
            <StyledAvatar
              aria-label="show more"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{ bgcolor: 'text.blueDark', width: '31px', height: '31px' }}
            >
              {userFirstLetter}
            </StyledAvatar>
          )}
        </QuotaProgress>
      </ProgressAvatarWrapper>
      {renderMenu}
      <FeedBackDialog open={openDialog} handleClose={handleClose} />
    </>
  );
});
