import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
export const MenueIcon = styled(MenuIcon)`
  color: #fff;
`;

export const Menue = styled(Menu)`
  .MuiMenu-list {
    ${({ theme }) => `
        background-color: ${theme.palette.landingpage.background.primary};
        padding: 0px;
    `}
  }
  .MuiPaper-root {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      width: 60% !important;
      border-radius:12px;
      border: 1px solid ${theme.palette.landingpage.text.light};
    }
    `}
  }
  .b-b {
    ${({ theme }) => `
      @media (max-width: ${theme.breakpoints.values.md}px){
        border-bottom : 1px solid ${theme.palette.landingpage.text.light};
      }
    `}
  }
  .pl-25 {
    ${({ theme }) => `
      @media (max-width: ${theme.breakpoints.values.md}px){
        padding-left: 25px;
      }
    `}
  }
  .pl-12 {
    ${({ theme }) => `
      @media (max-width: ${theme.breakpoints.values.md}px){
        padding-left : 12px;
      }
    `}
  }
  a {
    text-decoration: none;
    position: relative;
    padding-inline: 10px;
    text-align: center;
    ${({ theme }) => `
  color: ${theme.palette.landingpage.text.light};
`}
  }
`;
export const Nav = styled(Box)`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 4%;
  padding-left: 16px;
  padding-right: 60px;
  padding-block: 27px;
  min-height: 50px;
  height: 50px;
  font-size: 15px;
  ${({ theme }) => `
    background-color: ${theme.palette.landingpage.background.primary};
    border-bottom: 1px solid ${theme.palette.landingpage.background.greyDark};

    @media (max-width: ${theme.breakpoints.values.md}px){
      
    }
    

    & a {
      @media (max-width: ${theme.breakpoints.values.md}px){

        text-align: center;
      }
    }
    .logo{
      margin-top:10px;
    }
  `}
`;

export const NavItems = styled(Box)`
  display: flex;
  gap: 12px;
  margin-left: auto;
  line-height:2;
  > a {
    text-decoration: none;
    position: relative;
    padding-inline: 10px;
    text-align: center;
    ${({ theme }) => `
    color: ${theme.palette.landingpage.text.light};
  `}
  }
  > a:hover {
    &:after {
      content: '';
      height: 4px;
      left: 0;
      right: 0;
      bottom: -10px;
      position: absolute;
      background: white;
      display: block;
      border-radius: 10px 10px 0px 0px;
    }
  }
`;

export const StyledLink = styled(Link)`
  ${({ theme }) => `
  text-decoration: none;
  `}
`;