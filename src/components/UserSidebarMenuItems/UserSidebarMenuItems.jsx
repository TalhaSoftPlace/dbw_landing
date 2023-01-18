import {  Tooltip } from '@mui/material';
import React, { useMemo } from 'react';
import {
  ListItemTextStyled,
  MenuItemGrid,
  SettingIcon,
  DomainSettingsIcon,
  BillingIcon,
  AdminIcon,
  EmailGroupIcon,
  ListItemButtons,
  RulesIcon
} from './UserSidebarMenuItems.styles';
import { Link, useLocation } from 'react-router-dom';

export const MenuItem = React.memo(({ item, open }) => {
  const location = useLocation();
  const isActive = useMemo(
    () => location.pathname.includes(item.route),
    [location, item]
  );
  return (
    <MenuItemGrid className={isActive ? 'active' : ''} item xs={12}>
      <ListItemButtons
        component={Link}
        to={item.route}
        key={item.id}
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'initial',
          display: '-webkit-inline-box',
          px: 2.5,
          paddingBottom: '0px',
          paddingTop: '0px',
        }}
      >
        <Tooltip title={item?.title}>
          <ListItemTextStyled
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'initial',
            }}
          >
            {item.icon}
          </ListItemTextStyled>
        </Tooltip>
        <ListItemTextStyled
          primary={item.title}
          sx={{ opacity: open ? 1 : 0 }}
        />
      </ListItemButtons>
    </MenuItemGrid>
  );
});

export const UserSidebarMenuItems = React.memo(({ open }) => {
  const menuItems = useMemo(
    () => [
      {
        id: 1,
        title: 'General Setting',
        route: '',
        icon: <SettingIcon  className="iconcolor" />,
      },
      {
        id: 2,
        title: 'Change Password',
        route: 'change-password',
        icon: <DomainSettingsIcon />,
      },
      {
        id: 3,
        title: 'Auto-reply',
        route: 'auto-reply',
        icon: <BillingIcon />,
      },
      {
        id: 4,
        title: 'Skin Theme',
        route: 'skin',
        icon: <AdminIcon />,
      },
      {
        id: 5,
        title: 'Email Group',
        route: 'email-group',
        icon: <EmailGroupIcon />,
      },
      {
        id: 6,
        title: 'Rules',
        route: 'rules',
        icon: <RulesIcon />,
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
