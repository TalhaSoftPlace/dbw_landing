import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Background = styled(Box)`
  padding-top: 5%;
  min-height: calc(100vh - 86px);
  ${({ theme }) => `
    background-color: ${theme.palette.background.primary};
    @media (max-width: ${theme.breakpoints.values.sm}px){
      min-height: 100vh;
    }
    `}
`;

export const Wrapper = styled(Box)`
  margin: auto;
  max-width: 1000px;
  margin-top: 16px;
`;
