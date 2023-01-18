import { Box, Grid, Select } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
export const SidePanel = styled(Box)`
  height: calc(100vh - 58px);
  position: relative;
  max-width: 340px;
  flex-grow: 0;
  ${({ theme }) => `
    background-color: ${theme.palette.background.sidebarbg}; 
    border-right:2px solid ${theme.palette.email.text.calendarBorder};
    @media (max-width: ${theme.breakpoints.values.md}px){
      height: calc(100vh - 117px);
      max-width: 100%;
      overflow: hidden;
      display:none;
    }
  `};

  .new_event {
    font-weight: 300;
    font-size: 14px;
    height: 40px;
    border-radius: 4px;
    padding-inline: 5px !important;

    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
    font-size: 12px;
    height: 40px;
    border-radius: 4px;
    padding-inline: 5px !important;
    font-weight: normal;
    }
  `};

  .
  }


  .notes {
    ${({ theme }) => `
    font-weight: 300;
    font-size: 14px;
    height: 40px;
    border-radius: 4px;
    padding-inline: 5px !important;
    
  `};
  }

  .mobileview{
      
     ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      display:none;
    }
    
  `};
  }
`;

export const SelectStyled = styled(Select)` 

${({ theme }) => `
  color: ${theme.palette.text.light};
`};
.css-6hp17o-MuiList-root-MuiMenu-list {
  max-width: 308px !important;
  overflow-x:auto !important;
  ${({ theme }) => `
  border: 1px solid ${theme.palette.text.primary};
  
`};
}
  width: 100%;
  height: 40px;
  ${({ background, caretcolor, theme }) => `
  background-color: ${background};
  color: ${theme.palette.text.light};
  svg{
    color: ${caretcolor};
  }

  .MuiOutlinedInput-input.MuiInputBase-input{
    color: ${caretcolor};
    font-weight: 300;
    font-size: 14px;
    min-height: 0;
    border-radius:4px;
    @media (max-width: ${theme.breakpoints.values.md}px){
      font-weight: normal;
      font-size: 13px;
      border: 1px solid ${theme.palette.text.blueLight};
      height: 28px;
    padding-block: 4px;
    padding-inline: 7px;
    }
  }
`};
`;

export const DottedHr = styled.hr`
  width: 100%;
  ${({ theme }) => `
  border: 3px dotted ${theme.palette.text.unfocusedDates};
  border-style: none none dotted;
`};
`;
export const NormalHr = styled.hr`
  width: 100%;
  ${({ theme }) => `
  border: 1px solid ${theme.palette.text.primary};
`};
`;

export const SidebarFooter = styled(Grid)`
  bottom: 0px;
  width: 100%;
  position: absolute;
`;

export const StyledLink = styled(Link)`
  ${() => `
  text-decoration: none;
  `}
`;
export const SidePanelMobile = styled(Box)`
  ${({ theme }) => `
    display:none;
    background-color: ${theme.palette.background.sidebarbg}; 
    @media (max-width: ${theme.breakpoints.values.md}px){
      height: calc(100vh - 117px);
      max-width: 100%;
      width: 100%;
      overflow: hidden;
      display:flex;
      justify-content:center;
    }
  `};
`;
