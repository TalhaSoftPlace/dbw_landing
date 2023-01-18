import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { DatePicker as MuiDatePicker } from '@mui/lab';
export const TextFieldStyled = styled(TextField)`
  ${({ theme , labelColor  }) => `

    border: 1px solid ${theme.palette.background.textFieldBorder};
    border-radius:5px;
    background: ${theme.palette.background.light};
    &.dark {
      background: ${theme.palette.background.primary};
      color: ${theme.palette.text.light};
      border: 0px;
      border-radius:4px;
    }
    &.dark > div.MuiOutlinedInput-root{
      color: ${theme.palette.text.light};
        height: 44px;
    }
    height: 44px;
    div.MuiOutlinedInput-root{
      color: ${theme.palette.text.primaryText};
        height: 44px;
    }

    

    `}
`;
export const StyledDatePicker = styled(MuiDatePicker)`
    
    
  }
`;
