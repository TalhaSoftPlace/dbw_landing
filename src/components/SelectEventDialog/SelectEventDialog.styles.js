import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle, Box , Menu } from '@mui/material';
import { Button } from '../../components';

export const StyledMenu = styled(Menu)`

    .MuiPaper-root{
      margin-left:-100px;
      margin-top:5px;
      ${({ theme }) => `
   @media (max-width: ${theme.breakpoints.values.md}px){
    margin-left:-60px;
   }
    `};
    }
.main-folder{
  width:150px;
}
.main-menu{
  padding:0;
  background-color:transparent !important;
}
.MuiPaper-root , MuiPaper-elevation{
  background-color:transparent !important;
}
  ul{
    max-height:330px;
    overflow:hidden;
    ${({ theme }) => `
    background-color: ${theme.palette.text.primary};
    `}
  }
 
`;

export const DialogStyled = styled(Dialog)`
  font-family: 'Roboto', sans-serif !important;
  .MuiDialog-paperFullWidth {
    max-width: 1200px !important;
    ${({ theme }) => `
   @media (max-width: ${theme.breakpoints.values.md}px){
    margin:16px;
    width:370px;
   }
    `};
    ${({ theme }) => `
    background-image: linear-gradient(${theme.palette.background.bgGradiantStart}, ${theme.palette.background.bgGradiantEnd});
    `}
  }
  &.MuiGrid-root.MuiGrid-container {
    padding-left: 15px;
    padding-right: 15px;
  }
  .notesdata {
    ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.md}px){
    width:100%;
    height:305px;
    padding-left:5px;
   }
    `};
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
    width:100%;
    ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.md}px){
    padding-inline: 0px;
   }
    `};
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
  font-size: 30px;
  cursor: pointer;
  ${({ theme }) => `
    color: ${theme.palette.text.blueLight};
    `}
`;

export const DialogTitleStyled = styled(DialogTitle)`
  .tagHeading {
    display: contents;
    font-size: 22px;
    font-weight: 700;
    ${({ theme }) => `
    color: ${theme.palette.text.primaryText};
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
  display: flex;
  justify-content: space-between;
  .MuiMenu-paper , MuiMenu-root {
    background-color:transparent !important;
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
