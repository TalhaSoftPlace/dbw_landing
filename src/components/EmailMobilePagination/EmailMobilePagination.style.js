import styled from '@emotion/styled';
import { Box } from '@mui/material';
export const PaginationLabel = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => `
        color: ${theme.palette.text.light};
        input {
            width: 50px;
            margin-inline: 6px;
            color: ${theme.palette.text.light};
            background-color: ${theme.palette.background.primary};
            border: 1px solid ${theme.palette.text.light};
            padding: 2px;
            
        }
`}
`;
export const PaginationBox = styled(Box)`
  ${({ theme }) => `
    background-color: ${theme.palette.background.primary};    
    
`}
`;
