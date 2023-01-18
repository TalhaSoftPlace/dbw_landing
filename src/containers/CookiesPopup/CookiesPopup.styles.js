import styled from '@emotion/styled';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle } from '@mui/material';
import { Button } from '../../components';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
export const Wrapper = styled(Box)`
  position:fixed;
  bottom:5%;
  left:3%;
  border-radius:10px;
  padding-top:5px;
  z-index:99;
  padding-inline:8px;
  font-family: 'Roboto', sans-serif !important;
  max-width: 435px;
  font-size:16px;
  line-height:1.5;
  ${({ theme }) => `
  background-image: linear-gradient(${theme.palette.background.bgGradiantStart}, ${theme.palette.background.bgGradiantEnd});
  color:${theme.palette.text.greyDark};
  `}
  
  
  .dialoguecontent {
    font-size:16px;
    display: flex;
    justify-content: ;
    flex-direction: column;
    width: 100%;
    align-items: left;
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
  padding-inline: 5px;
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
  text-decoration:underline;
  `}
`;