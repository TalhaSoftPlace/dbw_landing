import styled from '@emotion/styled';
import { Box, Select } from '@mui/material';

export const StyledSelect = styled(Select)`
  font-size: 15px;
  * {
    ${({ theme }) => `
      color: ${theme.palette.text.light} !important;
      @media (max-width: ${theme.breakpoints.values.lg}px){
        font-size:16px !important;
      }
  `}
  }
`;

export const IconGlobeStyled = styled(Box)`
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.lg}px){
    margin-top: 4px;
    width: 30px;
    height: 30px;
  }
  @media (max-width: ${theme.breakpoints.values.md}px){
    margin-top: -10px;
    margin-right: 5px;
    width: 15px;
    height: 15px;
  }
  @media (max-width: ${theme.breakpoints.values.sm}px){
    margin-top: -10px;
    margin-right: 5px;
    width: 15px;
    height: 15px;
  }
`}
`;
