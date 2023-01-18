import styled from '@emotion/styled';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    ${({ theme }) => `
    background-color: ${theme.palette.background.primary};
    border-radius : 5px;
    padding-inline:15px;
    padding: 0;
    ul{
      li{
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 25px;
        padding-right: 25px;
      }
    }
    `}
  }
  .contextmenu {
    ${({ theme }) => `
    color: ${theme.palette.text.light};
    `}
  }
`;


export const StyledMenuItem = styled(MenuItem)`
  ${({ theme }) => `
    border-bottom:1px solid ${theme.palette.background.dark};
    font-weight: 300;
  `}
  &.delete{
    border-bottom:none;
    ${({ theme }) => `
      color: ${theme.palette.text.error};
      font-weight: 500;
    `}
  }
`;
