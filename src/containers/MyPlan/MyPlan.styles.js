import styled from '@emotion/styled';
import { Select, TextField, Box } from '@mui/material';
import { ReactComponent as StorageIcons } from '../../images/storage.svg';
import { ReactComponent as PlanIcons } from '../../images/plan.svg';
import { ReactComponent as MailIcons } from '../../images/mail.svg';
export const StyledTextField = styled(TextField)`
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    opacity: 1;
  }
  margin-bottom: 20px;
  input {
    padding-left: 6px;
  }
  ${({ theme }) => `
  background-color: ${theme.palette.background.primary};
  border-radius: 5px;
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

export const StyledSelect = styled(Select)`
  width: 100%;
  height: 44px;
  ${({ theme }) => `
  background-color: ${theme.palette.background.primary};
  border-radius: 5px;
  * {
     color: ${theme.palette.text.light}  !important;
    }
  `};
`;
export const Heading = styled(Box)`
  font-size: 16px;
  line-height: 1.5;
  font-weight: bold;
  ${({ theme }) => `
  color: ${theme.palette.text.primaryText};
   
 `};
`;
export const Paragraph = styled(Box)`
  font-size: 15px;
  line-height: 1.5;
  ${({ theme }) => `
  color: ${theme.palette.text.primaryText};
   
 `};
`;

export const StyledField = styled(TextField)`
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

  ${({ theme }) => `
    color: ${theme.palette.text.primaryText};
   
 `};
  input{
    ${({ theme }) => `
    color: ${theme.palette.text.primaryText};
   
 `};
  }
  width: 100%;
  &.left {
    width: 50%;
    fieldset {
      border-radius: 5px 0 0 5px;
    }
  }
  &.right-box {
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
export const StyleBox = styled(Box)`
  font-size: 18px;
  cursor: pointer;
  ${({ theme }) => `
    color: ${theme.palette.text.light};
   
 `};
`;

export const DeleteBox = styled(Box)`
  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
  }
`;


export const StorageIcon = styled(StorageIcons)`
path{
  ${({ theme }) => `
  fill: ${theme.palette.text.light};
 `};
}
`;

export const PlanIcon = styled(PlanIcons)`
path{
  ${({ theme }) => `
  fill: ${theme.palette.text.light};
 `};
}
`;
export const MailIcon = styled(MailIcons)`
path{
  ${({ theme }) => `
  fill: ${theme.palette.text.light};
 `};
}
`;


