import styled from '@emotion/styled';
import { Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';

export const DialogStyled = styled(Dialog)`
  padding: 10px;
  font-family: 'Roboto', sans-serif !important;
  .MuiDialog-paperFullWidth {
    max-width: 1000px !important;
    ${({ theme }) => `
    background-image: linear-gradient(${theme.palette.background.bgGradiantStart}, ${theme.palette.background.bgGradiantEnd});
    `}
  }
`;

export const CloseIconStyled = styled(CloseIcon)`
  font-size: 30px;
  cursor: pointer;
  ${({ theme }) => `
    color: ${theme.palette.text.blueLight};
    `}
`;

export const HistoryWrapper = styled(Box)`
  border-top: 1px solid grey;
  padding-top: 10px;
  p {
    font-size: 14px;
    margin: 2px !important;
    ${({ theme }) => `
         color: ${theme.palette.text.emailLabel};
       `};
  }
  .time {
    padding-inline: 10px;
    ${({ theme }) => `
         color: ${theme.palette.text.blueLight};
       `};
  }
`;
