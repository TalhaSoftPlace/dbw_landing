import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import { Box } from '@mui/system';

export const BillingStyledCard = styled(Card)`
  ${({ theme }) => `
    text-align:center;
    background-color: ${theme.palette.background.primary};
    
    `}
  border: 1px solid #9AABC9;
  height: 100%;
  p {
    ${({ theme }) => `
        color: ${theme.palette.text.light};
        font-size: 18px;
        font-weight: 300;
      `}
  }
  .linkstyle {
    text-decoration: none;
  }
`;
export const Heading = styled(Box)`
  font-size: 36px;
  ${({ theme }) => `
      color: ${theme.palette.text.light};
    @media (max-width: ${theme.breakpoints.values.lg}px){
      font-size:24px;
    }
    @media (max-width: ${theme.breakpoints.values.xl}px){
      font-size:30px;
    }
    `}
`;
