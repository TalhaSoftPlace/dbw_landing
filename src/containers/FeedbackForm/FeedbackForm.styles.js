import styled from '@emotion/styled';
import { TextField, Box } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from '@mui/material';
import  FeedbackBG from '../../images/feedback-bg.svg';
import { ReactComponent as SucessIcon } from '../../images/SuccessIcon.svg';

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
export const  FromWrapper = styled.div` 
  padding: 30px;
  width: 100%;
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
export const TypographyStyled = styled(Typography)`
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.md}px){
    font-size: 16pt;
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
${({ theme }) => `
color: ${theme.palette.text.primaryText};
`}
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
  .MuiOutlinedInput-input.MuiInputBase-input{
    ${({ theme }) => `
    color: ${theme.palette.text.primaryText};
    `}
    

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

export const SuccessIcon = styled(SucessIcon)`
  width:70px;
  height:70px;
`;

export const StyledBox = styled(Box)`
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  text-align: center;
  padding: 30px;
  ${({ theme }) => `
        background: ${theme.palette.background.light};
     `};
`;