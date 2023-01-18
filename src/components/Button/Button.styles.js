import styled from '@emotion/styled';
import { Button } from '@mui/material';

export const StyledButton = styled(Button)`
  padding-block: 14px;
  padding-inline: 15px;
  border-radius: 5px;
  font-size: 14px;
  height: 40px;
  ${({ theme }) => `
  &:hover {
    background-color: ${theme.palette.text.blueDark};
    color: ${theme.palette.email.text.light};
  }
  @media (max-width: ${theme.breakpoints.values.lg}px){
    padding-inline: 15px;
    font-size:12px;
    padding-block: 10px;
  }
  @media (max-width: ${theme.breakpoints.values.sm}px){
    padding-inline: 8px;
    font-size:12px;
    padding-block: 10px;
  }
  
`}
  ${({ theme, variant }) => {
    switch (variant) {
      case 'primary':
        return `
    background-color: ${theme.palette.text.blueLight};
    color: ${theme.palette.email.text.light};
  `;
      case 'link':
        return `
    background-color: ${theme.palette.text.light};
    color: ${theme.palette.text.blueLight}`;

      case 'light':
        return `
    background-color: ${theme.palette.email.text.light};
    color: ${theme.palette.text.blueDark};
  `;

      case 'outlined':
        return `
        color: ${theme.palette.email.text.light};
        &:hover {
          border: 2px solid  ${theme.palette.text.blueLight};
        }
      `;
      case 'outlined-upload':
        return `
        color: ${theme.palette.text.light};
        background-color: ${theme.palette.text.darkPrimary};
        &:hover {
          border: 2px solid  ${theme.palette.text.blueLight};
        }
      `;
      case 'outlined-light':
        return `
        background-color: ${theme.palette.email.text.light};
        color: ${theme.palette.text.blueLight};
        border: 1px solid  ${theme.palette.text.blueLight};
        
  `;
      case 'secondary':
        return `
        background-color: ${theme.palette.email.text.primaryText};
        color: ${theme.palette.email.text.light};
        &:hover {
          background-color: ${theme.palette.text.blueLight};
        }
  `;
      case 'success':
        return `
        background-color: ${theme.palette.background.greenbg};
        color: ${theme.palette.email.text.light};
        &:hover {
          background-color: ${theme.palette.background.greenbglight};
        }
  `;
      case 'danger':
        return `
        background-color: ${theme.palette.background.redbg};
        color: ${theme.palette.email.text.light};
        &:hover {
          background-color: ${theme.palette.background.regbglight};
        }
  `;

      case 'paynow':
        return `
    background-color: ${theme.palette.text.blueLight};
    color: ${theme.palette.email.text.light};
    width: 100%;
    border-radius: 4px;
  `;
      case 'primaryLight':
        return `
        background-color: ${theme.palette.text.blueLight};
        color: ${theme.palette.email.text.light};
        font-size: 16px;
        font-weight: 400;
        padding: 10px 25px;
  `;
      case 'primaryGrey':
        return `
        background-color: ${theme.palette.text.greyLight};
        color: ${theme.palette.email.text.light};
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
