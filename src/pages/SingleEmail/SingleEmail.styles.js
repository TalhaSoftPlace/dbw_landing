import styled from '@emotion/styled';
import { Box, IconButton } from '@mui/material';
export const Background = styled(Box)`
  ${({ theme }) => `
    background-color: ${theme.palette.background.dark};
  `}
  min-height: 100vh;
`;

export const SendButton = styled(IconButton)`
  position: fixed;
  bottom: 60px;
  right: 60px;

  ${({ theme }) => `
    background-color: ${theme.palette.background.blueLight} !important;
    color: #fff;
  `}
`;
export const StyledBox = styled(Box)`
  margin-top: 6px;
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
  height: 100vh;
  overflow: hidden;
  position: relative;
  width: 100vw;
  padding: 20px;
  ${({ theme }) => `
    background-color: ${theme.palette.background.primary};

  `}
  .closeBtn {
    display: none;
  }
`;
