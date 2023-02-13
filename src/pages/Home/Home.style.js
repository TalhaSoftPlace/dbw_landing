import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { ReactComponent as LockIcon } from '../../images/lock.svg';
import { ReactComponent as KeyIcon } from '../../images/BusinesIcon.svg';
import { ReactComponent as LikeIcon } from '../../images/Iconworkflow.svg';
import { ReactComponent as CalenderIcon } from '../../images/calendar.svg';
import { ReactComponent as HolisticEmail } from '../../images/HolisticEmail.svg';
import { ReactComponent as Meetblue } from '../../images/Meetblue.svg';
import boatImage from '../../images/1920.jpg';
import responsiveBoatImage from '../../images/640.jpg';

export const Background = styled(Box)`
  padding-top: 5%;
  ${({ theme }) => `
    background-color: ${theme.palette.landingpage.background.primary};
    .homeheading{
      color: ${theme.palette.landingpage.text.blueLight};
    }
    .herotext{
      margin-bottom:0px;
      height: 30vh; 
      @media (max-width: ${theme.breakpoints.values.md}px){
      height: unset; 
    }
    }
    .herodiv{
      padding-top:5px;
      padding-bottom:70px;
        @media (max-width: ${theme.breakpoints.values.md}px){
           padding-top:0px;
        }
    }
  `}
  .featurecard {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      padding-inline: 1% ;
    }
    @media (min-width: ${theme.breakpoints.values.lg}px){
      padding-inline: 0;
    }
  `}
  }
  .homeheading {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      margin-top: 0px;
    }
  `}
  }
`;

export const WhyUsDiv = styled(Box)`
  ${({ theme }) => `
    background-image: url(${boatImage});
    background-size:contain;
    height: 656px;
    width : 100%;
    background-repeat: no-repeat;
    background-position: center;
    
    @media (max-width: ${theme.breakpoints.values.sm}px){
      height: 375px;
      background-image: url(${responsiveBoatImage});
      background-size:contain;
    }
    @media (max-width: ${theme.breakpoints.values.md}px){
      height: 375px;
      background-image: url(${responsiveBoatImage});
      background-size:cover;
      background-position:initial;
    }
    @media (min-width: ${theme.breakpoints.values.md}px) and (max-width: ${theme.breakpoints.values.lg}px){
      height: 500px;
      background-image: url(${boatImage});
      background-position: center;
      background-size: cover;
    }
  `}
  .logo {
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: end;
  }
  h4 {
    ${({ theme }) => `
        color: ${theme.palette.landingpage.text.light};
        font-weight: 300;
        padding-top: 0px;
        margin: 0px;
      `}
  }

  h5 {
    ${({ theme }) => `
        color: ${theme.palette.landingpage.text.light};
        font-weight: 300;
        padding-top: 0px;
        margin-top: 30px;
      `}
  }
`;

export const WhyUsIntro = styled(Box)`
  box-sizing: border-box;
  ${({ theme }) => `
  max-width: 610px;
  padding:45px 25px;
  background-color: ${theme.palette.landingpage.background.bluetransparent} !important;
  border-radius: 5px;
  margin-top:190px;
  @media (max-width: ${theme.breakpoints.values.sm}px){
      padding:20px;
      margin-left:30px;
      margin-top:70px;
      background-color: ${theme.palette.landingpage.background.bluetransparent} !important;
    }
  @media (min-width: ${theme.breakpoints.values.sm}px) and (max-width: ${theme.breakpoints.values.md}px){
      padding:20px;
      margin-left:50%;
      margin-top:70px;
      background-color: ${theme.palette.landingpage.background.bluetransparent} !important;
    }
  @media (min-width: ${theme.breakpoints.values.md}px) and (max-width: ${theme.breakpoints.values.lg}px){
      padding:20px;
      margin-left:30px;
      margin-top:80px;
      background-color: ${theme.palette.landingpage.background.bluetransparent} !important;
    }
  `}

  h3 {
    ${({ theme }) => `
    color: ${theme.palette.landingpage.text.light};
    font-weight: 400;
    margin: 0;
    margin-bottom: 10px;
    
  `}
  }
  h4 {
    ${({ theme }) => `
    color: ${theme.palette.landingpage.text.light};
    font-weight: 400;
    margin-bottom: 35px;
    @media (max-width: ${theme.breakpoints.values.sm}px){
    margin-bottom: 20px;
    }

    
  `}
  }

  h6 {
    ${({ theme }) => `
    color: ${theme.palette.landingpage.text.light};
    
  `}
  }

  h5 {
    ${({ theme }) => `
    color: ${theme.palette.landingpage.text.light};
    font-weight: 400;
    padding: 0px;
    margin : 0px;
  `}
  }
  p {
    ${({ theme }) => `
    color: ${theme.palette.landingpage.text.light};
    font-weight: 300;
  
  `}
  }
`;

export const Wrapper = styled.div`
padding-left:0px;
h1 {
  font-size:40px !important;
  ${({ theme }) => `
  color: ${theme.palette.landingpage.text.light};
  font-weight: 400;
  text-align: center;
`}
}
  h2 {
    ${({ theme }) => `
    color: ${theme.palette.landingpage.text.light};
    font-weight: 400;
    text-align: center;
  `}
  }
  h4 {
    ${({ theme }) => `
    color: ${theme.palette.landingpage.text.light};
    font-weight: 400;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 90px;
  `}
  }
`;

export const LockImage = styled(LockIcon)`
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px) {
    width:70px;
    height:70px;
  }
  `}
`;

export const KeyImage = styled(KeyIcon)`
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px) {
    width:70px;
    height:70px;
  }
  `}
`;

export const LikeImage = styled(LikeIcon)`
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px) {
    width:70px;
    height:70px;
  }
  `}
`;

export const CalenderImage = styled(CalenderIcon)`
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px) {
    width:70px;
    height:70px;
  }
  `}
`;
export const HolisticEmailIcon = styled(HolisticEmail)`
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px) {
    width:70px;
    height:70px;
  }
  `}
`;
export const MeetblueIcon = styled(Meetblue)`
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px) {
    width:70px;
    height:70px;
  }
  `}
`;
