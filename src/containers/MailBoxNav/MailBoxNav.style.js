import styled from '@emotion/styled';
import { Box, Drawer, List } from '@mui/material';
import Menu from '@mui/material/Menu';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
export const Nav = styled(Box)`
  align-items: center;
  gap: 4%;
  font-size: 15px;

  ${({ theme }) => `
  background-color: ${theme.palette.background.blueLight};
`}
  .navtoolbar {
    padding-left: 0px;
    padding-right: 16px;
    min-height: 50px !important;
    height: 50px;
    ${({ theme }) => `
      @media (max-width: ${theme.breakpoints.values.lg}px){
        min-height: 40px !important;
        height: 40px;
      }
    `}
  }
  .searchItem {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .IconColorChange {
    color: #ccc;
  }

  span {
    font-size: 13px;
  }
  .navitem {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      display:none;
    }
    `}
  }
  .disabled-link {
    pointer-events: none;
    ${({ theme }) => `
    color: ${theme.palette.text.greyLight} !important;
    `}
  }

  .searchItem {
    display: flex;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.sm}px){
      display:none;
    }
    

    `}
  }
  .logo {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-left: 5px;
  }
`;

export const MenuBarWrapper = styled(Box)`
  //Mailbox Nav Designed
  .tabs li {
    float: none;
    position: relative;
    text-align: center;
    display: flex;
    justify-content: center;
  }
  .tabs a {
    float: left;
    padding: 0px 0px;
    text-decoration: none;

    /* Default colors */
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lg}px){
      padding: 0px 0px;
    }
    background-color: ${theme.palette.background.blueLight};
    color: ${theme.palette.background.light};
    `}

    /* Only round the top corners */
    -webkit-border-top-left-radius: 15px;
    -webkit-border-top-right-radius: 15px;
    -moz-border-radius-topleft: 15px;
    -moz-border-radius-topright: 15px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
  .tabs .active {
    /* Highest, active tab is on top */
    z-index: 3;
    margin-top: 5px;
    padding-top: 11px;
    ${({ theme }) => `
    background-color: ${theme.palette.email.background.primary};
    color: ${theme.palette.email.text.activeText} !important;
    `}
  }
  .tabs .active a {
    /* Colors when tab is active */
    ${({ theme }) => `
    background-color: ${theme.palette.email.background.primary};
    color: ${theme.palette.email.text.activeText} !important;
    `}
  }
  .tabs:not(.compose) li {
    &:before,
    &:after,
    a:before,
    a:after {
      position: absolute;
      bottom: 0;
    }
  }
  /* Only the first, last, and active
     tabs need pseudo elements at all */
  .tabs li:last-child:after,
  .tabs li:last-child a:after,
  .tabs li:first-of-type:before,
  .tabs li:first-of-type a:before,
  .tabs .active:after,
  .tabs .active:before,
  .tabs .active a:after,
  .tabs .active a:before {
    content: '';
  }
  .tabs .active:before,
  .tabs .active:after {
    ${({ theme }) => `
    background-color: ${theme.palette.background.primary};
    `}
    z-index: 1;
  }
  /* Squares */
  .tabs li:before,
  .tabs li:after {
    ${({ theme }) => `
    background-color: ${theme.palette.background.blueLight};
    `}
    width: 10px;
    height: 10px;
  }
  .tabs li:before {
    left: -10px;
  }
  .tabs li:after {
    right: -10px;
  }
  /* Circles */
  .tabs li a:after,
  .tabs li a:before {
    width: 20px;
    height: 20px;
    /* Circles are circular */
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    ${({ theme }) => `
    background-color: ${theme.palette.background.blueLight};
    `}

    /* Circles over squares */
    z-index: 2;
  }
  .tabs .active a:after,
  .tabs .active a:before {
    ${({ theme }) => `
    background-color: ${theme.palette.background.blueLight};
    `}
  }
  /* First and last tabs have different
     outside color needs */
  .tabs li:first-of-type.active a:before,
  .tabs li:last-child.active a:after {
    ${({ theme }) => `
    background-color: ${theme.palette.background.blueLight};
    `}
  }
  .tabs li a:before {
    left: -20px;
  }
  .tabs li a:after {
    right: -20px;
  }
