import styled from '@emotion/styled';
import { TextField, Box } from '@mui/material';

export const Wrapper = styled(Box)`
  .container {
    margin: auto;
    padding: 100px 0;
    min-height: 100vh;
  }

  .wrap {
    margin: auto;
    max-width: 400px;
    border-radius: 8px;
    ${({ theme }) => `
    background: ${theme.palette.background.light};
    `}
    padding: 32px;
  }

  .card {
    margin-top: 16px;
  }
  .field {
    position: relative;
    margin-bottom: 32px;
  }
  .fields {
    display: flex;
    margin-left: -16px;
  }
  .fields .field {
    flex: 1;
    margin-left: 16px;
  }
  .label {
    font-size: 12px;
    font-weight: 500;
    ${({ theme }) => `
    color: ${theme.palette.text.primaryText};
    `}
    position: absolute;
    top: 0.25rem;
    pointer-events: none;
    padding-left: 0.125rem;
    z-index: 1;
    font-weight: normal;
    -webkit-transition: all 0.28s ease;
    transition: all 0.28s ease;
  }
  .input {
    width: 100%;
    display: block;
    background: transparent;
    border-radius: 0;
    border: none;
    padding: 4px 2px;
    border-width: 0;
    border-color: transparent;
    ${({ theme }) => `
    color: ${theme.palette.text.primaryText};
    `}
    font-size: 16px;
    font-family: inherit;
    font-weight: 500;
    transition: 0.2s;
    cursor: text;
    -webkit-transition: all 0.28s ease;
    transition: all 0.28s ease;
    box-shadow: none;
  }
  .input::placeholder {
    color: red !important;
    font-size: 0px;
    opacity: 0;
  }
  .input:focus::placeholder {
    ${({ theme }) => `
    color: ${theme.palette.text.primaryText};
    `}
  }

  .input:focus ~ .label,
  .input.focus ~ .label,
  .input.val ~ .label,
  .input.complete ~ .label,
  .input.invalid ~ .label {
    font-size: 0.8rem;
    ${({ theme }) => `
    color: ${theme.palette.text.primaryText};
    `}
    top: -1rem;
    left: 0;
  }
  .bar {
    position: relative;
    ${({ theme }) => `
    border-bottom: 0.0625rem solid ${theme.palette.background.greyDark};
    `}
    display: block;
  }
  .bar::before {
    content: '';
    height: 0.125rem;
    width: 0;
    left: 50%;
    bottom: -0.0625rem;
    position: absolute;
    ${({ theme }) => `
    background: ${theme.palette.background.blueDark};
    `}
    -webkit-transition: left 0.28s ease, width 0.28s ease;
    transition: left 0.28s ease, width 0.28s ease;
    z-index: 2;
  }
  .input:focus ~ .bar::before,
  .input.focus ~ .bar::before {
    width: 100%;
    left: 0;
  }

  .wrap .token {
    ${({ theme }) => `
    color: ${theme.palette.text.primaryText};
    `}
    padding: 10px;
    text-align: center;
    font-weight: 500;
  }

  .wrap .error {
    ${({ theme }) => `
    color: ${theme.palette.text.error};
    `}
    padding: 10px;
    text-align: center;
    font-weight: 500;
  }
`;

export const StyledTextField = styled(TextField)`
  ${({ theme, success }) => {
    if (success !== undefined)
      return `
  * {
     color: ${
       success === 'true'
         ? theme.palette.text.sccuess
         : theme.palette.text.error
     }  !important;
    }
  `;
  }}
  width: 100%;
  &.left {
    width: 50%;
    fieldset {
      border-radius: 5px 0 0 5px;
    }
  }
  &.right {
    width: 50%;
    fieldset {
      border-radius: 0 5px 5px 0;
    }
  }
  fieldset {
    border-radius: 5px;
  }
  &.filled {
    input {
      ${({ theme }) => `
     background-color: ${theme.palette.background.lightGray};
     `}
    }
  }
`;
