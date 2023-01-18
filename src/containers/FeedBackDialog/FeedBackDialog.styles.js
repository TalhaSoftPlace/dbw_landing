import styled from '@emotion/styled';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, Typography ,TextField , Select } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '../../components';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FormControlLabel from '@mui/material/FormControlLabel';
import  FeedbackBG from '../../images/feedback-bg.svg';
import { ReactComponent as SucessIcon } from '../../images/SuccessIcon.svg';
export const TypographyStyled = styled(Typography)`
  ${({ theme }) => `
  color: ${theme.palette.text.primaryText}!important;
  @media (max-width: ${theme.breakpoints.values.md}px){
    font-size: 16pt;
    justify-content:left;
  }
  `}
`;

export const SuccessIcon = styled(SucessIcon)`
  width:70px;
  height:70px;
`;

export const Wrapper = styled.div`
  padding: 0px;
  border-radius: 12px;
  position: relative;
  text-align: center;
  width: 100%;
  ${({ theme }) => `
  background-image: url(${FeedbackBG});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
    background-color: ${theme.palette.background.light};
    @media (max-width: ${theme.breakpoints.values.sm}px){
      margin-bottom: 16px;
    }
  `}
  .forgotpassword {
    font-size: 14px;
    text-align: right;
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
  .infocolor {
    ${({ theme }) => `
      color: ${theme.palette.text.blueLight};
    `}
  }
`;
export const Textarea = styled(TextField)`
  width: 100%;
  ${({ theme }) => ` 
        border: 1px solid ${theme.palette.background.textFieldBorder};
        border-radius:5px;
        background-color: ${theme.palette.background.light};
        textarea {
            font-size: 16px;
            font-weight: normal;
        }
    `};
`;
export const DialogStyled = styled(Dialog)`
  font-family: 'Roboto', sans-serif !important;
  .MuiDialog-paperFullWidth {
    max-width: 450px;
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
    align-items: center;
  }
`;

export const StyleDialogTitle = styled(DialogTitle)`
  font-size: 14px;
  padding-inline: 10px;
  font-weight: normal;
  ${({ theme }) => `
  color: ${theme.palette.text.primaryText};
    `}
`;
export const CloseIconStyled = styled(CloseIcon)`
  float: left;
  font-size: 30px;
  cursor: pointer;

  ${({ theme }) => `
  color: ${theme.palette.text.primaryText};
    `}
`;
export const StyledBackIcon = styled(ArrowBackIosIcon)`
  float: left;
  font-size: 17px;
  cursor: pointer;
  padding-top: 8px;
  margin-right: -5px;
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.sm}px){
    padding-top: 3px;
  }
  color: ${theme.palette.text.primaryText};
    `}
`;
export const StyledSpan = styled(Box)`
  ${({ theme }) => `
        color: ${theme.palette.text.light};
        cursor:pointer;
        font-size:14px;
    `};
`;
export const StyledSpanHeader = styled(Box)`
  ${({ theme }) => `
        color: ${theme.palette.text.light};
        cursor:pointer;
        font-size:16px;
    `};
`;
export const NotesList = styled(Box)`
  overflow: hidden;
  overflow-y: auto;
  height: calc(100vh - 290px);
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.sm}px){ 
    height: calc(100vh - 353px);
  }
  `}
`;
export const NotesviewStyledBox = styled(Box)`
  position: relative;
  margin: 30px;
  margin-bottom: 0px;
  padding-inline: 10px;
  padding-top: 10px;
  border-radius: 20px;
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.md}px){ 
  max-width: calc(100vw - 20px);
  margin: 11px;
  margin-bottom: 0px;
  padding: 10px;
    }
  background-image: linear-gradient(${theme.palette.background.bgGradiantStart}, ${theme.palette.background.bgGradiantEnd});
    * { 
        font-family: 'Roboto', sans-serif !important;
        border-color: ${theme.palette.background.textFieldBorder} !important;
    }
      .headingborder {
      border-bottom: 2px solid ${theme.palette.text.primary} !important;
  }
  .pagination{
    display:flex;
    -webkit-display:flex;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
    width:100%;
  }
  `};
`;

export const Delete = styled(DeleteIcon)`
  font-size: 70px;
  ${({ theme }) => `
  color: ${theme.palette.text.danger};
  `}
`;
export const StyledButton = styled(Button)`
  width: 110px;
  cursor: pointer;
`;
export const  FromWrapper = styled.div`
 
textarea{
  ${({ theme }) => `
  color: ${theme.palette.text.primaryText};
`}
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
  `}
  }
  span {
    font-size: 16px;
    ${({ theme }) => `
     color: ${theme.palette.text.grey};
     @media (max-width: ${theme.breakpoints.values.md}px){
      font-size: 10pt;
    }
  `}
  }
`;

export const InfoText = styled.span`
  font-size: 14px;
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.md}px){
   font-size: 10pt;
 }
`}
`;

export const FooterInfoText = styled.span`
  font-size: 14px;
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.md}px){
   font-size: 10pt;
  color: ${theme.palette.text.grey};
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
     background-color: ${theme.palette.background.lightGrey};
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
        return ``;
    }
  }}
`;

export const ContentBox = styled(Box)`
  display: contents;
  text-align: justify;
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
export const FormHeader = styled.span`
  padding-block:5px;
  border-radius: 12px 12px 0px 0px;
  display:flex;
  justify-content: center;
  width:100%;
  font-size:22px;
  ${({ theme }) => `
  color: ${theme.palette.text.light};
  background-color: ${theme.palette.text.blueLight};
`}
`;

export const StyledSelect = styled(Select)`
${({ theme }) => `
  color: ${theme.palette.text.primaryText};
  .MuiOutlinedInput-input.MuiInputBase-input{
    color: ${theme.palette.text.primaryText};
  }
`};

`;