`;

export const WorkSpace = styled.li`
  padding: 16px 4px;
  border-radius: 15px 15px 0px 0px;
  font-size: 15px;
  min-width: 115px;
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.lg}px){
    padding: 12px 4px;
  }
    `}
`;

export const WorkSpaceWrapper = styled.ul`
  display: inherit;
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

export const ListMore = styled(List)`
  padding: 0px;
  ${({ theme }) => `
  border-top: 1px solid ${theme.palette.text.light};
`}

  .MuiListItemButton-root {
    padding: 8px 10px;
  }
  .MuiListItemIcon-root {
    min-width: 40px !important;
  }
  li {
    ${({ theme }) => `
    border-top: 1px solid ${theme.palette.text.light};
    `}
  }
`;
export const NavMenu = styled(Menu)`
  ul.MuiList-root {
    padding-top: 0px;
    padding-bottom: 0px;
  }
  .MuiPaper-elevation {
    ${({ theme }) => `
  background-color: ${theme.palette.background.dark};
  color: ${theme.palette.text.light};
  border: 1px solid;
  @media (max-width: ${theme.breakpoints.values.lgx}px){
    width: 200px !important;
  }
  `}
    top: 60px !important;
  }
  li {
    padding: 0px;
  }
  .MuiPaper-root {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      background : ${theme.palette.text.dark};
    }
    `}
  }
  svg {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lgx}px){
      color : ${theme.palette.text.light};
    }
    `}
  }
  .navitems {
    text-align: center;
    width: 100%;
    ${({ theme }) => `

    @media (max-width: ${theme.breakpoints.values.lg}px){
      text-align:start;
      padding-left:48px;
      font-size:15px;
    }
    @media (max-width: ${theme.breakpoints.values.md}px){
      color : ${theme.palette.text.light};
      padding-top: 8px;
      padding-bottom: 8px;
      font-size:16px;
    }
    @media (max-width: ${theme.breakpoints.values.lgx}px){
      color : ${theme.palette.text.light};
      padding-top: 8px;
      padding-bottom: 8px;
      font-size:16px;
    }

    `}
  }
`;

export const MobileDrawer = styled(Drawer)`
  width: 250px;
  flex-shrink: 0;
  .MuiDrawer-paper {
    width: 250px;
    ${({ theme }) => `
    background-color: ${theme.palette.background.primary} !important;
    `}
  }

  .materialiconcolor {
    ${({ theme }) => `
    color: ${theme.palette.text.light} !important;
    `}
  }

  .iconcolor {
    ${({ theme }) => `
    fill: ${theme.palette.text.light} !important;
    `}
  }

  .icontxt {
    font-family: 'Roboto', sans-serif !important;
    ${({ theme }) => `
    color: ${theme.palette.text.light} !important;
    `}
  }
  .colorfullmenu {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    width: 100% !important;
    ${({ theme }) => `
      color: ${theme.palette.text.light} !important;
    border-top: 5px solid ${theme.palette.background.primary};
    `}
  }
`;

export const ProgressAvatarWrapper = styled(Box)`
  height: 40px;
  width: 40px;
  cursor: pointer;
  ${({ theme }) => `
@media (min-width: ${theme.breakpoints.values.md}px) and (max-width: ${theme.breakpoints.values.lg}px){
  width: 65px;
}
@media (min-width: ${theme.breakpoints.values.sm}px) and (max-width: ${theme.breakpoints.values.md}px){
  width: 90px;
}
`}
`;

export const Menulist = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 100% !important;
  text-decoration: none;
  ${({ theme }) => `
      color: ${theme.palette.text.light} !important;
    border-top: 5px solid ${theme.palette.background.primary};
    background-color: ${theme.palette.background.hoverdark};
    &.active {
      padding-top:50px;
    color: ${theme.palette.text.light} !important;
    background-color: ${theme.palette.background.blueLight};
    
  }
  a{
    text-decoration: none;
  }
    `}
`;

export const NineDotsIcon = styled(AppsRoundedIcon)`
  width: 30px;
  height: 30px;
  ${({ theme }) => `
  color: ${theme.palette.text.light} !important;
`}
`;
