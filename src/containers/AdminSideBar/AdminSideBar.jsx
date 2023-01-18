import * as React from 'react';
import {
  DrawerHeader,
  AppBar,
  Drawer,
  CloseIcon,
  Background,
} from './AdminSideBar.styles';
import {
  AdminBreadcrumbs,
  AdminMenuItems,
  AdminFooterItems,
} from '../../components';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { ReactComponent as OpenIcon } from '../../images/Toggle.svg';
import { useWindowResize } from '../../hooks';
import { useRecoilState } from 'recoil';
import { adminDrawerAtom } from '../../atoms';
import { useTheme } from '@mui/material';
import { MailBoxNav } from '../MailBoxNav';
export const AdminSideBar = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = useRecoilState(adminDrawerAtom);
  const size = useWindowResize();
  const handleDrawerClose = React.useCallback(() => {
   
    if (size?.width >= theme.breakpoints.values.sm) {
      setOpen(!open);
    }else{
      setOpen(false);
    }
  }, [size?.width, theme.breakpoints.values.sm, setOpen, open]);
  const mobileDrawerClose = React.useCallback(() => {
    if (size?.width < theme.breakpoints.values.md) {
      setOpen(false);
    }
  }, [setOpen, size, theme]);

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <AppBar position="fixed" open={open}>
        <MailBoxNav />
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader open={open}>
          <IconButton onClick={handleDrawerClose} sx={{display:{ xs:'none', sm:'flex', md:'flex'}}}>
            {open ? (
                <OpenIcon />
            ) : (
              <CloseIcon />
            )}
          </IconButton>
        </DrawerHeader>
        
        <List onClick={mobileDrawerClose} sx={{ pt: 6 }}>
          <AdminMenuItems open={open} />
        </List>
        <List sx={{ pt: 5, display:{ xs:'none', sm:'block', md:'block'} }}>
          <AdminFooterItems mobileDrawerClose={mobileDrawerClose} open={open} />
        </List>
      </Drawer>
      <Background open={open}>
        <AdminBreadcrumbs />
        {children}
      </Background>
    </Box>
  );
};
