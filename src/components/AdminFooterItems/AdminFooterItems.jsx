import { ListItemButton } from '@mui/material';
import React, { useMemo } from 'react';
import {
  ListItemTextStyled,
  MenuItemGrid,
  ListTextStyled,
  FooterIcon,
} from './AdminFooterItems.styles';
import { Link } from 'react-router-dom';
import { FeedBackDialog } from '../../containers';
const MenuItem = React.memo(
  ({ item, open, mobileDrawerClose, paddingtop = 8 }) => {

    const [openDialog, setOpenDialog] = React.useState(false);
    const hadleOpen = React.useCallback(() => {
      setOpenDialog(true);
    }, []);
    const handleClose = React.useCallback(() => {
      setOpenDialog(false);
    }, []);
    return (
      <MenuItemGrid item xs={12}>
        <ListItemButton
          onClick={mobileDrawerClose}
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
          <ListItemTextStyled
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'initial',
            }}
            paddingtop={paddingtop}
          >
            {item.icon}
          </ListItemTextStyled>
          <ListItemTextStyled
            primary={item.title}
            sx={{ opacity: open ? 1 : 0 }}
            paddingtop={paddingtop}
            onClick={hadleOpen}
          />
        </ListItemButton>
        <FeedBackDialog open={openDialog} handleClose={handleClose} />
      </MenuItemGrid>
    );
  }
);
const FooterItem = React.memo(({ item, open }) => {


  return (
    <MenuItemGrid item xs={12}>
      <ListItemButton
        component={Link}
        to={item.route}
        key={item.id}
        sx={{
          justifyContent: open ? 'initial' : 'initial',
          display: '-webkit-inline-box',
          px: 2.5,
          paddingBottom: '0px',
          paddingTop: '0px',
          height: '35px',
        }}
      >
        <ListTextStyled
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'initial',
          }}
        >
          {item.icon}
        </ListTextStyled>
        <ListTextStyled
          primary={item.title}
          sx={{ opacity: open ? 1 : 0, height: '30px' }}
          
        />
      </ListItemButton>
      
    </MenuItemGrid>
  );
});
export const AdminFooterItems = React.memo(
  ({ open, mobileDrawerClose, paddingtop = 8 }) => {
    const menuItems = useMemo(
      () => [
        {
          id: 1,
          title: 'Report an issue',
          route: '',
          icon: <FooterIcon />,
        },
      ],
      []
    );
    const SmenuItems = useMemo(
      () => [
        {
          id: 1,
          title: '2022 DeepBlueWork INC',
          route: '',
          icon: '©',
        },
      ],
      []
    );

    return (
      <>
        {menuItems.map((item, index) => (
          <MenuItem
            mobileDrawerClose={mobileDrawerClose}
            key={index + item}
            item={item}
            open={open}
            paddingtop={paddingtop}
          />
        ))}
        {SmenuItems.map((item, index) => (
          <FooterItem key={index} item={item} open={open} />
        ))}


      </>
    );
  }
);
