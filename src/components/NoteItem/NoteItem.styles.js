import styled from '@emotion/styled';
import { Grid, TextField, IconButton, Box, Select } from '@mui/material';

export const MeetingNoteWrapper = styled(Grid)`
  padding-top: 15px;
  &.readonly {
    pointer-events: none;
    opacity: 0.8;
  }
`;

export const Textarea = styled(TextField)`
  width: 100%;
  ${({ theme }) => ` 
        border: 1px solid ${theme.palette.background.textFieldBorder};
        border-radius:5px;
        background-color: ${theme.palette.background.light};
        textarea {
            font-size: 16px;
            font-weight: normal;
        } 
    `};

    textarea{
      
      ${({ theme }) => `
      color: ${theme.palette.text.primaryText};
    `};
    }
`;

export const IconButtonStyled = styled(IconButton)`
  ${({ theme }) => `
    background: ${theme.palette.background.blueLight};
    `};
  &:hover {
    ${({ theme }) => `
          background: ${theme.palette.background.blueLight};
        `};
  }
`;

export const FileIconButton = styled(IconButton)`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const AttachmentWrapper = styled(Box)`
  span {
    position: absolute;
    bottom: 2px;
    left: 15px;
    font-size: 12px;
    font-style: italic;
  }
`;

export const SelectStyled = styled(Select)`
  ${({ theme }) => `
    border: 1px solid ${theme.palette.background.textFieldBorder};
    height: 44px;
    background-color: ${theme.palette.background.light};
  .MuiOutlinedInput-input.MuiInputBase-input{
    color: ${theme.palette.text.primaryText};
  }

    
   
  `}
`;
