import styled from '@emotion/styled';
import { Box, Table } from '@mui/material';
export const StyledSpan = styled(Box)`
  ${({ theme }) => `
        color: ${theme.palette.text.light};
    `};
`;
export const SpanStyled = styled(Box)`
  ${({ theme }) => `
  color: ${theme.palette.text.primaryText};
    `};
`;

export const Wrapper = styled(Box)``;

export const StyleTable = styled(Table)`
  width:100%;
  font-size:16px;
`;
export const StyleTableHeading = styled.th`
  width:100%;
  font-size:16px;
`;
export const StyleTableRow = styled.tr`
  width:100%;
  font-size:16px;
`;
export const Wrappermodal = styled(Box)`
background: white;
overflow:auto;
  ${({ theme }) => `
        max-width: 800px;
        height:700px;
        color: ${theme.palette.text.primaryText};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); 
        box-shadow: 24;
        padding-left: 5px;
        padding-right:0px;
        padding-bottom:20px;
        border-radius:10px;
        font-family: 'Roboto', sans-serif !important;
        @media (max-width: ${theme.breakpoints.values.lg}px){
          max-width: 800px;
          width: 90%;
          height:500px;
          overflow:auto;
        }
    `};
  .invoice-view {
    max-width: 800px;
    overflow: auto;
    ${({ theme }) => `
    color: ${theme.palette.text.primaryText};
        background-color: ${theme.palette.email.text.light};
        border-radius:10px;
        height:100%;
        width: 100%;
        padding:20px;
        padding-right:0px;
        padding-top:15px;
       `}
  }
  .invoice-data {
    display: flex;
    justify-content: space-between;
    padding-block: 5px;

  }
  .invoice-datatotal {
    display: flex;
    justify-content: space-between;
    padding-block: 5px;
    ${({ theme }) => `
        border-bottom: 1px solid ${theme.palette.background.textFieldBorder};
       `}
    
  }
  .invoice-data-heading{
    font-size::25px;
    font-weight:500;
  }
  .invoice-table{
    ${({ theme }) => `
    color: ${theme.palette.text.primaryText};
        border-radius:10px;
        border: 2px solid ${theme.palette.background.textFieldBorder};
       `}
       padding-block:5px !important;
  }
  .invoice-tableBox{
    overflow-y:auto;
    overflow-x:hidden;
    ${({ theme }) => `
    color: ${theme.palette.text.primaryText};
        border-radius:10px;
        height:400px;
        border: 2px solid ${theme.palette.background.textFieldBorder};
       `}
       padding-block:5px !important;
  }
  .invoiceTotal{
    width:200px;
    padding:20px;
    ${({ theme }) => `
    color: ${theme.palette.text.primaryText};
     border-radius:10px;
     border: 2px solid ${theme.palette.background.textFieldBorder};
    `}
    padding-block:5px !important;
  }
`;
