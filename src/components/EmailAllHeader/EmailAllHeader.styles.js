import styled from '@emotion/styled';
import { Box } from '@mui/material';
export const StyledTable = styled.table`
${({ theme }) => `
      color: ${theme.palette.email.text.primaryText} !important;
    `}
  font-family: 'Roboto', sans-serif !important;
  margin: 10px;
  th {
    text-align: right;
    padding-right: 10px;
    vertical-align: top;
  }
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lg}px){
      width: 400px;
      font-size: 12px !important;
    }
    @media (max-width: ${theme.breakpoints.values.sm}px){
      width: 380px;
    }
    `}
`;

export const Wrapper = styled(Box)`
  overflow-y: auto;
  height: 300px;
  width: 888px;
  overflow-x: auto;
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lg}px){
      width: 500px;
    }
    @media (max-width: ${theme.breakpoints.values.sm}px){
      width: 380px;
    }
    `}
`;
