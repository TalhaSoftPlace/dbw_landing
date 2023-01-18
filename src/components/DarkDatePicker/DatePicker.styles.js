import styled from '@emotion/styled';
import { TextField } from '@mui/material';

export const TextFieldStyled = styled(TextField)`
  ${({ theme }) => `
    border: 1px solid ${theme.palette.background.textFieldBorder};
    background: ${theme.palette.background.light};
    &.dark {
      background: ${theme.palette.background.primary};
      input {
      color: ${theme.palette.text.greyLight};
      }
    }
    height: 44px;
    div.MuiOutlinedInput-root{
        height: 44px;
    }
    `}
`;
