import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
export const Background = styled(Box)`
  min-height: 100vh;
  ${({ theme }) => `
    background-color: ${theme.palette.background.primary};
    @media (max-width: ${theme.breakpoints.values.sm}px){
      min-height: 100vh;
    }
    `}
  
`;
export const PricingHeader = styled(Box)`
width:100%;
display:flex;
padding-inline:30px;
justify-content:center;
align-items:center;
border-radius: 5px 5px 0px 0px;
font-size:40px;
${({ theme }) => `
    background-color: ${theme.palette.background.blueLight};
    color: ${theme.palette.background.light};

    @media (max-width: ${theme.breakpoints.values.sm}px){
      font-size:30px;
      margin-top:50px;
    }
    
    `}

    .backarrow{
      display:flex;
      justify-content:flex-end;
      width:100%;
    }
  `;
  export const StyledLink = styled(Link)`
  text-decoration: none;
  cursor:pointer;
  ${({ theme }) => `
    color: ${theme.palette.background.light};
    
    `}
`;
  export const PricingBody = styled(Box)`
height:100%;
width:100%;
padding-inline:30px;
align-items:center;
${({ theme }) => `
    background-color: ${theme.palette.background.pricingbg};
    color: ${theme.palette.background.light};
    @media (max-width: ${theme.breakpoints.values.sm}px){
      padding-inline:5px;
    }
    
    `}

  .join-nowbtn{
    font-size:14px;
    padding:10px;
    height:40px;
    width:200px;
  }  

  `;

  export const PricingSubHeading = styled(Box)`
height:100%;
width:100%;
font-size:25px;
text-align:center;
${({ theme }) => `
    background-color: ${theme.palette.background.pricingbg};
    color: ${theme.palette.background.light};
    
    `}

  ` ;

export const StyledText = styled.span`
padding-inline:8px;
font-size:50px;
font-weight:bold;
${({ theme }) => `
    color: ${theme.palette.background.greenbg};
   
    `}
`;
export const Styledspan = styled.span`
padding-inline:8px;
font-size:35px;
font-weight:bold;
${({ theme }) => `
    color: ${theme.palette.background.light};
   
    `}
`;