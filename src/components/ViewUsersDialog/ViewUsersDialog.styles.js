import styled from '@emotion/styled';
import { Box, Button, Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const DialogStyled = styled(Dialog)`
  font-family: 'Roboto', sans-serif !important;
  .MuiDialog-paperFullWidth {
    max-width: 1000px !important;
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
  ${({ theme }) => `
    color: ${theme.palette.text.blueLight};
    `}
`;

export const StyledButton = styled(Button)`
  height: 24px;
  font-size: 14px;
  margin-left: 40px;
`;

export const StyledSpan = styled(Box)`
  &.suspended {
    opacity: 0.5;
  }
  ${({ theme }) => `
        color: ${theme.palette.text.light};
    `};
`;
