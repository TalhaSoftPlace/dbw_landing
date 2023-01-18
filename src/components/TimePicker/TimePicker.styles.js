import styled from '@emotion/styled';
import { TextField } from '@mui/material';

export const TextFieldStyled = styled(TextField)`
    ${({ theme }) => `
    border: 1px solid ${theme.palette.background.textFieldBorder};
    background: ${theme.palette.background.light};
    color: ${theme.palette.text.primaryText};
    height: 44px;
    div.MuiOutlinedInput-root{
        color: ${theme.palette.text.primaryText};
        height: 44px;
    }
    `}
`;