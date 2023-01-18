import styled from '@emotion/styled';
import { TableCell, TextField } from '@mui/material';

export const StyledTextField = styled(TextField)`
  margin-bottom: 5px;
  input {
    padding-left: 6px;
  }
  ${({ theme }) => `
    background-color: ${theme.palette.background.primary};
    border-radius: 8px;
  * {
     color: ${theme.palette.text.light}  !important;
    }
  `};
  width: 100%;

  fieldset {
    border-radius: 8px;
    border-color: transparent !important;
  }
`;

export const StyledTableCell = styled(TableCell)`
  ${({ theme }) => `
     background-color: ${theme.palette.background.primary};
      color: ${theme.palette.text.light};
      border-bottom: 4px solid ${theme.palette.background.dark};
      font-weight: 300;
     `}
`;
