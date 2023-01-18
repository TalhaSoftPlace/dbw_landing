import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Wrapper = styled(Box)`
  ${({ theme }) => `
  background-color: ${theme.palette.background.primary};
  @media (max-width: ${theme.breakpoints.values.md}px){
    padding-left:5px;
    padding-right:5px;
  }
  button.new {
    font-weight: 300;
    font-size: 14px;
    height: 40px;
    width: 200px;
    border-radius: 4px;
    @media (max-width: ${theme.breakpoints.values.lg}px){
      font-size: 12px;
      width: 150px;
    }
    @media (max-width: ${theme.breakpoints.values.md}px){
      font-size: 12px;
      height: 40px;
      width: 150px;
      margin-right: 6px;
    }
  }
  .workspaceactionbar{
    display:flex;
    flex-direction: row;
    -webkit-flex-wrap: nowrap; 
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    padding-block:5px;
    padding-inline:8px;
    @media (max-width: ${theme.breakpoints.values.md}px){
      padding-inline:0px;
      }
  }
`}
`;
