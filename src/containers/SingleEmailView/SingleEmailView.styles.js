import styled from '@emotion/styled';
import { Avatar, List, ListItem, Stack, Menu } from '@mui/material';
import { Box } from '@mui/system';

export const StyledList = styled(List)`
  width: 100%;

  ${({ theme }) => `
    background-color: ${theme.palette.background.primary};
    color: ${theme.palette.text.grey};
    border-top: 1px solid ${theme.palette.background.dark};
    `}
  .primaryheader {
    display: flex;
    justify-content: space-between;
  }
  .subjectdiv {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      padding-left:16px !important;
    }
    `}
  }
  .sendername {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.sm}px){
      white-space: nowrap;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: start;
      align-items: center;
    }
    `}
  }
  .subject-text {
    ${({ theme }) => `
    white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width:610px;
    @media (max-width: ${theme.breakpoints.values.lg}px){
      width:610px;
      height: 100%;
      display: flex;
      justify-content: start;
    }
    @media (max-width: ${theme.breakpoints.values.md}px){
      width:307px;
      white-space: nowrap;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      
    }
    
    `}
  }
  .conversationtext {
    font-size: 16px;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lg}px){
      font-size: 13px;
    }
  
    `}
  }
  .subject {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const EmailHead = styled(Box)`
  min-height: calc(100vh - 200px);
  width: 100%;
  overflow: hidden;
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lg}px){
    min-height: calc(100vh - 210px);
    }
    .back-arrow{
      @media (max-width: ${theme.breakpoints.values.sm}px){
      padding:0px;
      display:flex;
      justify-content: end;
      }
    }
    .back-arrow-right{
      @media (max-width: ${theme.breakpoints.values.sm}px){
      -webkit-display: flex;
      }
      padding:0px;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
    }
   
    
    .eventdialog{
      position: relative;
      height: calc(100vh - 185px);
      padding: 10px;
      overflow: hidden;
      overflow-y: auto;
      background-color:${theme.palette.email.text.icsbg};
      
    }
    `}
  .mobileemailviewAction {
    ${({ theme }) => `
        display:none;
        @media (max-width: ${theme.breakpoints.values.sm}px){
          display:flex;
          width:100%;
          justify-content:flex-end;
        }
      `}
  }
`;

export const StyledListItem = styled(ListItem)`
  align-items: center;
  cursor: pointer;
  padding-bottom: 15px;
  padding-top: 0px;
  padding-left: 5px;
  padding-right: 0px;
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.sm}px){
  padding-left: 10px;
  .avatar {
    min-width: 48px !important;
  }
  `}
  .rightwrapper {
    ${({ theme }) => `
      display:flex;
      @media (max-width: ${theme.breakpoints.values.sm}px){
       display:none;
      }
    `}
  }
`;

export const RightWrapper = styled(Box)`
  align-items: flex-end;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
  gap: 5px;
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.sm}px){
    padding-right:5px;
    justify-content: center;
    -webkit-justify-content: center;
  }
  `}
`;
export const StyledMenu = styled(Menu)`
  ${({ theme }) => `
color: ${theme.palette.email.background.greyDark};
`}

  .main-folder {
    width: 150px;
    ${({ theme }) => `
color: ${theme.palette.email.background.greyDark};
`}
  }
  ul {
    max-height: 285px;
    overflow-y: auto;
    ${({ theme }) => `
color: ${theme.palette.email.background.greyDark};
`}
  }
`;
export const SingleEmailFooter = styled(Box)`
  position: relative;
  bottom: 55px;
  .replybtn {
    padding-inline: 15px;
  }
  .replyButton {
    cursor: pointer;
  }
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.lg}px){
   bottom: 48px;
  }
  @media (max-width: ${theme.breakpoints.values.md}px){
   bottom: 5px;
  }
  @media (max-width: ${theme.breakpoints.values.sm}px){
    bottom: 5px;
   }
 
  `}
`;

