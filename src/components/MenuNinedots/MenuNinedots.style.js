import styled from '@emotion/styled';
import { Box, Menu } from '@mui/material';
import { ReactComponent as NineDots } from '../../images/NineDotsIcon.svg';
import { Link } from 'react-router-dom';
export const Nav = styled(Box)`
  align-items: center;
  width: 200px;
  padding-block: 1px;
  font-size: 22px;
  border-radius: 5px;
  ${({ theme }) => `
  border: 1px solid ${theme.palette.text.greyLight};
  background-color: ${theme.palette.background.primary};

    flex-direction: column-reverse;
    align-items: start;

    .iconcolor{
    }
    .materialiconcolor{
      color: ${theme.palette.text.light};
    }
    .icontxt{
      font-size:15px;
      color: ${theme.palette.text.light};
      display : inline-flex !important;
      font-family: 'Roboto', sans-serif !important;
    }
    .profile{
      padding-left:10px;
      padding-top: 10px;
    }
    .bt-1{
        border-top: 1px solid ${theme.palette.text.greyLight};
    }
    .linkstyle{
      text-decoration: none;
    }
  
`}
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  border-radius: 5px;
`;
export const ProfileMenu = styled(Menu)`
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lg}px){
      display: flex;
  }
`}
  background: none;
  ul {
    padding-top: 0px;
    padding-bottom: 0px;
    background: none;
  }
`;

export const NineDotsIcon = styled(NineDots)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  ${({ theme }) => `
  color: ${theme.palette.email.text.light} !important;
  * {
      fill: ${theme.palette.email.text.light};
    }
`}
`;
export const Menulist = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: 8px;
  width: 100% !important;
  text-decoration: none;
  ${({ theme }) => `
    color: ${theme.palette.text.light} !important;
    &.active {
    color: ${theme.palette.text.light} !important;
    background-color: ${theme.palette.background.blueLight};
  }
  a{
    text-decoration: none;
  }
    `};
`;
