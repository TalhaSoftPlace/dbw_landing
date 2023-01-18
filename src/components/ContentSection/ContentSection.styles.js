import styled from '@emotion/styled';
import { Box, Grid, TextField } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
export const Wrapper = styled(Box)`
  ${({ theme }) => `
  border-radius: 10px;
`}
`;

export const StyledBackIcon = styled(ArrowBackIosIcon)`
  float: left;
  font-size: 17px;
  cursor: pointer;
  margin-right: -5px;
  ${({ theme }) => `
  color: ${theme.palette.text.light};
    @media (max-width: ${theme.breakpoints.values.sm}px){
      padding-top: 3px;
    }
    `}
`;
export const StepWrapper = styled(Box)`
  border-radius: 10px;
  ${({ theme }) => `
    border: 2px solid ${theme.palette.email.background.borderLight};
    background-color: ${theme.palette.background.darkbg};
    color: ${theme.palette.text.light};
    `}
`;
export const StepHeader = styled(Box)`
  padding-inline: 48px;
  padding-top: 24px;
  display: flex;
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.md}px) {
    padding-inline: 10px;
  }
  span {
    font-size: 14px;
     color: ${theme.palette.text.grey};
  }
  `}
`;
export const StepContent = styled(Box)`
  position: relative;
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px) {
    padding-inline: 20px;
  }
  @media (max-width: ${theme.breakpoints.values.sm}px) {
    padding-inline: 2px;
  }
    `}
`;
export const RightGrid = styled(Grid)`
  align-items: end;
  text-align: end;
`;

export const StyledTextField = styled(TextField)`
  margin-bottom: 20px;
  input {
    padding-left: 6px;
  }
  ${({ theme }) => `
  background-color: ${theme.palette.background.primary};
  border-radius: 5px;
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