export const EmailView = styled.iframe`
  .text-email {
    white-space: pre-wrap; /* Since CSS 2.1 */
    white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    word-wrap: break-word; /* Internet Explorer 5.5+ */
  }

  padding: 15px;
  width: 100%;
  overflow-x: hidden;
  height: calc(100vh - 315px);
  border-radius: 5px 5px 0 0;
  border-left: 0px !important;
  ${({ theme }) => `
  background-color: ${theme.palette.email.text.light};
  @media (max-width: ${theme.breakpoints.values.lg}px){
    height: calc(100vh - 317px);
    padding: 5px
   }
  @media (max-width: ${theme.breakpoints.values.md}px){
   height: calc(100vh - 255px);
  }
  @media (max-width: ${theme.breakpoints.values.md}px){
    height: calc(100vh - 295px);
   }
  
     color: ${theme.palette.text.dark};
      .messageBox {
        display: flex;
        padding: 15px;
        margin-top:20px;
        width:620px;
        height: 100px;
      }
      h5{
        color: ${theme.palette.text.light};
      }
   `}
`;

export const EmailBox = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  ${({ theme }) => `
  .messageBox {
    text-align: center;
    padding: 40px 30px;
    margin-top:10px;
    width:620px;
    border: 1px solid ${theme.palette.text.grey};
    border-radius: 5px;
  }
`}
`;
export const EmailFooterText = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  ${() => `
  .messageBox {
    text-align: center;
    padding-top:30px;
    width:620px;
  }
`}
`;
export const AvatarText = styled(Box)`
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const EmailContent = styled(Box)`
  margin-top: 30px;
  padding-top: 20px;
  width: 100%;
  text-align: left;
  ${({ theme }) => `
        border-top: 1px solid ${theme.palette.text.grey};
  `}
`;
export const SubjectStyle = styled(Box)`
  padding-right: 10px;
  height: 28px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 18px;
  width: 100%;
  min-width: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${({ theme }) => `
  color: ${theme.palette.text.greyLight};
  @media (max-width: ${theme.breakpoints.values.lg}px){
    font-size: 15px;
  }

  `}
`;
export const TimeWrapper = styled(Box)`
  padding-right: 40px;
  ${({ theme }) => `
  color: ${theme.palette.text.greyLight};
  @media (max-width: ${theme.breakpoints.values.lg}px){
    padding-right: 20px;
  }

  `}
`;

export const MessageBoxHeader = styled(Box)``;
export const SingleEmailWrapper = styled(Box)`
  iframe {
    border: none;
  }
  ${({ theme }) => `
    height: 100%;
    background-color: ${theme.palette.background.primary};
    .expand-email-iframe{
      height: calc(100vh - 190px) !important;
      border-left:0px !important;
      @media (max-width: ${theme.breakpoints.values.lg}px){
        height: calc(100vh - 180px) !important;
       }

       @media (max-width: ${theme.breakpoints.values.md}px){
        height: calc(100vh - 150px) !important;
      }

    }
  `}
`;

export const StyledStack = styled(Stack)`
  @keyframes shake {
    0% {
      transform: rotate(0deg);
    }
    10% {
      transform: rotate(-15deg);
    }
    20% {
      transform: rotate(15deg);
    }
    30% {
      transform: rotate(0deg);
    }
    40% {
      transform: rotate(15deg);
    }
    50% {
      transform: rotate(-15deg);
    }
    60% {
      transform: rotate(0deg);
    }
    70% {
      transform: rotate(-15deg);
    }
    80% {
      transform: rotate(15deg);
    }
    90% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-15deg);
    }
  }
  .shake {
    pointer-events: none;
    animation: shake 1s;
    animation-iteration-count: infinite;
  }
  ${({ theme }) => `
    height: 100%;
    @media (max-width: ${theme.breakpoints.values.md}px){
    background-color: ${theme.palette.background.primary};
  }
  `}
  .time {
    text-align: center;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export const StyledAvatar = styled(Avatar)`
  ${({ color }) => `
      ${color ? `background-color: ${color};` : ''}
      width: 35px;
      height: 35px;
`}
`;
