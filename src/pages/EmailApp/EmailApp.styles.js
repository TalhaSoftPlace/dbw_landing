import styled from '@emotion/styled';
import { Box, IconButton } from '@mui/material';

export const SendButton = styled(IconButton)`
  position: fixed;
  bottom: 60px;
  right: 60px;

  ${({ theme }) => `
    background-color: ${theme.palette.email.background.blueLight} !important;
    color: ${theme.palette.email.text.light}
  `}
`;
export const StyledBox = styled(Box)`
  ${({ theme }) => `
  border-top: 1px solid ${theme.palette.email.background.dark};
  `}
  width: 100%;
  height: 100%;
  position: relative;

  .split-flex {
    min-height: calc(100vh - 115px);
    display: flex;
    flex-direction: row;
  }
  .gutter.gutter-horizontal {
    cursor: ew-resize;
    ${({ theme }) => `
    width: 6px !important;
    background-color: ${theme.palette.background.dark};
    &:hover {
      background-color: ${theme.palette.background.blueLight};
     }
  `}
  }
`;
export const EmailWrapper = styled(Box)`
  ${({ theme }) => `
      background-color: ${theme.palette.background.primary};
      padding-inline:2px;
      width: 100vw;
      position:absolute;
      top:5vh;
      left:0px;
      height: calc(100vh - 71px);
       
    
  `}
`;
export const EmailFullWapper = styled(Box)`
  ${({ theme }) => `
      
      height: calc(100vh - 115px);
       
    
  `}
`;
