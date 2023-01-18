import styled from '@emotion/styled';
import { Box, TextField } from '@mui/material';

export const SelectWrapper = styled(Box)`
    height: auto;
    .wrapper {
        display: flex;
        justify-content: center;

        .container {
            width: 100%;
            position: relative;
            button {
                border: 0;
                border-radius: 4px;
                width: 100%;
                padding: 6px 8px;
                position: relative;
                text-align: left;
                height: 42px;
                ${({ theme }) => `
                    background: ${theme.palette.text.darkPrimary};
                    color: ${theme.palette.text.light};
                `}
                padding: 12px;
                font-size: 16px;
              }
              
              button:hover {
                cursor: pointer;
              }
              
              button::after {
                position: absolute;
                right: 6px;
                top: 10px;
                content:'';
                height: 20px;
                width: 20px;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSelect-icon MuiSelect-iconOutlined MuiSelect-iconOpen css-bpeome-MuiSvgIcon-root-MuiSelect-icon' focusable='false' aria-hidden='true' viewBox='0 0 24 24' data-testid='ArrowDropDownIcon'%3E%3Cpath fill='%23fff' d='M7 10l5 5 5-5z'%3E%3C/path%3E%3C/svg%3E");
              }
              
              button.expanded::after {
                transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                transform: rotate(180deg);
              }
              ul.option-child{
                list-style: none;
                padding-left: 16px;
              }
              ul.options {
                border-radius: 4px;
                display: none;
                list-style: none;
                padding: 4px 0;
                margin-top: -4px;
                ${({ theme }) => `
                    background: ${theme.palette.background.light};
                    border: 1px solid ${theme.palette.background.light};
                `}
              }
              
              ul.show {
                max-height: 300px;
                overflow: scroll;
                overflow-x: hidden;
                display: block;
                position: absolute;
                z-index: 1;
                width: 100%;
                box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
              }
              
              ul.options li {
                font-size: 14px;
                padding: 6px 12px;
                ${({ theme }) => `
                    color: ${theme.palette.text.primaryText};
                `}
              }
              
              ul.options li:active,
              ul.options li:focus,
              ul.options li:hover,
              ul.options li[aria-selected="true"] {
                ${({ theme }) => `
                    background: ${theme.palette.background.blueLightTransparent};
                `}
                cursor: pointer;
              }

              ul.options li[aria-selected="true"] {
                font-weight: 500;
              }
          }
    }  
`;

export const TextFieldStyled = styled(TextField)`
width: 97%;
margin-left: 10px;
margin-right: 10px;
margin-bottom: 5px;
input {
    padding-left: 6px;
    padding-bottom: 15px;
    padding-top: 15px;
    ${({ theme }) => `
                    color: ${theme.palette.text.primaryText};
                `}

  }
`;


