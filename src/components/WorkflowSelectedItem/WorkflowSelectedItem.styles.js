import styled from '@emotion/styled';
import { Box } from '@mui/system';

export const Item = styled(Box)`
  height: 50px;
  padding: 16px;
  margin-right: 10px;
  border-radius: 5px;
  margin-top: 10px;
  justify-content: space-between;
  display: flex;

  ${({ theme }) => `
        background: ${theme.palette.background.dark};
   `};
`;
