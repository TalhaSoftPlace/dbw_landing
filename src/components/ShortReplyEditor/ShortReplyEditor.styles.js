import styled from '@emotion/styled';
import ReactQuill from 'react-quill';

export const ReactQuillStyled = styled(ReactQuill)`
  .ql-editor {
    ${({ muiTheme }) => `
    border-bottom:1px solid ${muiTheme.palette.text.textLight};
    `}
    height:65px;
    width: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    ${({ muiTheme }) => `
    color:${muiTheme.palette.text.textdark};
    background-color: ${muiTheme.palette.background.lightGray};
    caret-color: ${muiTheme.palette.text.primary};
    @media (max-width: ${muiTheme.breakpoints.values.md}px){
      min-height: 90px;
      max-height: 90px;
    }
    @media (max-width: ${muiTheme.breakpoints.values.lg}px){
      min-height: 65px;
      margin-top: 0rem;
    }
    `};
  }
  position: relative;
  .ql-toolbar.ql-snow {
    ${({ muiTheme }) => `
    display:none;
    background: ${muiTheme.palette.text.textdark};
    `};
    border-radius: 10px;
    margin-inline: 10px;
    border: none;
  }

  .ql-toolbar .ql-stroke {
    fill: none;
    ${({ muiTheme }) => `
    stroke: ${muiTheme.palette.text.light};
    `};
  }

  .ql-toolbar .ql-fill {
    ${({ muiTheme }) => `
    fill: ${muiTheme.palette.text.light};
    `};
    stroke: none;
  }

  .ql-toolbar .ql-picker {
    ${({ muiTheme }) => `
    color: ${muiTheme.palette.text.light};
    `};
  }

  .textarea-emoji-control svg {
    display: none;
  }

  .ql-picker-options {
    color: black;
  }

  .ql-picker-options .ql-stroke {
    fill: none !important;
    stroke: black !important;
  }
  .ql-container.ql-snow {
    border: none;
  }
  .ql-editor.ql-blank::before {
    ${({ muiTheme }) => `
    color: ${muiTheme.palette.text.grey}!important;
    `};
  }
`;
