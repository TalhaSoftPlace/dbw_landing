import styled from '@emotion/styled';
import { Button } from '..';
import { TextField, Grid, Select, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
export const InfoText = styled.span`
  font-size: 14px;
  ${({ theme }) => `
     color: ${theme.palette.text.grey};
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
export const InfoLabel = styled.span`
  font-size: 14px;
  font-weight: 600;

  ${({ theme, variant }) => {
    switch (variant) {
      case 'sccuess':
        return `
    color: ${theme.palette.text.sccuess};
  `;
      case 'error':
        return `
    color: ${theme.palette.text.error};
  `;
      default:
        return null;
    }
  }}
`;
export const DialogStyled = styled(Dialog)`
  font-family: 'Roboto', sans-serif !important;
  .MuiDialog-paperFullWidth {
    max-width: 500px !important;
    ${({ theme }) => `
    background-image: linear-gradient(${theme.palette.background.bgGradiantStart}, ${theme.palette.background.bgGradiantEnd});
    `}
  }
  &.MuiGrid-root.MuiGrid-container {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export const CloseIconStyled = styled(CloseIcon)`
  float: right;
  font-size: 30px;
  cursor: pointer;
  margin-right: 12px;
  ${({ theme }) => `
    color: ${theme.palette.text.blueLight};
    `}
`;

export const FieldLabel = styled(Box)`
  font-weight: normal;
  font-size: 16px;
`;

export const StyledBox = styled(Box)`
  position: relative;
  margin: 30px;
  margin-bottom: 0px;
  padding-inline: 0px;
  padding-block: 0px;
  padding-bottom: 20px;
  border-radius: 20px;
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.md}px){
  max-width: calc(100vw - 20px);
  margin: 11px;
  margin-bottom: 0px;
  padding: 10px;
    }
  background-color: ${theme.palette.background.darkbg};
  border:2px solid ${theme.palette.email.background.dark};
 
  `};
`;

export const StyledButton = styled(Button)`
  padding-inline: 15px;
  text-transform: none;
  width: 110px;
  border-radius: 5px;
`;

// height: calc(100vh - 100px);

export const Wrapper = styled(Box)`
  ${({ theme }) => `
    color: ${theme.palette.text.light};
  width: 100%;
  overflow: auto;
  margin: 15px;
  margin-bottom: 0px;
  padding-block: 10px;
  
  border-radius: 20px;
  @media (max-width: ${theme.breakpoints.values.lg}px){
      max-width: calc(100vw - 250px);
    }
    @media (max-width: ${theme.breakpoints.values.md}px){
      max-width: calc(100vw - 25px);
      margin:15px;
      overflow-y:scroll;
      padding-block: 20px;
      padding-inline:10px;
    }
    @media (max-width: ${theme.breakpoints.values.sm}px){
      margin:0px;
      padding-inline:5px;
    }
  `}
  .Avtarbox {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .avatarstyle {
    width: 100px;
    height: 100px;
  }
  .Appearance {
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 14px;

    ${({ theme }) => `
    border: 1px solid ${theme.palette.text.grey};
    border-radius: 5px;
    `}
  }
  .AppearanceBox {
    ${({ theme }) => `
    width: 130px;
    height:120px;
    border: 1px solid ${theme.palette.text.greyLight};
    border-radius: 5px;
    margin:10px;
    @media (max-width: ${theme.breakpoints.values.md}px){
    width: 100px;
    height:100px;
    }
    `}
  }
  .wrapper {
    ${({ theme }) => `
    padding-inline: 60px;
    @media (max-width: ${theme.breakpoints.values.md}px) {
      padding-inline: 00px;
    }
    `}
  }
  .active {
    ${({ theme }) => `
    border: 4px solid ${theme.palette.text.blueLight};
    width: 130px;
    height:120px;
    border-radius: 5px;
    margin:10px;
    @media (max-width: ${theme.breakpoints.values.md}px){
    width: 100px;
    height:100px;
    }
    `}
  }
`;

export const FieldGrid = styled(Grid)`
  padding-top: 10px !important;
  ${({ theme }) => `
       @media (max-width: ${theme.breakpoints.values.md}px){
      margin-top:10px;
    }
  `}
  }
`;

export const ButtonGrid = styled(Grid)`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

export const SelectStyled = styled(Select)`
  ${({ theme }) => `
    border: 1 px solid ${theme.palette.background.textFieldBorder}!important;
    background-color: ${theme.palette.text.primary};
    color: ${theme.palette.background.light};
    height: 50px;
    padding-block: 5px;
    border-radius: 4px;


.MuiSelect-icon{
  color: ${theme.palette.background.primary};
}
`}
`;

export const TextFieldStyled = styled(TextField)`
  ${({ theme }) => `
      input {
    height: 12 px!important;
    background-color: ${theme.palette.text.primary};
    color: ${theme.palette.background.light};
    height: 40px;
    padding-block: 5px;
    border-radius: 4px;
    &:focus {
    outline: none;
  }

}

`}
`;
