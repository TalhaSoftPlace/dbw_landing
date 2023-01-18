
import React, { useMemo , useCallback } from 'react';
import {
  ListItemTextStyled,
  MenuItemGrid,
  StyledBox,
  ListItemButtonStyled,
  SettingIcon,
  OrgSchemaIcon,
  HomeIcon,
  DomainSettingsIcon,
  UserGroupIcon,
  BillingIcon,
  BusinessRuleIcon,
  WorkFlowIcon,
  FeedBackIcon

} from './AdminMenuItems.styles';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { FeedBackDialog } from '../../containers';
import {  Tooltip } from '@mui/material';
export const MenuItem = React.memo(({ item, open }) => {
  const location = useLocation();
  const { user } = useAuth();
  const isActive = useMemo(
    () => location.pathname.includes(item.route),
    [location, item]
  );
  const [openDialog, setOpenDialog] = React.useState(false);
  const hadleOpen = React.useCallback(() => {
    setOpenDialog(true);
  }, []);
  const handleClose = React.useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleClick = useCallback(()=>{
    if(item?.dialog === 'true'){
      hadleOpen();
    }
  },[hadleOpen, item?.dialog])
  return (
    <>
    <StyledBox>
      <MenuItemGrid className={isActive ? 'active' : ''} item xs={12}>
        <ListItemButtonStyled
          className={
            !!user &&
            user?.domainModel?.domainStatus === 'PENDING' &&
            item?.route !== 'domain-settings' &&
            item?.route !== 'dashboard'
              ? 'disabled-link'
              : ''
          }
          component={Link}
          to={item?.route}
          key={item?.id}
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'initial',
            display: '-webkit-inline-box',
            px:2.5,
            paddingBottom: '0px',
            paddingTop: '0px',
          }}
          onClick={handleClick}
        >
          <Tooltip title={item?.title}>
            <ListItemTextStyled
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'initial',
              }}
              className={
                !!user &&
                user?.domainModel?.domainStatus === 'PENDING' &&
                item?.route !== 'domain-settings' &&
                item?.route !== 'dashboard'
                  ? 'disabled-link'
                  : ''
              }
            >
              {item?.icon}
            </ListItemTextStyled>
          </Tooltip>
          <ListItemTextStyled
            primary={item?.title}
            sx={{ opacity: open ? 1 : 0 }}
            className={
              !!user &&
              user?.domainModel?.domainStatus === 'PENDING' &&
              item?.route !== 'domain-settings' &&
              item?.route !== 'dashboard'
                ? 'disabled-link'
                : ''
            }
          />
        </ListItemButtonStyled>
      </MenuItemGrid>
    </StyledBox>
    <FeedBackDialog open={openDialog} handleClose={handleClose} />
    </> 
 );
});

export const AdminMenuItems = React.memo(({ open }) => {
  const menuItems = useMemo(
    () => [
      {
        id: 1,
        title: 'Home',
        route: 'dashboard',
        icon: <HomeIcon />,
      },
      {
        id: 2,
        title: 'Domain Settings',
        route: 'domain-settings',
        icon: <DomainSettingsIcon />,
      },
      {
        id: 3,
        title: 'Organization Chart',
        route: 'orgchart',
        icon: <OrgSchemaIcon />,
      },
      {
        id: 4,
        title: 'Users & Groups',
        route: 'users-and-groups/users',
        icon: <UserGroupIcon />,
      },
      {
        id: 5,
        title: 'Company Settings',
        route: 'company-settings',
        icon: <SettingIcon />,
      },
      {
        id: 6,
        title: 'Billing',
        route: 'billing',
        icon: <BillingIcon />,
      },
      {
        id: 7,
        title: 'Business Rules',
        route: 'rules',
        icon: <BusinessRuleIcon />,
      },
      {
        id: 8,
        title: 'Workflow Management',
        route: 'work-flow',
        icon: <WorkFlowIcon  sx={{width:'20px'}}/>,
      },
      {
        id: 9,
        title: 'Feedbacks & Requests',
        route: 'feed-back',
        dialog:'true',
        icon: <FeedBackIcon />,
      },
    ],
    []
  );
  return ( 
    <>
      {menuItems.map((item, index) => (
        <MenuItem key={index} item={item} open={open} />
      ))}
    </>
  );
});
