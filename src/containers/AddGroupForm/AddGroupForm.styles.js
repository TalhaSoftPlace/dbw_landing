import styled from '@emotion/styled';
import { Typography, Grid, Box, Button } from '@mui/material';

export const FieldLabel = styled(Typography)`
  ${({ theme }) => `
    color: ${theme.palette.text.light};
  `}
  margin-bottom: 5px;
  font-weight: 400;
`;

export const BoxStyled = styled(Box)`
  ${({ theme }) => `
    position: relative;
    border-radius: 5px;
    background: ${theme.palette.text.darkPrimary};
    padding: 15px;
    height: 230px;
    max-height: 250px;
    overflow-y: auto;
    margin-bottom: 5px;
    padding-top: 5px;
  `}
`;

export const StyledButton = styled(Button)`
  padding-block: 14px;
  padding-inline: 35px;
  border-radius: 10px;
  font-size: 16px;
  ${({ theme }) => `
  &:hover {
    background-color: ${theme.palette.text.blueDark};
    color: ${theme.palette.text.light};
  }
  @media (max-width: ${theme.breakpoints.values.lg}px){
    padding-inline: 15px;
    font-size:12px;
    padding-block: 10px;
    position: relative;
    top: 10px;
  }
  
`}
  ${({ theme, variant }) => {
    switch (variant) {
      case 'primary':
        return `
    background-color: ${theme.palette.text.blueLight};
    color: ${theme.palette.text.light};
  `;
      case 'link':
        return `
    background-color: ${theme.palette.text.light};
    color: ${theme.palette.text.blueLight}`;

      case 'light':
        return `
    background-color: ${theme.palette.text.light};
    color: ${theme.palette.text.blueDark};
  `;

      case 'outlined':
        return `
        color: ${theme.palette.text.light};
        &:hover {
          border: 2px solid  ${theme.palette.text.blueLight};
        }
  `;
      case 'outlined-light':
        return `
        background-color: ${theme.palette.text.light};
        color: ${theme.palette.text.blueLight};
        border: 1px solid  ${theme.palette.text.blueLight};
        
  `;
      case 'secondary':
        return `
        background-color: ${theme.palette.text.primary};
        color: ${theme.palette.text.light};
        &:hover {
          background-color: ${theme.palette.text.blueLight};
        }
  `;

      case 'paynow':
        return `
    background-color: ${theme.palette.text.blueLight};
    color: ${theme.palette.text.light};
    width: 100%;
    border-radius: 4px;
  `;
      case 'primaryLight':
        return `
        background-color: ${theme.palette.text.blueLight};
        color: ${theme.palette.text.light};
        font-size: 16px;
        font-weight: 400;
        padding: 10px 25px;
  `;
      case 'primaryGrey':
        return `
        background-color: ${theme.palette.text.greyLight};
        color: ${theme.palette.text.light};
        font-size: 16px;
        font-weight: 400;
        padding: 10px 25px;
  `;

      case 'default':
        return `
    background-color: ${theme.palette.background.greyDark};
    color: ${theme.palette.text.greyLight};
  `;
      default:
        return `
    color: ${theme.palette.text.light};
  `;
    }
  }}

  ${({ theme, size }) => {
    switch (size) {
      case 'small':
        return `
        padding: 5px !important;
  `;
      case 'mini':
        return `
        font-size: 15px;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 6px;
        padding-bottom: 6px;
        border-radius: 4px !important;
        font-weight: 300;
  `;
      default:
        return `
  `;
      case 'large':
        return `
    padding-inline: 25% !important;
`;
    }
  }}

  ${({ theme, texttransform }) => {
    switch (texttransform) {
      case 'none':
        return `
            text-transform: none;
      `;
      default:
        return `
          text-transform: uppercase;
  `;
    }
  }}
`;

export const ColumnGrid = styled(Grid)`
  padding-top: 0px !important;
  margin-bottom: 10px;
`;

export const GroupNameInput = styled.input`
  height: 50px;
  border: none;
  border-radius: 8px;
  opacity: 1;
  width: 100%;
  margin-bottom: 20px;
  &:focus {
    outline: none;
  }
  padding: 16px 14px;
  ${({ theme }) => `
    background-color: ${theme.palette.text.darkPrimary};
    color: ${theme.palette.text.light};
  `};
  font-size: 1rem;
`;

export const GroupDescriptionInput = styled.textarea`
  min-height: 277px;
  border: none;
  border-radius: 8px;
  width: 100%;
  height: 89%;
  opacity: 1;
  &:focus {
    outline: none;
  }
  padding: 16px 14px;
  ${({ theme }) => `
    background-color: ${theme.palette.text.darkPrimary};
    color: ${theme.palette.text.light};
  `};
  font-size: 1rem;
`;
