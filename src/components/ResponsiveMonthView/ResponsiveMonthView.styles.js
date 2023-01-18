import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Button } from '..';
export const Wrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding-inline: 16px;
  padding-block: 8px;

  ${({ theme }) => `
  @media (min-width: ${theme.breakpoints.values.md}px){
    display: none;
   }
  `}

  .new_event {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
    font-size: 12px;
    height: 35px;
    border-radius: 4px;
    padding-inline: 15px !important;
    width:95px;
    }
  `};
  }
`;
export const StyledButton = styled(Button)`
  text-transform: none;
  border-radius: 4px;
  height: 35px;
  font-weight: normal;
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
  padding-inline: 15px !important;
  width: 95px;
   }
  `};
`;
