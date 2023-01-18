import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { TextField, Select, Dialog, Typography, Grid } from '@mui/material';

export const DialogStyled = styled(Dialog)`
  font-family: 'Roboto', sans-serif !important;
  .MuiDialog-paperFullWidth {
    ${({ theme }) => `
  background-image: linear-gradient(${theme.palette.background.bgGradiantStart}, ${theme.palette.background.bgGradiantEnd});
  background: ${theme.palette.background.dark};
  `}
  }
  &.MuiGrid-root.MuiGrid-container {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export const CloseIconStyled = styled(CloseIcon)`
  float: right;
  font-size: 30px;
  cursor: pointer;
  ${({ theme }) => `
    color: ${theme.palette.text.blueLight};
    `}
`;

export const SelectStyled = styled(Select)`
  ${({ theme }) => `
    border: 1px solid ${theme.palette.background.textFieldBorder};
    background: ${theme.palette.background.light};
    height: 44px;
  `}
`;

export const StyledTextField = styled(TextField)`
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    opacity: 1;
  }
  margin-bottom: 20px;
  input {
    padding-left: 6px;
    padding-bottom: 5px;
    padding-top: 10px;
  }
  ${({ theme }) => `
  background-color: ${theme.palette.background.primary};
  border-radius: 5px;
  height: 42px;
  * {
     color: ${theme.palette.text.light}  !important;
    }
  `};
  width: 100%;

  fieldset {
    border-radius: 8px;
    border-color: transparent !important;
  }
`;

export const FieldLabel = styled(Typography)`
  ${({ theme }) => `
    color: ${theme.palette.background.light};
  `}
  font-size: 16px;
  font-weight: 500;
`;

export const HelpText = styled(Typography)`
  ${({ theme }) => `
    color: ${theme.palette.text.helptext};
  `}
  font-size: 12px;
  font-weight: 500;
`;

export const TextFieldStyled = styled(TextField)`
  ${({ theme }) => `
    border: 1px solid ${theme.palette.background.textFieldBorder};
    background: ${theme.palette.background.light};
    input{
      height: 12px !important;
    }
  `}
`;
export const FieldGrid = styled(Grid)`
  padding-top: 0px !important;
`;
