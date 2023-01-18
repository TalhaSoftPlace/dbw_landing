import styled from '@emotion/styled';
import { Box } from '@mui/system';

export const StyledSpan = styled.span`
  ${({ theme }) => `
        color: ${theme.palette.text.light};
    `};

`;

export const Wrapper = styled(Box)`
   padding-top:20px;
   text-align : end;
`;