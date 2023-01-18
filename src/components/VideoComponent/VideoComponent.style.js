import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Wrapper = styled(Box)`
  .videocomponent {
    padding: 15px;
  }
  img {
    border-radius: 5px;
  }
  .heading {
    ${({ theme }) => `
            color:${theme.palette.text.light};
            padding-bottom:15px;
         `}
  }
`;
