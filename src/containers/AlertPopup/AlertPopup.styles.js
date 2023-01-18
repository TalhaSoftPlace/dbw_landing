import styled from '@emotion/styled';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle } from '@mui/material';
import { Button } from '../../components';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
export const Wrapper = styled(Box)`
  position:absolute;
  top:7%;
  z-index:1;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
text-align: center;
  border-radius:10px;
  padding:block:15px;
  height:40px;
  padding-inline:15px;
  font-family: 'Roboto', sans-serif !important;
  max-width: 97vw;
  font-size:18px;
  ${({ theme }) => `
  background-color: ${theme.palette.background.regbglight};
  color:${theme.palette.text.dark};
  @media (max-width: ${theme.breakpoints.values.lg}px){ 
    top:8%;
  }
  `}
  
  
  .alertpopup {
    font-size:18px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  } 
  
  .alerttext{
    width: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const StyleDialogTitle = styled(DialogTitle)`
  font-size: 14px;
  padding-inline: 10px;
  font-weight: normal;
  ${({ theme }) => `
  color: ${theme.palette.text.primaryText};
    `}
`;
export const CloseIconStyled = styled(CloseIcon)`
  float: left;
  font-size: 20px;
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


export const StyledButton = styled(Button)`
  cursor: pointer;
  &:disabled {
    opacity: 0.9;
  }
  margin-bottom:10px;
`;
export const StyledLink = styled(Link)`
  ${({ theme }) => `
  text-decoration: none;
  color: ${theme.palette.text.blueLight};
  `}
`;