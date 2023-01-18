import { Button } from '../../components';
import { AddCircleOutline } from '@mui/icons-material';
import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { Select, TextField, Box, Typography } from '@mui/material';
import { ReactComponent as CreditCardIcon } from '../../images/CreditCard.svg';
import { ReactComponent as CheckGreenIcon } from '../../images/checkgreen.svg';

export const HeaderActionButton = styled(Button)`
  ${({ theme }) => `
      background-color: ${theme.palette.text.darkPrimary};
  `};
  font-weight: 400;
  height: 40px;
`;

export const AddCircleOutlineStyled = styled(AddCircleOutline)`
  font-weight: 400;
  margin-right: 5px;
  margin-bottom: 3px;
`;

export const DialogStyled = styled(Dialog)`
  font-family: 'Roboto', sans-serif !important;
  .MuiDialog-paperFullWidth {
    max-width: 700px !important;
    ${({ theme }) => `
    background-image: linear-gradient(${theme.palette.background.bgGradiantStart}, ${theme.palette.background.bgGradiantEnd});
    `}
  }
  .dialogcontent {
    ${({ theme }) => `
      @media (max-width: ${theme.breakpoints.values.md}px){
      padding-left:15px;
      padding-right:15px;
    }
    `}
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

export const AmountDueText = styled(Typography)`
  font-weight: 500;
  font-size:40px;
  margin-bottom: 0px;
  ${({ theme }) => `
    color: ${theme.palette.background.dark};
    `}
`;

export const EnterInfoText = styled(Typography)`
  font-weight: 400;
  margin-top: 0px;
  ${({ theme }) => `
    color: ${theme.palette.background.dark};
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

export const BoxStyled = styled(Box)`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 20px;
  padding-left: 20px;
  ${({ theme }) => `
  background: ${theme.palette.email.text.light};
  border: 1px solid ${theme.palette.background.primaryBorder};
  @media (max-width: ${theme.breakpoints.values.md}px){
      padding-left:0px;
      padding-right:0px;
    }
  `}
  border-radius: 5px;
`;

export const CreditCardIconStyled = styled(CreditCardIcon)`
  width: 60px;
`;

export const CheckGreenIconStyled = styled(CheckGreenIcon)`
  width: 60px;
  margin-top: 8px;
`;
