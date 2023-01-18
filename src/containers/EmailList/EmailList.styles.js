import styled from '@emotion/styled';
import { List, ListItem, Avatar } from '@mui/material';
import { Box } from '@mui/system';
import { Button } from '../../components';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import { ReactComponent as SentIcon } from '../../images/profileOUTWARD.svg';
import { ReactComponent as RecievedIcon } from '../../images/profileINWARD.svg';
import StarBorderIcon from '@mui/icons-material/StarBorder';
export const StyledList = styled(List)`
  width: 100%;
  padding-top: 3px;
  height: calc(100vh - 175px);
  overflow: auto;
  ${({ theme }) => `
   @media (max-width: ${theme.breakpoints.values.md}px){
    width: 100vw;
  }
    background-color: ${theme.palette.background.dark};
    color: ${theme.palette.email.text.greyText};
 
 
    `}
`;
export const ItemWrapper = styled(Box)`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
  &.is-thread{
    ${({ theme }) => `
      border: 1px solid ${theme.palette.email.background.blueLight};
      border-bottom: none;
    `}
  }
  ${({ theme, variant }) => {
    switch (variant) {
      case 'unread':
        return `
        font-weight:500 !important;
        background-color: ${theme.palette.email.background.info};
        border-block: 1px solid ${theme.palette.email.background.dark};
        span { font-weight: 500; }
        `;
      case 'read':
        return `   
        border-block: 1px solid ${theme.palette.email.text.textdark};`;
      default:
        return ``;
    }
  }}

  ${({ theme, open }) =>
    open
      ? `
        background-color: ${theme.palette.email.background.openEmail};
        color: ${theme.palette.text.light};
        `
      : ``}
      .threadIcon {
    width: 30px;
    height: 100%;
    text-align: center;
    ${({ theme }) => `
        color: ${theme.palette.text.light};
        @media (max-width: ${theme.breakpoints.values.lg}px){
          left:12%;
        }
        @media (max-width: ${theme.breakpoints.values.sm}px){
          left:15%;
        }
        `}

    .avatarcontent:hover {
      width: 200px;
      color: black;
    }
  }
`;
export const StyledListItem = styled(ListItem)`
  cursor: pointer;
  padding-right: 5px;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 5px;
  width: calc(100% - 53px);
  span {
    width: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .w90 {
    width: 85% !important;
  }
  .w100 {
    width: 100% !important;
  }

  align-items: center;
  ${({ theme  }) => `
  @media (max-width: ${theme.breakpoints.values.lg}px){
    font-size: 12px;
  }
    `}
  .email-subject {
    font-size: 18px;
    display: flex;
    padding-right: 8px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.3;
    ${({ theme }) => `

    @media(max-width: ${theme.breakpoints.values.lg}px)
    {
      font-size: 16px;
      padding-block: 0px;
    }

    @media (max-width: ${theme.breakpoints.values.md}px){
      font-size: 14px;
    }
    `}
  }

  .email-subjectBold{
    font-size: 18px;
    display: flex;
    padding-right: 8px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.3;
    font-weight:500 !important;
    ${({ theme }) => `

    @media(max-width: ${theme.breakpoints.values.lg}px)
    {
      font-size: 16px;
      padding-block: 0px;
    }

    @media (max-width: ${theme.breakpoints.values.md}px){
      font-size: 14px;
    }
    `}
  }
 
`;

export const RightWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  height: 56px;
`;

export const StyledAvatar = styled(Avatar)`
  ${({ color }) => `
      ${color ? `background-color: ${color};` : ''}
      width: 35px;
      height: 35px;
`}
`;

export const StyledButton = styled(Button)`
  height: 16px;
  font-size: 12px;
  padding-inline: 10px;
  width: auto;
  min-width: 16px;
`;
export const EmailIcon = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ theme }) =>
    `
    .LightIcon{
      color: ${theme.palette.text.light};
    }
    .YelloIcon{
      color: ${theme.palette.text.yellow};
    }

`};
`;

export const StyledMonth = styled(Box)`
  ${({ theme }) =>
    `
      padding: 6px;
      color: ${theme.palette.text.light};
      border-block: 1px solid ${theme.palette.email.text.textdark};
      padding-left: 50px; 
      font-weight: 500;
`};
`;
export const StyledEventIcon = styled(EventIcon)`
  ${({ theme }) =>
    `
      color: ${theme.palette.text.light};     
`};
`;
export const StyledTable = styled.table`
  font-family: 'Roboto', sans-serif !important;
  margin: 10px;
  th {
    text-align: right;
    padding-right: 10px;
  }
`;

export const ItemWrapperThread = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: 100%;
  ${({ theme }) => `
      border: 1px solid ${theme.palette.email.background.blueLight};
      border-top: none;
    `}
`;

export const StyledCheckCircleIcon = styled(CheckCircleIcon)`
  width: 35px;
  height: 35px;
`;

export const StyledSentIcon = styled(SentIcon)`
  width: 14px;
  height: 14px;
  ${({ color }) => `

  *{
  fill: ${color ? color : '#ccc'}
  }
  `}
`;
export const StyledRecievedIcon = styled(RecievedIcon)`
  width: 14px;
  height: 14px;
  ${({ color }) => `
  *{
    fill: ${color ? color : '#ccc'}
  }
  `}
`;

export const AvatarContent = styled(Box)`
  .avatar-text {
    height: 35px;
    width: 35px;
    padding: 5px;
    text-align: center;
    line-height: 25px;
    svg {
      height: 25px;
      width: 25px;
    }
  }
  .avatar-icon {
    display: none;
  }
  .avatarcontent {
    &:hover {
      .avatar-text {
        display: none;
      }
    }
  }
`;

export const StarBorderIcons = styled(StarBorderIcon)`

${({ theme }) => `
  *{
  fill: ${theme.palette.text.light}; 
  }
  `}

`;
