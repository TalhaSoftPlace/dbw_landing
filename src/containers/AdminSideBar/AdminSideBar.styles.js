import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box } from '@mui/material';
import { ReactComponent as OpenIcon } from '../../images/Toggle.svg';
import { Link } from 'react-router-dom';

const drawerWidth = 330;

export const Background = styled(Box, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: theme.palette.background.primary,
  width: '100%',
  overflow: 'hidden',
  overflowY: 'auto',
  height: '100vh',
  paddingTop: '50px',
  ...(open && {
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
    },
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
    },
  }),
  ...(!open && {
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
    },
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
    },
  }),
}));

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  background: theme.palette.background.sidebarbg,
  boxShadow: '0px 3px 6px #00000038',
  border: 'none',
});

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  background: theme.palette.background.sidebarbg,
  boxShadow: '0px 3px 6px #00000038',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  [theme.breakpoints.down('sm')]: {
    width: '40px',
  },
});

export const DrawerHeader = styled('div', {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  '& button': {
    position: 'fixed',
    top: '58px',
    ...(open && {
      left: '280px',
    }),
    ...(!open && {
      left: '8px',
    }),
    zIndex: 1,
  },
}));

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
  ...(!open && {
    [theme.breakpoints.down('sm')]: {
      left: '-10px',
      width: '40px',
    },
  }),
}));

export const ListItemTextStyled = styled(
  ListItemText,
  {}
)(({ theme }) => ({
  color: theme.palette.text.light,
  fontSize: '16px',
}));

export const ListItemIconStyled = styled(
  ListItemIcon,
  {}
)(({ theme }) => ({
  color: theme.palette.text.light,
}));
export const CloseIcon = styled(
  OpenIcon,
  {}
)(({ theme }) => ({
  transform: 'rotate(180deg)',
}));

export const WorkSpace = styled(Link)`
  padding: 8px 25px;
  ${({ theme }) => `
  background-color: ${theme.palette.background.blueLight};
  color: red;
  text-decoration: none;
  margin-top:25px;
  border-radius:3px;
  font-size:15px; 
   display: none;
    justify-content: center;
    width: 50%;
    margin-left: 25%;
  @media (max-width: ${theme.breakpoints.values.md}px){
    display:flex;
  }
`}
`;
