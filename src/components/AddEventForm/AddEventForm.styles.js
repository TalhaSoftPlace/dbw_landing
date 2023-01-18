import styled from '@emotion/styled';
import { TextField, Typography, Grid, Select, Box } from '@mui/material';

export const FieldLabel = styled(Typography)`
  ${({ theme }) => `
    color: ${theme.palette.text.primaryText};
  `}
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: -2px;
  font-weight: 500;
  padding-left: 3px;
`;

export const HelpText = styled(Typography)`
  ${({ theme }) => `
    color: ${theme.palette.text.helptext};
  `}
  font-size: 12px;
  font-weight: 500;
  padding-left: 3px;
`;

export const TextFieldStyled = styled(TextField)`
  ${({ theme }) => `
  color: ${theme.palette.text.primaryText};
    border: 1px solid ${theme.palette.background.textFieldBorder};
    background: ${theme.palette.background.light};
    input{
      height: 12px !important;
      color: ${theme.palette.text.primaryText};
    }
    textarea{
      color: ${theme.palette.text.primaryText};
    }
  `}
`;
export const FieldGrid = styled(Grid)`
  padding-top: 0px !important;
  padding-inline: 4px;
`;

export const SelectStyled = styled(Select)`
  ${({ theme }) => `
    border: 1px solid ${theme.palette.background.textFieldBorder};
    background: ${theme.palette.background.light};
    height: 44px;
    color: ${theme.palette.text.primaryText};
    ul{
      color: ${theme.palette.text.primaryText} !important;
    }
  `}
`;

export const StyledDay = styled(Box)`
  cursor: pointer;
  height: 30px;
  width: 30px;
  font-size: 14px;
  font-weight: 500;
  line-height: 30px;
  border-radius: 50%;
  text-align: center;
  ${({ theme }) => `
  border:1px solid ${theme.palette.background.blueLight};
    background: ${theme.palette.background.textLight};
    color: ${theme.palette.text.primaryText};
    &.selected {
    background: ${theme.palette.background.blueLight};
    color: ${theme.palette.text.textLight};
  }
  `}
`;
