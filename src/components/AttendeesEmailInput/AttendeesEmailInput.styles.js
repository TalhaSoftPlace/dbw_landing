import styled from '@emotion/styled';
import { TextField, Autocomplete } from '@mui/material';

export const TextFieldStyled = styled(TextField)`
  .MuiInput-root:after {
    ${({ theme }) => `
    color: ${theme.palette.text.primaryText};
    `}
    border-bottom: none !important;
  } 

  input{
    ${({ theme }) => `
    color: ${theme.palette.text.primaryText};
    `}
  }

`;

export const AttendeesAutocomplete = styled(Autocomplete)`
  padding-left: 0px;
  width: 100%;
  ${({ theme }) => `
    border: 1px solid ${theme.palette.background.textFieldBorder};
    background: ${theme.palette.background.light};
    color: ${theme.palette.text.primaryText};
  div.MuiFormControl-root {
    height: auto !important;
    div.MuiOutlinedInput-root {
      height: auto !important;
      padding-top: 5px;
      .MuiChip-root.MuiChip-filled {
        color: ${theme.palette.text.primaryText} !important;
        margin-top: 0px;
      }
      .MuiChip-deleteIcon{
        color: rgba(32, 38, 65, 0.26); !important;
    }
      fieldset.MuiOutlinedInput-notchedOutline {
        height: auto !important;
      }
    }
  }
  `}
`;
