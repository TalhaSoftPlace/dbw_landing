import styled from '@emotion/styled';
import { Box, Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const FileUploadButtonWrapper = styled(Box)`
  display: flex;
  button {
    margin-top: 12px;
    width: 200px;
    height: 42px;
    border: none;
    ${({ theme }) => `
            background-color: ${theme.palette.text.darkPrimary};
        `}
  }

  p.no-file {
    font-size: 14px;
    margin-bottom: 0px;
    ${({ theme }) => `
            color: ${theme.palette.background.greyDark};
        `}
  }

  p.file-guide {
    font-size: 11px;
    margin-top: 0px;
    ${({ theme }) => `
            color: ${theme.palette.background.greyDark};
        `}
  }
`;

export const FileInformation = styled(Box)`
  margin-left: 5px;
  margin-top: 12px;
`;

export const LogoUploaderWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

export const LogoPlaceHolderWrapper = styled(Box)`
  margin-top: 20px;
  width: 300px;
  height: 60px;
  border: 1px dashed #707070;
  border-radius: 8px;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: #707070;

  img {
    width: 100%;
    height: 100%;
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

export const DialogStyled = styled(Dialog)`
  font-family: 'Roboto', sans-serif !important;
  .MuiDialog-paperFullWidth {
    ${({ theme }) => `
  background-image: linear-gradient(${theme.palette.background.bgGradiantStart}, ${theme.palette.background.bgGradiantEnd});
  `}
  }
  &.MuiGrid-root.MuiGrid-container {
    padding-left: 15px;
    padding-right: 15px;
  }
`;
