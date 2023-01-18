import styled from '@emotion/styled';
import { Box, InputAdornment, TextField } from '@mui/material';

export const ContentWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 14px 26px;
  height: calc(100% - 100px);
  overflow: hidden;
  overflow-y: auto;
  flex-wrap: wrap;
  ${({ theme }) => `
    background-color: ${theme.palette.background.dark};
    border: 8px solid  ${theme.palette.background.dark};
    color: ${theme.palette.text.light};
    `}
`;

export const Content = styled(Box)`
  padding: 14px 26px;
  width: 900px;
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.sm}px){
        width: 100%;
      }
    `}
`;

export const LogoUploaderWrapper = styled(Box)`
  position: relative;
  margin-top: 20px;
`;

export const IconWrapper = styled(Box)`
  cursor: pointer;
  color: red;
  position: absolute;
  top: 40px;
  right: -30px;
`;

export const TextFieldStyled = styled(TextField)`
  ${({ theme }) => `
      background:  ${theme.palette.text.darkPrimary};
      border-radius: 8px;
      input{
            color: ${theme.palette.text.light};
            padding-block:0px;
            padding-inline:14px;
            font-size: 18px;
            height:47px;
      }
    `}
`;

export const InputAdornmentStyled = styled(InputAdornment)`
  svg {
    ${({ theme }) => `
            color: ${theme.palette.text.light};
            font-size: 26px;
        `}
  }
`;

export const StyledTextarea = styled.textarea`
  min-height: 277px;
  border: none;
  border-radius: 8px;
  width: 100%;
  height: 89%;
  opacity: 1;
  &:focus {
    outline: none;
  }
  padding: 16px 14px;
  ${({ theme }) => `
    background-color: ${theme.palette.text.darkPrimary};
    color: ${theme.palette.text.light};
  `};
  font-size: 1rem;
`;
