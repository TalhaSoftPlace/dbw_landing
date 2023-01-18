import styled from '@emotion/styled';
import ReactQuill from 'react-quill';

export const ReactQuillStyled = styled(ReactQuill)`
  background: none;
  .ql-editor {
    height: calc(100vh - 340px);
    ${({ isemail }) =>
      isemail
        ? `
    height: calc(100vh - 550px);
    `
        : ``}
    width: 680px;
    overflow-y: scroll;
    ${({ muiTheme, isemail }) => `
    border-left: 1px solid ${muiTheme.palette.background.blueLight};
    border-right: 1px solid ${muiTheme.palette.background.blueLight};
    @media (max-width: ${muiTheme.breakpoints.values.lg}px){
    height: calc(100vh - 400px);
    ${
      isemail
        ? `
    height: calc(100vh - 610px);
    `
        : ``
    }
    }
    color:${muiTheme.palette.text.textdark};
    background-color: ${muiTheme.palette.background.light};
    caret-color: ${muiTheme.palette.text.primaryText};
    @media (max-width: ${muiTheme.breakpoints.values.md}px){
        height: calc(100vh - 300px);
    ${
      isemail
        ? `
    height: calc(100vh - 510px);
    `
        : ``
    }
      width:100%;
    }
    @media (max-width: ${muiTheme.breakpoints.values.sm}px){
     width: 100%;
    }
    `};
  }
  position: relative;
  .ql-toolbar.ql-snow {
    margin: 0px 25px !important;
    position: absolute;
    ${({ muiTheme }) => `
    background: ${muiTheme.palette.text.textLight};
    border: 1px solid ${muiTheme.palette.text.greyDarkest};
    `};
    border-radius: 10px;
    margin-inline: 10px;
    z-index: 5;
    bottom: 10px;
  }

  .ql-toolbar .ql-stroke {
    fill: none;
    ${({ muiTheme }) => `
    stroke: ${muiTheme.palette.text.greyDarkest};
    `};
  }

  .ql-toolbar .ql-fill {
    ${({ muiTheme }) => `
    fill: ${muiTheme.palette.text.greyDarkest};
    `};
    stroke: none;
  }

  .ql-toolbar .ql-picker {
    ${({ muiTheme }) => `
    color: ${muiTheme.palette.text.greyDarkest};
    `};
  }

  .textarea-emoji-control svg {
    display: none;
  }

  .ql-picker-options {
    color: black;
  }
  .ql-editor.ql-blank::before {
    ${({ muiTheme }) => `
    color: ${muiTheme.palette.text.grey}!important;
    `};
  }
  .ql-picker-options .ql-stroke {
    fill: none !important;
    stroke: black !important;
  }
`;
