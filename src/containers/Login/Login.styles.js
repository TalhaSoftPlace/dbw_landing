import styled from '@emotion/styled';
import { TextField, Box } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from '@mui/material';
import  FeedbackBG from '../../images/feedback-bg.svg';
import { Link } from 'react-router-dom';
export const Wrapper = styled.div`  
  padding: 30px;
  padding-bottom: 0;
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
    @media (max-width: ${theme.breakpoints.values.lg}px){
      margin-bottom: 16px;
      margin-top: 3rem;
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
     color: ${theme.palette.landingpage.text.grey};
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
  padding-top: 8px;
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
export const  StyledLink = styled(Link)`
${({ theme }) => `
     color:${theme.palette.text.blueLight};
     `}
`;