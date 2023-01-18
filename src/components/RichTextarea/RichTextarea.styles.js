import styled from '@emotion/styled';
import ReactQuill from 'react-quill';

export const QuilStyled = styled(ReactQuill)`
background: none;
.ql-editor {
  height: 220px;
  border-radius: 8px;
  ${({ muiTheme }) => `
  @media (max-width: ${muiTheme.breakpoints.values.lg}px){
  height: 220px;
  }
  background-color: ${muiTheme.palette.text.darkPrimary};
  color: ${muiTheme.palette.text.light};
  caret-color: ${muiTheme.palette.text.light};
  font-size: 18px;
  @media (max-width: ${muiTheme.breakpoints.values.md}px){
    height: 220px;
    width:100%;
  }
  @media (max-width: ${muiTheme.breakpoints.values.sm}px){
   width: 100%;
  }
  `};
}
position: relative;
.ql-toolbar.ql-snow {
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 375px;
    ${({ muiTheme }) => `
    background: ${muiTheme.palette.text.textLight};
    border: 1px solid ${muiTheme.palette.text.greyDarkest};
    @media (max-width: ${muiTheme.breakpoints.values.sm}px){
      width: auto;
     }
    `};
    border-radius: 10px;
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