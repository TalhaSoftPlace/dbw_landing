import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
export const PrivacyIcon = styled(Box)`
  ${({ theme }) => `
    background-color: ${theme.palette.landingpage.background.primary};
    `}
  h3 {
    ${({ theme }) => `
        color: ${theme.palette.landingpage.text.light};
        font-weight: 400;
        padding-top: 10px;
        margin: 0px 0px 1.5rem 0px ;
      `}
  }
  h4 {
    ${({ theme }) => `
        color: ${theme.palette.landingpage.text.light};
        font-weight: 400;
      `}
  }

  span {
    ${({ theme }) => `
        color: ${theme.palette.landingpage.text.greyLight};
        font-weight: 300;

      `}
    padding-bottom: 2px;
    border-bottom: 1px solid #9aabc9;
  }
`;
export const StyledLink = styled(Link)`
  ${({ theme }) => `
  text-decoration: none;
  color: ${theme.palette.landingpage.text.blueLight};
  `}
`;