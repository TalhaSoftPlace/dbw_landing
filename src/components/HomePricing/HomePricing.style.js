import styled from '@emotion/styled';
import { Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import { ReactComponent as Pricingcheck } from '../../images/PricingCheck.svg';
export const Textdate = styled(Box)`
  ${({ theme }) => `
  color: ${theme.palette.landingpage.text.greyDark};

  `}
`;
export const PricingCheck = styled(Pricingcheck)`
  margin-right: 10px;
`;

export const EmailAccount = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16%;
  padding-inline: 16%;
  padding-block: 25px;
  ${({ theme }) => `
    color: ${theme.palette.landingpage.text.light};
    background-color: ${theme.palette.landingpage.text.blueLight};
    @media (max-width: ${theme.breakpoints.values.md}px){
    padding-inline: 6%;
  }
  .contactbtn{
    justify-content:end;
     @media (max-width: ${theme.breakpoints.values.md}px){
    justify-content:center;
    display:flex;
    padding-top:20px;
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

  .limitedtimetext{
    font-size:40px;
    line-height::1.3;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lgx}px){
      font-size:35px;
    }
   
    `}
  }
`;
export const PricingBox = styled(Box)`
  gap: 16%;
  padding-inline: 16%;
  padding-block: 30px;
  width: 100%;
  height: 100%;
  display: flex;
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.xl}px){
    padding-inline: 13%;
  }
  @media (max-width: ${theme.breakpoints.values.lg}px){
    padding-inline: 14%;
  }
    @media (max-width: ${theme.breakpoints.values.md}px){
      padding-inline: 16px;
    }
  `}
  
  }
  .priceBox {
    padding-bottom:20px;
    ${({ theme }) => `
  border: 1px solid ${theme.palette.landingpage.text.greyLight};
  border-radius: 5px;
  width: 410px;
  @media (max-width: ${theme.breakpoints.values.lg}px){
      width: 350px;
  }
  @media (max-width: ${theme.breakpoints.values.md}px){
      width: 350px;
    }
  `}
  }

  .free {
    ${({ theme }) => `
  color: ${theme.palette.landingpage.background.greenbg};
  font-size: 80px;
   @media (max-width: ${theme.breakpoints.values.lg}px){
    font-size: 60px;
    padding-block:0px;
   }
   @media (max-width: ${theme.breakpoints.values.md}px){
    font-size: 60px;
    padding-block:0px;
   }
    
  `}
  }
  .dollor {
    ${({ theme }) => `
  font-size: 45px;
  @media (max-width: ${theme.breakpoints.values.lg}px){
    font-size: 34px;
    padding-block:0px;
    }
    @media (max-width: ${theme.breakpoints.values.md}px){
    font-size: 54px;
    padding-block:0px;
    }

  `}
  }
  .price{
    padding-block:10px;
    padding-inline:25px;
  }
`;

export const StyledLink = styled(Link)`
  ${({ theme }) => `
  text-decoration: none;
  `}
`;
export const StyledGrid = styled(Grid)`
  ${({ theme }) => `
  color: ${theme.palette.landingpage.text.light};
  padding-right:10px;
  padding-bottom:10px;
  `}
  .btnJoinNow {
    height: 40px;
    width: 200px;
    font-size: 14px;
  }
`;
export const Wrapper = styled(Box)`
  ${({ theme }) => `
  .offeredtext {
    font-size:30px;
    font-weight:500;
    color: ${theme.palette.landingpage.text.light};
    padding-bottom:10px;
  @media (max-width: ${theme.breakpoints.values.lg}px){
    padding-top:0px;
    font-size: 24px;
    font-weight:500;
    }
    @media (max-width: ${theme.breakpoints.values.md}px){
    padding-top:10px;
    font-size: 24px;
    font-weight:500;
    }
  }
  .pricesubheading {
    font-size: 34px;
    @media (max-width: ${theme.breakpoints.values.lg}px){
    font-size: 27px;
    }
    @media (max-width: ${theme.breakpoints.values.md}px){
    font-size: 27px;
    }
  }
  .paragraph{
    font-size: 22px;
    color: ${theme.palette.landingpage.text.light};
    @media (max-width: ${theme.breakpoints.values.md}px){
      font-size: 18px;
    }
    @media (max-width: ${theme.breakpoints.values.lg}px){
      font-size: 14px;
    }
  }
  .endheading{
    font-size: 32.5px;
    color: ${theme.palette.landingpage.text.light};
    @media (max-width: ${theme.breakpoints.values.lgx}px){
      font-size: 22px !important;
      text-align: start;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    @media (max-width: ${theme.breakpoints.values.md}px){
      font-size: 22px;
      text-align: start;
      padding-top: 20px;
      padding-bottom: 10px;
    }
  }
  .seeall{
    color: ${theme.palette.landingpage.text.blueLight};
    font-size: 29px;
    text-align: start;
    padding-right:40px;
    @media (max-width: ${theme.breakpoints.values.lgx}px){
     font-size: 18px;
     text-align: start;
     padding-right:17px;
    }
    @media (max-width: ${theme.breakpoints.values.md}px){
    font-size: 22px;
    text-align: start;
    padding-right:0px;
    }
  }
  .colum2{
    padding-left:60px;
    @media (max-width: ${theme.breakpoints.values.lg}px){
      padding-left:30px;
    }
    @media (max-width: ${theme.breakpoints.values.sm}px){
      padding-left:0px;
    }
  }
  `}
`;
export const LinkStyled = styled(Link)`
  ${({ theme }) => `
  color: ${theme.palette.landingpage.text.blueLight};
  `}
`;
export const StyledTypography = styled.p`
  margin: 0;
  line-height: 1.5;
  padding-bottom: 12px;
  color:#9a9ea5;
`;
export const StyleTypography = styled.p`
  margin: 0;
  line-height: 1.5;
`;
