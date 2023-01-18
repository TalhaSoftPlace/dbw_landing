import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
export const StyledLink = styled(Link)`
  ${({ theme }) => `
  text-decoration: none;
  `}
`;
export const Footer = styled(Box)`
  align-items: center;
  display: flex;
  gap: 16%;
  padding-inline: 12%;
  padding-block: 0px 35px;
  width: 100%;

  ${({ theme }) => `
    display:flex;
    background-color: ${theme.palette.landingpage.background.primary};
   
    `}
  p {
    ${({ theme }) => `
            color: ${theme.palette.text.grey};
            font-size: 14px;
            font-weight: 300;
            @media (min-width: ${theme.breakpoints.values.lgx}px){
              font-size: 16px;
            }
        `}
  }
  .allright {
    ${({ theme }) => `
        color: ${theme.palette.text.blueLight};
    `}
  }
  .terms {
    ${({ theme }) => `
        color: ${theme.palette.text.blueLight};
        padding-bottom : 2px;
        text-align:right;
        margin:0;
    `}
  }
  .privacy {
    ${({ theme }) => `
        color: ${theme.palette.text.blueLight};
        padding-bottom : 2px;
        text-align:center;
        margin:0;
    `}
  }
  .report {
    ${({ theme }) => `
        color: ${theme.palette.text.blueLight};
        padding-bottom : 2px;
        text-align:left;
        margin:0;
    `}
  }
  .version {
    ${({ theme }) => `
        color: ${theme.palette.text.grey};
        text-align:right;
    `}
  }
`;
