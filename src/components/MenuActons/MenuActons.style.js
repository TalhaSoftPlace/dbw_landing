import styled from '@emotion/styled';
import { Box, Menu } from '@mui/material';
import { Link } from 'react-router-dom';

export const Nav = styled(Box)`
  align-items: center;

  padding-block: 1px;
  font-size: 22px;
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.lg}px){
    flex-direction: column-reverse;
    align-items: start;

    .iconcolor{
      stroke: ${theme.palette.text.greyDark};
    }
    .icontxt{
      font-size:15px;
      color: ${theme.palette.text.light};
      display : inline-flex !important;
    }
    .profile{
      padding-left:10px;
      padding-top: 10px;
    }
    .bt-1-m{
      border-top: 1px solid;
    }
    .linkstyle{
      text-decoration: none;
    }
  }

  @media (min-width: ${theme.breakpoints.values.lg}px){
    .icontxt{
      font-size:18px;
      color: ${theme.palette.text.light};
      display : none;
    }
    .bt-1-m{
      border-top: none;
    }
  }
  
`}
`;

export const WorkSpace = styled(Link)`
  padding: 8px 25px;
  width: 100%;
  ${({ theme }) => `
  background-color: ${theme.palette.background.blueLight};
  color: ${theme.palette.text.light};
  text-decoration: none;
  margin-left:25px;
  border-radius:3px;
  font-size:15px;
`}
`;

export const StyledLink = styled(Link)`
  ${({ theme }) => `
  color: ${theme.palette.text.primaryText};
  text-decoration: none;
  
    @media (max-width: ${theme.breakpoints.values.md}px){
    
    color: ${theme.palette.text.light};
  }
  `}
`;
export const UsernameInfo = styled(Box)`
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 16px;
  padding-right: 16px;
  font-weight: 400;
  font-size: 1.2rem;
  width: 100%;
  ${({ theme }) => `
  background-color: ${theme.palette.background.blueDark};
  color: ${theme.palette.text.light};
    @media (max-width: ${theme.breakpoints.values.md}px){
    font-size:15px;
  }
`}
 font-family: 'Roboto', sans-serif !important;
`;

export const ProfileMenu = styled(Menu)`
  ul {
    padding-top: 0px;
  }
`;
