import styled from '@emotion/styled';

export const AppStyles = styled.div`
  iframe {
    border: none;
  }
  * {
    font-family: 'Roboto', sans-serif !important;
    box-sizing: border-box;
    word-wrap: break-word;
    /* width */
    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      ${({ theme }) => `
        background: ${theme.palette.background.dark};
    `};
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      ${({ theme }) => `
        background: ${theme.palette.background.lightgrey};
    `};
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      ${({ theme }) => `
        background: ${theme.palette.background.greyLight};
    `};
    }
  }

  .space-between {
    justify-content: space-between;
  }
  .justify-end {
    justify-content: end;
  }
  .tobcc {
    ${({ theme }) => `
    border-bottom: 3px solid  ${theme.palette.background.tagsBorder};
    margin-bottom: 8px;
`};
  }
  .w-33 {
    width: 33%;
  }
  .justify-content-end {
    display: flex;
    justify-content: end;
  }
  .seperator {
    margin: 0;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    /* flex-shrink: 0; */
    border-width: 0;
    border-style: solid;
    ${({ theme }) => `
    border-color: ${theme.palette.background.dark};
    `};

    border-bottom-width: 0;
    height: 100%;
    border-right-width: initial;
  }
  .mailToChip svg,
  .mailToChip span,
  .mailToChip input {
    ${({ theme }) => `
    color: ${theme.palette.text.primaryText};
    `};
  }
  .mailToChip.MuiFormControl-root {
    padding-top: 6px;
  }
  .mailToChip .MuiChip-root {
    ${({ theme }) => `
    background-color: ${theme.palette.text.greyLightChip};
    `};
    font-weight: 300;
    // margin-top: 10px !important;
    // margin-bottom: 10px !important;
    font-size: 13px;
  }

  .pointer {
    cursor: pointer;
  }
  .ql-editor {
    padding: 12px 24px !important;
  }
  .opened > .ql-container > .ql-editor {
    height: calc(100vh - 360px) !important;
  }
  .ql-container.ql-snow {
    border: none !important;
  }
  .w-100 > .ql-container > .ql-editor {
    width: 100% !important;
  }
  .bccShown > .ql-container > .ql-editor {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lg}px){
      height: calc(100vh - 446px) !important;
    }
    @media (max-width: ${theme.breakpoints.values.md}px){
      height: calc(100vh - 436px) !important;
    }
    `}
  }
  .bothopened > .ql-container > .ql-editor {
    height: calc(100vh - 446px) !important;
  }
  .ql-editor::-webkit-scrollbar {
    width: 6px;
  }
  .ql-editor::-webkit-scrollbar-thumb {
    border-radius: 10px;
    ${({ theme }) => `
    background : ${theme.palette.background.primary};
    `};
  }
  .ql-editor::-webkit-scrollbar-track {
    ${({ theme }) => `
      background : ${theme.palette.background.editorBg};
      `};
  }
  .quill > .ql-container > .ql-editor.ql-blank::before {
    ${({ theme }) => `
      color : ${theme.palette.text.greyDarkest};
      `};
    font-weight: 400;
    padding-left: 12px;
  }
  .activeSvgIcon path {
    ${({ theme }) => `
    fill : ${theme.palette.text.blueLight};
    `};
  }
  .nonActiveSvgIcon path {
    ${({ theme }) => `
    fill : ${theme.palette.text.greyDarkest};
    `};
  }

  .quilToolOpened .ql-toolbar {
    display: none;
  }

  .dialogTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h1 {
    font-size: 60px;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lg}px){
      font-size:30px;
      font-weight: 600;
    }
    `}
  }
  h2 {
    font-size: 40px;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lgx}px){
      font-size:35px !important;
      font-weight: 600;
    }
    `}
  }

  h3 {
    ${({ theme }) => `
      @media (max-width: ${theme.breakpoints.values.lg}px){
        font-size:16px;
        font-weight: 600;
      }
      `}
  }
  h4 {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lgx}px){
      font-size:29px;
    }
    @media (max-width: ${theme.breakpoints.values.md}px){
      font-size:18px;
      font-weight: 600;
    }
    `}
  }
  h5 {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      font-size:20px;
    }
    `}
  }
  h6 {
    ${({ theme }) => `
    font-size : 20px;
    @media (max-width: ${theme.breakpoints.values.md}px){
      font-size:12px;
    }
  `}
  }
  .MuiTypography-body1:not(.time) {
    font-size: 18px;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lgx}px){
      font-size:12pt;
    }
    @media (max-width: ${theme.breakpoints.values.md}px){
      font-size:12pt;
    }
  `}
  }
  .MuiTypography-body2 {
    font-size: 13px;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      font-size:12px;
    }
    `}
  }
  .MuiTypography-inherit {
    font-size: 16px;
    font-weight: 300;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      font-size:12px;
    }
    `}
  }
  .fileUploader {
    min-width: auto !important;
    max-width: none !important;
  }
  .fileUploader span {
    ${({ theme }) => `
    color : ${theme.palette.text.dark};
    `};
    font-weight: 500;
  }
  .right {
    width: 100%;
    float: right;
    display: flex;
    justify-content: end;
  }
  .emailViewed {
    ${({ theme }) => `
    color : ${theme.palette.text.light} !important;
    `};
  }

  .mailBoxQuota {
    width: 40px;
  }

  .popup-menu {
    display: none;
  }
  
`;
