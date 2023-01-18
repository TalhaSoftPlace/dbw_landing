import { Box, Grid, Select } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
export const SidePanel = styled(Box)`
  height: calc(100vh - 58px);
  position: relative;
  width: 340px;
  overflow-y: scroll;
  flex-grow: 0;
  ${({ theme }) => `
    background-color: ${theme.palette.background.dark};
 
  `};

  .new_event {
    font-weight: 300;
    font-size: 14px;
    height: 40px;
    border-radius: 4px;
    padding-inline: 5px !important;
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
`;

export const SelectStyled = styled(Select)`
  width: 100%;
  height: 40px;
  ${({ background, caretcolor, theme }) => `
  background-color: ${background};

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
    padding-block: 4px;
    padding-inline: 10px;
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
  ${({ theme }) => `
  text-decoration: none;
  `}
`;
export const Wrapper = styled(Box)`
  .new_notes {
    font-weight: 300;
    font-size: 14px;
    border-radius: 4px;
    padding-inline: 5px !important;
  }
`;
