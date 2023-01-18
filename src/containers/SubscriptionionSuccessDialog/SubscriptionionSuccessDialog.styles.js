import styled from '@emotion/styled';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '../../components';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
export const DialogStyled = styled(Dialog)`
  font-family: 'Roboto', sans-serif !important;
  .MuiDialog-paperFullWidth {
    border-radius:10px;
    max-width: 450px;
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
  }
`;

export const StyleDialogTitle = styled(DialogTitle)`
  font-size: 16px;
  padding-inline: 10px;
  font-weight: normal;
  border-radius:5px 5px 0px 0px;
  height:40px;
  margin-bottom:20px;
  display:flex;
  align-items: center;
  ${({ theme }) => `
    color: ${theme.palette.text.light};
    background-color: ${theme.palette.text.blueLight};
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
  max-width: 210px;
  cursor: pointer;
  &:disabled {
    opacity: 0.9;
  }
  margin-bottom:30px;
`;
