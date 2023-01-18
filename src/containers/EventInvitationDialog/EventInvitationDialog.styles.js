import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Button } from '../../components';
import { Link } from 'react-router-dom';

export const StyledTable = styled.table`
  font-family: 'Roboto', sans-serif !important;
  th {
    text-align: left;
    padding-right: 10px;
    font-weight: 500;
    ${({ theme }) => `
      color: ${theme.palette.email.text.primaryblue};
      padding-bottom: 15px;
    `};
  }
  td {
    ${({ theme }) => `
      font-weight:normal;
      color: ${theme.palette.email.text.greyText};
      padding-bottom: 15px;
    `};
  }
`;
export const DialogStyled = styled(Dialog)`
  font-family: 'Roboto', sans-serif !important;
  .MuiDialog-paperFullWidth {
    max-width: 1200px !important;
    ${({ theme }) => `
   @media (max-width: ${theme.breakpoints.values.md}px){
    margin:16px;
    width:470px;
   }
    `};
    .MuiDialog-paperFullWidth {
      margin: 0;
      max-width: 660px !important;
      ${({ theme }) => `
    background-image: linear-gradient(${theme.palette.background.primary}, ${theme.palette.background.dark});
    `}
    }
  }
  &.MuiGrid-root.MuiGrid-container {
    padding-left: 15px;
    padding-right: 15px;
    ${({ theme }) => `
    background-image: linear-gradient(${theme.palette.background.primary}, ${theme.palette.background.dark});
    `}
  }

  .notesbox {
    padding: 16px;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      padding-inline: 0px;
    }
    `};
  }
  .notespopupbox {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      
    }
    `};
  }
  .dialogbox {
    ${({ theme }) => `
      border: 1px solid ${theme.palette.text.greyLight};
      background-color: ${theme.palette.text.primary};
    `};
  }
  .tagHeading {
    display: contents;
    font-size: 16px;
    font-weight: 500;
    ${({ theme }) => `
    color: ${theme.palette.text.light};
    `}
  }
  .tagsubheading {
    font-size: 14px;
    font-weight: normal;
    ${({ theme }) => `
    color: ${theme.palette.text.blueLight};
    `}
  }
`;

export const StyledButtonActions = styled(Button)`
  text-transform: none;
  padding-inline: 14px;
  padding-block: 8px;
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.md}px){
    padding-inline: 5px;
    padding-block: 5px;
   }
    `};
`;

export const StyledButtonDate = styled(Button)`
  text-transform: none;
  padding-inline: 14px;
  padding-block: 8px;
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.md}px){
    padding-inline: 5px;
    padding-block: 5px;
   }
    `};
`;

export const CloseIconStyled = styled(CloseIcon)`
  float: right;
  font-size: 18px;
  border-radius: 5px;
  padding: 4px;
  border: 1px solid;
  cursor: pointer;
  ${({ theme }) => `
    color: ${theme.palette.text.blueLight};
    `}
`;

export const DialogTitleStyled = styled(DialogTitle)`
  .tagHeading {
    display: contents;
    font-size: 16px;
    font-weight: 500;
    ${({ theme }) => `
    color: ${theme.palette.text.light};
    `}
  }
  .tagsubheading {
    font-size: 14px;
    font-weight: normal;
    ${({ theme }) => `
    color: ${theme.palette.text.blueLight};
    `}
  }
  .tagValues {
    display: unset;
    font-size: 22px;
    padding-left: 6px;
    font-weight: 400;
  }
  .eventTimeHeading {
    display: contents;
    font-size: 18px;
    font-weight: 700;
  }
  .eventTime {
    display: unset;
    font-size: 18px;
    padding-left: 6px;
    font-weight: 400;
  }
`;

export const Wrapper = styled(Box)`
  th {
    display: inline-block;
  }
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-height: calc(100% - 50px);
  overflow: hidden;
  overflow-y: auto;
  .delete-event {
    padding-left: 10px;
    cursor: pointer;
    ${({ theme }) => `
    color: ${theme.palette.text.danger} !important;
    
    `};
  }

  a {
    text-decoration: underline;
    ${({ theme }) => `
    color: ${theme.palette.text.blueLight} !important;
    
    `};
  }
  .invitationbox {
    ${({ theme }) => `
    background-color: ${theme.palette.email.background.primarybg};
      overflow: hidden;
      overflow-y: auto;
      padding-right: 10px;
      padding-block:0px;
      width: 80%;
      margin: auto;
      margin-bottom: 100px;
     border : 1px solid ${theme.palette.text.grey};
     border-radius: 5px;
     display:flex;
     
    
    `};
  }
  b {
    ${({ theme }) => `
     color : ${theme.palette.text.light};
    `};
  }
  .calendarbox {
    cursor: pointer;
    padding-inline: 15px;
    padding-block: 15px;
    text-align: center;
    ${({ theme }) => `
    border-right: 1px solid ${theme.palette.text.grey};
    background-color: ${theme.palette.background.dark}
    @media (max-width: ${theme.breakpoints.values.md}px){
      padding-inline:10px;
    }
    @media (max-width: ${theme.breakpoints.values.sm}px){
      padding-inline:4px;
      width:100px;
    }
    `};
  }
  .invitecontent {
    padding-inline: 15px;
    padding-block: 15px;
    overflow-x: auto;

    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.sm}px){
      padding-inline:5px;
      max-width: 305px;
    }
    `};
  }
  .IconHeading {
    ${({ theme }) => `
    background-color: ${theme.palette.text.blueLight};
    color: ${theme.palette.email.text.light};
    border-radius: 5px 5px 0px 0px;
    padding-inline:15px;
    `}
  }
  .IconContent {
    ${({ theme }) => `
    font-size:26px;
    background-color: ${theme.palette.email.text.light};
    color: ${theme.palette.text.greyDark};
    padding-inline:15px;
    `}
  }
  .IconFooter {
    ${({ theme }) => `
    background-color: ${theme.palette.email.text.light};
    color: ${theme.palette.text.greyDark};
    padding-inline:15px;
    `}
  }
  .attendeebox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.sm}px) {
      max-width: 280px;
    }
    `}
  }
  .attendeBox {
    max-height: 140px;
    overflow-x: auto;
  }
`;
export const NotesBox = styled(Box)`
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.md}px){
     border : 1px solid ${theme.palette.background.gray};
     background-color: #ccc;
   }
    `};
`;
export const AttendeeBox = styled.span`
  width: 300px;
  ${({ theme }) => `
      color: ${theme.palette.email.text.greyLight};

    `}
`;
export const VerifiedAttendee = styled(CheckCircleOutlineIcon)`
  ${({ theme }) => `
      color: ${theme.palette.background.greenbg};

    `}
`;

export const CancelAttendee = styled(HighlightOffIcon)`
  ${({ theme }) => `
      color: ${theme.palette.background.redbg};

    `}
`;
export const NoResponseAttendee = styled(HelpOutlineIcon)`
  ${({ theme }) => `
      color: ${theme.palette.background.yellowbg};

    `}
`;
export const StyledLink = styled(Link)`
  ${({ theme }) => `
  text-decoration: none;
  `}
`;
