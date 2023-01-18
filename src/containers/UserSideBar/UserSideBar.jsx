import  { useCallback , useEffect} from 'react';
import {
  DrawerHeader,
  AppBar,
  Drawer,
  CloseIcon,
  Background,
  WorkSpace,
  ListStyled
} from './UserSideBar.styles';
import { UserSidebarMenuItems, AdminFooterItems } from '../../components';
import Box from '@mui/material/Box';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import { ReactComponent as OpenIcon } from '../../images/Toggle.svg';
import { MailBoxNav } from '../MailBoxNav';
import { useLocalization, useWindowResize } from '../../hooks';
import { useRecoilState } from 'recoil';
import { adminDrawerAtom } from '../../atoms';
import { useTheme } from '@mui/material';
export const UserSideBar = ({ children }) => {
  const { t } = useLocalization();

  const theme = useTheme();
  const [open, setOpen] = useRecoilState(adminDrawerAtom);
  const size = useWindowResize();

  const handleDrawerClose = useCallback(() => {
    setOpen(!open);
  }, [setOpen, open]);

  const mobileDrawerClose = useCallback(() => {
    if (size?.width < theme.breakpoints.values.md) {
      setOpen(false);
    }
  }, [setOpen, size, theme]);
  
  useEffect(()=>{
    mobileDrawerClose();
  },[mobileDrawerClose]);

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <AppBar position="fixed" open={open}>
        <MailBoxNav />
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader open={open}>
          <IconButton onClick={handleDrawerClose}>
            {open ? (
              size?.width > theme.breakpoints.values.sm ? (
                <OpenIcon />
              ) : (
                <></>
              )
            ) : (
              <CloseIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {open && (
          <WorkSpace className="workspace" to="/workspace">
            {t.DashboardNav.workSpace}
          </WorkSpace>
        )}
        <ListStyled onClick={mobileDrawerClose} sx={{ pt: 6 }}>
          <UserSidebarMenuItems open={open} />
        </ListStyled>
        <ListStyled sx={{ pt: 5 }} className="footerbottom">
          <AdminFooterItems mobileDrawerClose={mobileDrawerClose} open={open} />
        </ListStyled>
      </Drawer>
      <Background open={open}>{children}</Background>
    </Box>
  );
};
