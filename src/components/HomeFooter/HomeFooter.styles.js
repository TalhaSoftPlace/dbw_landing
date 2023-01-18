import styled from '@emotion/styled';
import { Box , Menu} from '@mui/material';
import { Link } from 'react-router-dom';

export const Footer = styled(Box)`
  align-items: center;
  gap: 16%;
  padding-inline: 16%;
  padding-block: 60px;
  ${({ theme }) => `
    background-color: ${theme.palette.landingpage.background.primary};
    color: ${theme.palette.landingpage.text.textLight};
    @media (max-width: ${theme.breakpoints.values.md}px){
      padding-inline: 4%;
      padding-block: 30px;
    }
    .heading {
    margin-bottom: 35px;
    @media (max-width: ${theme.breakpoints.values.md}px){
      margin-top:20px;
      margin-bottom: 20px;
    }
  }
  `}

  .right-reserved {
    padding-top: 80px;
    text-align: center;
    width: 100%;
    justify-content: center;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px) {
      padding-top: 50px;
    }
  `}
  }
  .languagetext {
    ${({ theme }) => `
    color: ${theme.palette.landingpage.text.greyDark};
    display:flex;
    justify-content: center;
   
  `}
  }
`;
export const FooterHead = styled(Box)`
  font-size: 18px;
  ${({ theme }) => `
  color: ${theme.palette.landingpage.text.greyLight};
  `}
`;
export const StyledLink = styled(Link)`
  ${({ theme }) => `
  text-decoration: none;
  `}
`;

export const StyledMenu = styled(Menu)`
  ul{
    max-height:285px;
    overflow-y:auto;
  }
  .commingsoom{
    width:300px;
    height:300px;
  }
`;