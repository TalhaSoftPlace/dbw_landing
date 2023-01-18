import styled from '@emotion/styled';
import { Box, TextField } from '@mui/material';

export const Wrapper = styled(Box)`
  margin-top: 24px;
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.md}px) {
    margin-top:10px;
    .notesarea{
      padding-inline:0px;
    }
    .headertext{
      text-align: center;
    }
  }
  background-color: ${theme.palette.background.darkbg};
  border: 2px solid ${theme.palette.email.background.borderLight};
  border-radius: 10px; 
  `}
`;
export const StepWrapper = styled(Box)`
  border-radius: 10px;
  ${({ theme }) => `
    color: ${theme.palette.text.light};
    `}
`;
export const StepHeader = styled(Box)`
  padding-inline: 10px;
  padding-block: 16px;
  display: flex;
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.md}px) {
    padding-inline: 8px;
    padding-block: 0px;
    flex-direction:column;
  }
  span {
    font-size: 14px;
     color: ${theme.palette.text.grey};
  }
  .notes-header{
    width:335px;
    @media (max-width: ${theme.breakpoints.values.md}px) {
      width:150px;
    }
  }
  `}
`;
export const StepContent = styled(Box)`
  position: relative;
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px) {
    padding-inline: 7px;
  }
    `}
`;
export const RightGrid = styled(Box)`
  width:100%;
  align-items: end;
  text-align: end;
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.md}px) {
   padding-top:15px;
  }
  `}
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
