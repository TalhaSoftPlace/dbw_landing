import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { ReactComponent as FooterIcons } from '../../images/footerIcon.svg';
export const ListItemTextStyled = styled(
  ListItemText,
  {}
)(({ theme, paddingtop }) => ({
  color: theme.palette.text.grey,
  fontSize: '15px',
  paddingTop: `${paddingtop}rem`,
}));
export const ListTextStyled = styled(
  ListItemText,
  {}
)(({ theme }) => ({
  color: theme.palette.text.grey,
  fontSize: '13px',
}));
export const MenuItemGrid = styled(
  Grid,
  {}
)(({ theme }) => ({
  '.MuiTypography-body1:not(.time)': {
    fontSize: '16px',
  },
  '&.active': {
    background: '#202641',
  },
}));
export const FooterText = styled(ListItemText)`
  font-size: 13px;
  padding-left: 20px;
  ${({ theme }) => `
  
        color: ${theme.palette.text.blueLight};
        `}
  .MuiTypography-body1:not(.time) {
    font-size: 16px;
  }
`;

export const FooterIcon = styled(FooterIcons)`
  path{
    ${({ theme }) => `
        fill: ${theme.palette.text.light};
    `}
  }
`;