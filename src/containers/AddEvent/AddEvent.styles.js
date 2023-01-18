import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { Select, TextField, Typography } from '@mui/material';

export const DialogStyled = styled(Dialog)`
  font-family: 'Roboto', sans-serif !important;
  .MuiDialog-paperFullWidth {
    max-width: 800px !important;
    ${({ theme }) => `
    background-image: linear-gradient(${theme.palette.background.bgGradiantStart}, ${theme.palette.background.bgGradiantEnd});
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

export const FieldLabel = styled(Typography)`
  ${({ theme }) => `
    color: ${theme.palette.background.dark};
  `}
  margin-bottom: 5px;
  font-weight: 400;
`;

export const SelectStyled = styled(Select)`
  background: white;
`;

export const AgreeTermsText = styled(Typography)`
  ${({ theme }) => `
color: ${theme.palette.text.blueDark};
`}
`;
