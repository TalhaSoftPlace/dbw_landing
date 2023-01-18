import styled from '@emotion/styled';
import { Stack } from '@mui/material';

export const StyledStack = styled(Stack)`
  align-items: flex-end;
  justify-content: flex-start;
  position: absolute;
  bottom: 14px;
  padding-right: 130px;
  width: 100vw;
  overflow: hidden;
  height: 100vh;
  padding: 6px 120px 0px 6px;
  pointer-events: none;
  z-index: 10;
  * {
    pointer-events: all;
  }
`;
