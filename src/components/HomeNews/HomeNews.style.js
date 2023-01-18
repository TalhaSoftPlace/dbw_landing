import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { ReactComponent as PowerImage } from '../../images/power.svg';
import { Link } from 'react-router-dom';
export const News = styled(Box)`
  align-items: center;
  gap: 16%;
  padding-inline: 16%;
  padding-block: 20px;
  ${({ theme }) => `
    color: ${theme.palette.landingpage.text.light};
    background-color: ${theme.palette.landingpage.background.dark};
    @media (max-width: ${theme.breakpoints.values.md}px){
      padding-inline: 4%;
      padding-block: 30px;
    }
  
  `}
  > img {
    width: 90%;
    height: auto;
  }
`;

export const EmailPlateform = styled(Box)`
  align-items: center;
  gap: 16%;
  padding-inline: 16%;
  padding-top: 40px;
  padding-bottom: 5px;
  ${({ theme }) => `
    color: ${theme.palette.landingpage.text.light};
    background-color: ${theme.palette.landingpage.background.dark};
    @media (max-width: ${theme.breakpoints.values.md}px){
      padding-inline: 4%;
      padding-block: 30px;
      
      .ourteambtn{
        padding-top:0px;
        margin-right:15px;
      }
    }
    .ourteamparagraph{
      color:#9a9ea5;
      padding-block:30px;
    @media (max-width: ${theme.breakpoints.values.md}px){
      padding-block:10px;
    }
    }
    .ourteambutton{
      @media (max-width: ${theme.breakpoints.values.md}px){
        display:flex;
        justify-content:center;
        width: 100%;
      }
    }
  `}
  > img {
    width: 90%;
    height: auto;
  }
  .ourteambtn {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .signupbtn{
    width:200px;
  }
`;

export const NewsHead = styled(Box)`
  font-weight: 500;
  ${({ theme }) => `
  color: ${theme.palette.landingpage.text.light};
  `}
`;
export const Textdate = styled(Box)`
  ${({ theme }) => `
  color: ${theme.palette.landingpage.text.greyDark};

  `}
`;

export const EmailAccount = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16%;
  padding-inline: 16%;
  padding-block: 30px;
  ${({ theme }) => `
    color: ${theme.palette.landingpage.text.light};
    background-color: ${theme.palette.landingpage.text.blueLight};
    @media (max-width: ${theme.breakpoints.values.md}px){
    padding-inline: 6%;
  }
  .contactbtn{
    justify-content:end;
    display: flex;
    align-items: center;
     @media (max-width: ${theme.breakpoints.values.md}px){
    justify-content:center;
    display:flex;
    padding-top:20px;
    align-items: center;
  }
  }
  `}
  .powericon {
    margin-top: 4px;
    margin-right: 15px;
  }

  .emailbtn {
    float: right;
  }
  .signupbtn{
    width:200px;
  }
`;
export const EmailHead = styled(Box)`
  ${({ theme }) => `
  color: ${theme.palette.landingpage.text.light};

  `}
`;
export const PrivacySection = styled(Box)`
  align-items: center;
  gap: 16%;
  padding-inline: 14%;
  padding-top: 20px;
  padding-bottom: 20px;
  ${({ theme }) => `
    color: ${theme.palette.landingpage.text.light};
    @media (max-width: ${theme.breakpoints.values.md}px){
    padding-inline: 6%;
    padding-block: 30px;
  }
  .privacyicon{
    width:100%;
    margin-left:40px;
    padding-top:24px;
    @media (max-width: ${theme.breakpoints.values.sm}px){
      padding-top:0px;
    }
     @media (max-width: ${theme.breakpoints.values.md}px){
    margin-left:0px;
  }
  }
  
  `}
  p {
    line-height: 1.3;
    font-weight: 300;
    margin: 0px;
    padding-bottom: 15px;
  }
  .privacylogo{
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: flex-start;
    vertical-align: middle;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.sm}px){
      height: 50%;
  }
  `}
  }
`;
export const PowerIcon = styled(PowerImage)`
  ${({ theme }) => `
    color: ${theme.palette.landingpage.text.light};
    @media (max-width: ${theme.breakpoints.values.md}px){
    width:40px;
    height:40px;
  }
  `}
`;
export const StyledLink = styled(Link)`
  ${({ theme }) => `
  text-decoration: none;
  `}
`;
