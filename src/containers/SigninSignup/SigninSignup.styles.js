import styled from '@emotion/styled';
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '../../components';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const TypographyStyled = styled(Typography)`
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.md}px){
    font-size: 16pt;
  }
  `}
`;

export const Fileds = styled(Box)`
  text-align: left;
  position: relative;
  a {
    text-decoration: none;
    position: relative;
    padding-inline: 10px;
    font-weight: 600;
    font-size: 20px;
    text-align: center;
    ${({ theme }) => `
     color: ${theme.palette.text.blueLight};
  `}
  }
`;

export const StyledTextField = styled(TextField)`
  width: 100%;
  &.left {
    width: 50%;
    fieldset {
      border-radius: 5px 0 0 5px;
    }
  }
  &.right {
    width: 50%;
    fieldset {
      border-radius: 0 5px 5px 0;
    }
  }
  fieldset {
    border-radius: 5px;
  }
  &.filled {
    input {
      ${({ theme }) => `
     background-color: ${theme.palette.background.lightGrey};
     `}
    }
  }
`;
export const Wrapper = styled.div`
  display: flex;
  padding-left: 12px;
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      display: flex !important;
      text-align: center;
    }
    @media (max-width: ${theme.breakpoints.values.sm}px){
      display: flex !important;
      width: 100%;
    }
    color: ${theme.palette.text.blueDark};
  `}
  a,
  span {
    text-decoration: none;
    cursor: pointer;
    padding-inline: 8px;
    ${({ theme }) => `
    color: ${theme.palette.text.light};
  `}
  }
`;

export const LoginButton = styled(Button)`
  ${({ theme }) => `
    border: 1px solid ${theme.palette.text.blueLight};
    height:40px;
    padding: 5px 10px;
    border-radius: 5px;
    @media (max-width: ${theme.breakpoints.values.sm}px){
      padding: 5px;
    }
`}
`;

export const SignupButton = styled(Button)`
  ${({ theme }) => `
    margin-left: 8px;
    height:40px;
    background-color: ${theme.palette.text.blueLight};
    padding: 5px 10px;
    border-radius: 5px;
    @media (max-width: ${theme.breakpoints.values.sm}px){
      padding: 5px;
    }
`}
`;
export const LogoutButton = styled(Box)`
  ${({ theme }) => `
    margin-left: 8px;
    border: 1px solid ${theme.palette.text.blueLight};
    color: ${theme.palette.text.light};
    padding: 10px;
    border-radius: 5px;
    @media (max-width: ${theme.breakpoints.values.sm}px){
      padding: 5px;
    }
`}
`;

export const LogoutwithAvatar = styled(Box)`
  ${({ theme }) => `
    dislplay:inline-flex;
    dislplay:flex;
    padding: 10px;
    width:100%;
    border-radius: 5px;
    color: ${theme.palette.text.light};
    @media (max-width: ${theme.breakpoints.values.sm}px){
      padding: 5px;
    }
`}
`;

export const DialogStyled = styled(Dialog)`
  font-family: 'Roboto', sans-serif !important;
  .MuiDialog-paperFullWidth {
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
