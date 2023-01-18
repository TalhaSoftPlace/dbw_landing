import styled from '@emotion/styled';
import { Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 220px);
  background-color: #fff;
  iframe {
    border: none;
    width: 100%;
    height: calc(100vh - 231px);
    position: relative;
    z-index: 2;
  }
`;

export const DialogStyled = styled(Dialog)`
  font-family: 'Roboto', sans-serif !important;
  .MuiDialog-paperFullWidth {
    ${({ theme }) => `
  background-image: linear-gradient(${theme.palette.background.bgGradiantStart}, ${theme.palette.background.bgGradiantEnd});
  background: ${theme.palette.background.dark};
  `}
  }
  &.MuiBox-root {
    border-radius: 0px;
    height: 60px;
  }
`;

export const CloseIconStyled = styled(CloseIcon)`
  font-size: 30px;
  cursor: pointer;
  ${({ theme }) => `
     color: ${theme.palette.email.text.primaryText};
  `}
`;
