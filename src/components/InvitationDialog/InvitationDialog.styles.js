import styled from '@emotion/styled';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '..';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import invitationPopup from '../../images/invitationPopup.png';
import { ReactComponent as Logoicon} from '../../images/logoIcon.svg';
import  BGIcon from '../../images/BGIcon.svg';
export const TypographyStyled = styled(Typography)`
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.md}px){
    font-size: 14px;
  }
  `}
`;
export const DialogStyled = styled(Dialog)`
   font-family: 'Roboto', sans-serif !important;
  .MuiDialog-paperFullWidth {
    max-width: 650px;
    overflow: hidden;
    ${({ theme }) => `
  background-image: linear-gradient(${theme.palette.background.bgGradiantStart}, ${theme.palette.background.bgGradiantEnd});
  background: ${theme.palette.background.light};
  color:${theme.palette.text.primary};
  `}
  }
  &.MuiGrid-root.MuiGrid-container {
    padding-left: 15px;
    padding-right: 15px;
  } 
  .dialoguecontent {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    align-items: center;
    ${({ theme }) => `
  background-image: url(${BGIcon});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  `}
  }
`;

export const StyleDialogTitle = styled(DialogTitle)`
background-image: url(${invitationPopup});
    background-size:contain;
    height:227px;
    width : 100%;
    background-repeat: no-repeat;
    background-position: center;
  font-size: 14px;
  padding-inline: 10px;
  font-weight: normal;
  overflow: hidden;
  padding:none;
  ${({ theme }) => `
  color: ${theme.palette.text.primaryText};
    @media (max-width: ${theme.breakpoints.values.md}px){
      height:180px;
      background-size:cover;
    }
    `}
`;
export const CloseIconStyled = styled(CloseIcon)`
  float: left;
  font-size: 30px;
  cursor: pointer;

  ${({ theme }) => `
  color: ${theme.palette.text.primaryText};
    `}
`;
export const StyledBackIcon = styled(ArrowBackIosIcon)`
  float: left;
  font-size: 17px;
  cursor: pointer;
  padding-top: 8px;
  margin-right: -5px;
  ${({ theme }) => `
  color: ${theme.palette.text.primaryText};
    @media (max-width: ${theme.breakpoints.values.sm}px){
      padding-top: 3px;
    }
    `}
`;
export const StyledSpan = styled(Box)`
  ${({ theme }) => `
        color: ${theme.palette.text.light};
        cursor:pointer;
        font-size:14px;
    `};
`;
export const StyledSpanHeader = styled(Box)`
  ${({ theme }) => `
        color: ${theme.palette.text.light};
        cursor:pointer;
        font-size:16px;
    `};
`;
export const NotesList = styled(Box)`
  overflow: hidden;
  overflow-y: auto;
  height: calc(100vh - 290px);
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.sm}px){ 
    height: calc(100vh - 353px);
  }
  `}
`;
export const NotesviewStyledBox = styled(Box)`
  position: relative;
  margin: 30px;
  margin-bottom: 0px;
  padding-inline: 10px;
  padding-top: 10px;
  border-radius: 20px;
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.md}px){ 
  max-width: calc(100vw - 20px);
  margin: 11px;
  margin-bottom: 0px;
  padding: 10px;
    }
  background-image: linear-gradient(${theme.palette.background.bgGradiantStart}, ${theme.palette.background.bgGradiantEnd});
    * { 
        font-family: 'Roboto', sans-serif !important;
        border-color: ${theme.palette.background.textFieldBorder} !important;
    }
      .headingborder {
      border-bottom: 2px solid ${theme.palette.text.primary} !important;
  }
  .pagination{
    display:flex;
    -webkit-display:flex;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
    width:100%;
  }
  `};
`;

export const Delete = styled(DeleteIcon)`
  font-size: 70px;
  ${({ theme }) => `
  color: ${theme.palette.text.danger};
  `}
`;
export const StyledButton = styled(Button)`
  width: 110px;
  cursor: pointer;
`;
export const LogoIcon = styled(Logoicon)`
height:40px;
`;