import styled from '@emotion/styled';
import { TextField, Box, Typography } from '@mui/material';
import  FeedbackBG from '../../images/feedback-bg.svg';
import { Link } from 'react-router-dom';
export const Wrapper = styled.div`
  padding: 25px;
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
      margin-top: 3rem;
    }
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
    font-size: 17px;
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
`;

export const InfoText = styled.span`
  font-size: 14px;
  ${({ theme }) => `
     color: ${theme.palette.text.grey};
  `}
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
export const  StyledLink = styled(Link)`
${({ theme }) => `
     color:${theme.palette.text.blueLight};
     `}
`;

export const Copycode = styled(Box)`
${({ theme }) => `
     color: ${theme.palette.text.grey};
  `}
`;