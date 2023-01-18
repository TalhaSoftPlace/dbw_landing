import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Wrapper = styled(Box)`
  display: flex;
  cursor: pointer;
  gap: 6px;
  max-width: 600px;
  user-select: none;
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      max-width: 200px;
    }
    `}
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.sm}px){
      max-width: 150px;
    }
    `}
  position: relative;
  overflow: hidden;
  .icon {
    height: 20px;
    width: 20px;
  }
  .text {
    max-width: calc(100% - 26px);
    overflow: hidden;
    max-height: 20px;
    cursor: pointer;
    text-overflow: ellipsis;
  }
`;
