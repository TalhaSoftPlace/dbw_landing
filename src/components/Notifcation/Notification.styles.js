import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const NotificationMenu = styled(Box)`
  overflow: hidden;
  -webkit-transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
  -ms-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
  z-index: 8;
  top: 50px;
  right: 0px;
  position: absolute;
  ${({ open }) =>
    open === true
      ? `
      width: 370px;
      `
      : `
      width: 0px; `}
  p {
    padding: 6px 0px;
    margin: 0px;
    ${({ theme }) => `
      background: ${theme.palette.background.light};
      color: ${theme.palette.background.dark};
    `}
    font-size: 13px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    text-align: center;
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    button {
      position: absolute;
      right: 5px;
      top: 0px;

      svg {
        font-size: 16px;
      }
    }
  }
  .MuiPaper-elevation {
    background: none;
  }
  .notificationTitle {
    ${({ theme }) => `
    font-size: 16px;
    margin-top: 14px;
    color: ${theme.palette.background.light};
  `}
  }
  .notificationBody {
    ${({ theme }) => `
    font-size: 13px;
    color: ${theme.palette.background.light};
    font-weight: 300;
    padding-bottom: 5px;
  `}
  }
  .borderBotton {
    border-bottom: 1px solid;
  }

  .notificationIcon svg {
    ${({ theme }) => `
    margin-top: 14px;
    color: ${theme.palette.background.light};
    font-size: 20px;
  `}
  }
  .MuiPaper-elevation::-webkit-scrollbar {
    width: 6px;
  }
  .MuiPaper-elevation::-webkit-scrollbar-thumb {
    border-radius: 10px;
    ${({ theme }) => `
        background : ${theme.palette.background.primary};
        `};
  }
  .MuiPaper-elevation::-webkit-scrollbar-track {
    ${({ theme }) => `
          background : ${theme.palette.background.editorBg};
          `};
  }

  ul {
    width: 400px;
    padding: 0px;
    overflow: hidden;
    padding-bottom: 15px;
    margin: 0px;
    background: none;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    p {
      font-family: 'Roboto', sans-serif !important;
      padding: 5px;
      margin: 0px;
      font-size: 13px;
      display: flex;
      justify-content: center;
      ${({ theme }) => `
        background-color: ${theme.palette.background.light};
      `}
    }
    li {
      padding-right: 20px;
      overflow: hidden;
      backdrop-filter: blur(5px);
      ${({ theme }) => `
      @media (max-width: ${theme.breakpoints.values.md}px){
        width:100%;
      }
      background-color: ${theme.palette.email.background.blueLightTransparent};
    `}
    }
  }
`;

export const NotificationWrapper = styled(Box)`
  width: 400px;
`;
