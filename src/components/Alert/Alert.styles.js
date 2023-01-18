import styled from '@emotion/styled';
import { Alert } from '@mui/material';

export const StyledAlert = styled(Alert)`
  ${({ theme, type }) => {
    switch (type) {
      case 'info':
        return `
          background-color: ${theme.palette.background.info};
          color: ${theme.palette.text.info};
          `;
      case 'warning':
        return `
          background-color: ${theme.palette.background.warning};
          color: ${theme.palette.text.warning};
          .MuiAlert-icon{
            color: ${theme.palette.text.warning};
          }
          `;
      default:
        return ``;
    }
  }}
`;
