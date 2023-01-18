import styled from '@emotion/styled';
import { OutlinedInput, Typography } from '@mui/material';
import { Button } from '../../components';

export const CardInputWrapper = styled.div`
  border: 1px solid;
  border-radius: 4px;
  padding: 10.5px 14px;
  margin-top: 16px;
  border-color: rgba(0, 0, 0, 0.23);
`;

export const FieldLabel = styled(Typography)`
  ${({ theme }) => `
  color: ${theme.palette.text.primaryText};
  `}
`;

export const OutlinedInputStyled = styled(OutlinedInput)`
  width: 100%;
`;

export const ButtonStyled = styled(Button)`
  width: 340px
`;