import styled from '@emotion/styled';
import { TextField, Autocomplete } from '@mui/material';

export const TextFieldStyled = styled(TextField)`
    .MuiInput-root:before{
        ${({ theme }) => `
         color: ${theme.palette.text.primaryText};
        border-bottom: 3px solid ${theme.palette.background.tagsBorder} !important;
        `};
    }
    .MuiInput-root:after{
        border-bottom: none !important;
    }

`

export const EmailInputAutoComplete = styled(Autocomplete)`
    padding-left: 16px;
    max-height: 115px;
    overflow-y: auto;
    ${({ theme }) => `    
    color: ${theme.palette.text.primaryText} !important;
    @media (max-width: ${theme.breakpoints.values.md}px){
        padding-left: 0px;
    }
    `};
      
`