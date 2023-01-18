import styled from '@emotion/styled';
import { Box, TextField } from '@mui/material';

export const BoxStyled = styled(Box)`
  ${({ theme }) => `
        background: ${theme.palette.background.light};
        border: 1px solid ${theme.palette.background.lightGrey};
        padding: 0px 20px;
        margin-top: 0px;
        max-height: 125px;
        height: 125px;
        width:100%;
        overflow-y: auto;
        border-radius: 5px;
    `}
  .css-1sxpz3y * {
    font-family: 'Roboto', sans-serif !important;
    border-color: #dce3ea !important;
  }
`;

export const StyledSpan = styled(Box)`
  ${({ theme }) => `
        color: ${theme.palette.text.greyLight};
        padding-top: 0px;
        padding-bottom: 0px;
        font-weight: 400;
    `};
`;
export const StyledTh = styled(Box)`
  ${({ theme }) => `
        color: ${theme.palette.text.blueLight};
        font-size: 16px;
        font-weight: 500;
        padding-top: 8px;
        padding-bottom: 8px;
        font-weight: 500;
    `};

`;
export const TextFieldStyle = styled(TextField)`
  ${({ theme }) => `
        font-weight: 400;
        width:100%;
        min-width:200px;
        input{ 
          color: ${theme.palette.text.greyLight};
          background-color: ${theme.palette.email.text.light};
          height:35px;
          padding-block:0px;
          padding-inline:10px; s
          border:none !important;
          line-height:1.5;
        }
        &.readonly {
          pointer-events: none;
          opacity: 0.8;
        }

    `};
`;
