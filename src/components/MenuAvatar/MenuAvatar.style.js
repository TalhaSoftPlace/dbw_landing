import styled from '@emotion/styled';
import { Box, Menu,Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactComponent as SettingIcons } from '../../images/Settings.svg';
import { ReactComponent as FeedBackIcons } from '../../images/FeedBack.svg';
export const Nav = styled(Box)`
  align-items: center;
  padding-block: 1px;
  font-size: 22px;
  border-radius: 10px;
  ${({ theme }) => `
  border: 1px solid ${theme.palette.text.greyLight};
  background-color: ${theme.palette.background.primary};

    flex-direction: column-reverse;
    align-items: start;

    .iconcolor{
      fill: ${theme.palette.text.light};

    }
    .materialiconcolor{
      fill: ${theme.palette.text.light};
    }
    .icontxt{
      font-size:15px;
      color: ${theme.palette.text.light};
      display : inline-flex !important;
      font-family: 'Roboto', sans-serif !important;
      cursor: pointer;
    }
    .profile{
      padding-left:10px;
      padding-top: 10px;
    }
    .bt-1{
        border-top: 1px solid ${theme.palette.text.greyLight};
    }
    .linkstyle{
      text-decoration: none;
    }
  
    .disabled-link {
      pointer-events: none;
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
    
      color: ${theme.palette.text.primaryText};
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
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lg}px){
      display: flex;
  }
`}
  background: none;
  ul {
    padding-top: 0px;
    padding-bottom: 0px;
    background: none;
  }
`;

export const ProgressAvatarWrapper = styled(Box)`
  height: 40px;
  width: 40px;
  cursor: pointer;
`;

export const SettingIcon = styled(SettingIcons)`
path{
  ${({ theme }) => `
    fill: ${theme.palette.text.light};
  `}
}
`;

export const FeedBackIcon = styled(FeedBackIcons)`
path{
  ${({ theme }) => `
    fill: ${theme.palette.text.light};
  `}
}
`;

export const StyledAvatar = styled(Avatar)`
${({ theme }) => `
color:${theme.palette.email.text.light};
`}
`;

export const AvatarStyled = styled(Avatar)`
${({ theme }) => `
border: 2px solid ${theme.palette.text.light};
color:${theme.palette.text.light};
`}
`;