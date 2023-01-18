import styled from '@emotion/styled';
import { OutlinedInput, TextField, Select } from '@mui/material';

export const CardInputWrapper = styled.div`
  border: 1px solid;
  border-radius: 4px;
  padding: 20px 14px;
  margin-top: 2px;
  border-color: rgba(0, 0, 0, 0.23);
  ${({ theme }) => `
    background-color: ${theme.palette.background.light};
    `}
`;

export const StyledTextField = styled(TextField)`
  ${({ theme, success }) => {
    if (success !== undefined)
      return `
  * {
     color: ${
       success === 'true'
         ? theme.palette.text.sccuess
         : theme.palette.text.error
     }  !important;
    }
  `;
  }}
  width: 100%;
  background: white;
  &.left {
    width: 50%;
    fieldset {
      border-radius: 5px 0 0 5px;
    }
  }
  &.right {
    width: 50%;
    fieldset {
      border-radius: 0 5px 5px 0;
    }
  }
  fieldset {
    border-radius: 5px;
  }
  &.filled {
    input {
      ${({ theme }) => `
     background-color: ${theme.palette.background.lightGray};
     `}
    }
  }
`;

export const FieldLabel = styled.div`
  ${({ theme }) => `
  color: ${theme.palette.text.primaryText};
  `}
  font-size: 18px;
`;

export const OutlinedInputStyled = styled(OutlinedInput)`
  width: 100%;
  ${({ theme }) => `
      background-color: ${theme.palette.email.text.light};
      color: ${theme.palette.text.primaryText};
  `}
`;

export const AgreeTermsText = styled.p`
  ${({ theme }) => `
color: ${theme.palette.text.blueDark};
`}
  font-size: 14px;
`;

export const StyledSelectField = styled(Select)`
  ${({ theme }) => `
      background-color: ${theme.palette.email.text.light};
      .MuiOutlinedInput-input.MuiInputBase-input{
        color: ${theme.palette.text.primaryText};
      }
  `}
  
`;
