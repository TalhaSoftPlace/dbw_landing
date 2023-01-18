import styled from '@emotion/styled';
import { TextField, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, TableCell , OutlinedInput} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FormControlLabel from '@mui/material/FormControlLabel';
export const DialogStyled = styled(Dialog)`
  font-family: 'Roboto', sans-serif !important;
  .MuiDialog-paperFullWidth {
    ${({ theme }) => `
  background-image: linear-gradient(${theme.palette.background.bgGradiantStart}, ${theme.palette.background.bgGradiantEnd});
  background: ${theme.palette.background.light};
  color:${theme.palette.text.primary};
  `}
  }
  &.MuiGrid-root.MuiGrid-container {
    padding-left: 15px;
    padding-right: 15px;
  }
  .dialoguecontent {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 250px;
    align-items: center;
  }
`;
export const InfoText = styled.span`
  font-size: 14px;
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.md}px){
   font-size: 10pt;
 }
`}
  .forgotpassword {
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    display: flex;
    justify-content: flex-end;
    padding-top: 5px;
    ${({ theme }) => `
      color: ${theme.palette.text.blueLight};
      @media (max-width: ${theme.breakpoints.values.md}px){
        font-size: 12pt;
        color: ${theme.palette.text.dark};
        font-weight: 600;
      }
    `}
  }
`;
export const ErrorIcon = styled(ErrorOutlineIcon)`
  font-size: 70px;
  ${({ theme }) => `
  color: ${theme.palette.text.danger};
  `}
`;
export const StyledTableCell = styled(TableCell)`
  ${({ theme }) => `
     background-color: ${theme.palette.background.light};
      color: ${theme.palette.text.dark};
      border-bottom: 1px solid ${theme.palette.background.dark};
      font-weight: 500;
      font-size:12px;
     `}
`;
export const CloseIconStyled = styled(CloseIcon)`
  float: right;
  font-size: 30px;
  cursor: pointer;
  ${({ theme }) => `
    color: ${theme.palette.text.blueLight};
    `}
`;
export const Wrapper = styled.div`
  padding-inline: 15px;
  padding-top: 25px;
  padding-bottom: 0;
  border-radius: 12px;
  position: relative;
  text-align: center;
  width: 100%;
  ${({ theme }) => `
    background-color: ${theme.palette.background.light};
  `}
  .countrycodelist {
    background-color: #ccc !important;
  }
`;
export const HeadingWrapper = styled.div`
  h2 {
    text-align: center;
    font-size: 36px;
    margin: 0;
    font-weight: 500;
    ${({ theme }) => `
    color: ${theme.palette.text.blueLight};
    @media (max-width: ${theme.breakpoints.values.md}px){
     font-size: 20pt;
   }
   padding-bottom:5px;
  border-bottom: 1px solid ${theme.palette.background.lightGrey};
   
 `}
  }
  p {
    padding-top: 10px;
    font-size: 18px;
    ${({ theme }) => `
     color: ${theme.palette.text.grey};
  `}
  }
  span {
    text-align: start;
    display: flex;
    padding-top: 10px;
    font-size: 16px;
    ${({ theme }) => `
     color: ${theme.palette.text.grey};
  `}
  }
  .finalstep {
    font-size: 20px;
    ${({ theme }) => `
     color: ${theme.palette.background.redbg};
  `}
  }
`;

export const KeepMeSignedIn = styled(FormControlLabel)`
  ${({ theme }) => `
  .MuiTypography-root{
    @media (max-width: ${theme.breakpoints.values.md}px){
      font-size: 12pt;
      font-weight: 600;
     }
  }
`}
`;
export const Fileds = styled(Box)`
  text-align: left;
  position: relative;
  a {
    text-decoration: none;
    position: relative;
    padding-inline: 10px;
    font-weight: 600;
    font-size: 20px;
    text-align: center;
    ${({ theme }) => `
     color: ${theme.palette.text.blueLight};
  `}
  }
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

export const FormFooter = styled.div`
  width: calc(100% + 60px);
  ${({ theme }) => `
     border-top: 1px solid ${theme.palette.background.lightGrey};
     `}
  height: 40px;
  padding-top: 10px;
  text-align: center;
  margin-inline: -30px;
  margin-top: 20px;
`;

export const InfoLabel = styled.span`
  font-size: 14px;
  font-weight: 600;

  ${({ theme, variant }) => {
    switch (variant) {
      case 'sccuess':
        return `
    color: ${theme.palette.text.sccuess};
  `;
      case 'error':
        return `
    color: ${theme.palette.text.error};
  `;
      default:
        return null;
    }
  }}
`;

export const ContentBox = styled(Box)`
  display: contents;
  text-align: justify;
`;

export const TypographyStyled = styled(Typography)`
  ${({ theme }) => `
     @media (max-width: ${theme.breakpoints.values.md}px){
      font-size: 12pt !important;

      a {
        font-size: 12pt !important;
        text-decoration: underline;
      }
    }
  `}
`;

export const OutlinedInputs = styled(OutlinedInput)`

    input{
      ${({ theme }) => `
     color: ${theme.palette.text.primaryText};
     `}
    }

`;