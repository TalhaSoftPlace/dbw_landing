import styled from '@emotion/styled';
import { Box } from '@mui/material';
export const Background = styled(Box)`
  ${({ theme }) => `
    background-color: ${theme.palette.background.primary};
  `}
  min-height: 100vh;
`;
