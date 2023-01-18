import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, Grid, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
export const BoxStyled = styled(Box)`
  overflow: hidden;
  overflow-y: auto;
  height: calc(100vh - 120px);
  font-family: 'Roboto', sans-serif !important;
  &.readonly {
    pointer-events: none;
    opacity: 0.8;
  }
  .MuiDialog-paperFullWidth {
    max-width: 1200px !important;
    ${({ theme }) => `import { Box } from '@mui/material/Box';

    background-image: linear-gradient(${theme.palette.background.bgGradiantStart}, ${theme.palette.background.bgGradiantEnd});
    `}
  }
  &.MuiGrid-root.MuiGrid-container {
    padding-left: 15px;
    padding-right: 15px;
  }
  .notesHeading {
    font-weight: 500;
    font-family: 'Roboto', sans-serif !important;
    padding-left: 20px;
  }
`;

export const CloseIconStyled = styled(CloseIcon)`
  float: right;
  font-size: 30px;
  cursor: pointer;
  ${({ theme }) => `
    color: ${theme.palette.text.blueLight};
    `}
`;

export const DialogTitleStyled = styled(Box)`
  ${({ theme }) => `
    color: ${theme.palette.text.dark};
`};
  .descHeading {
    display: contents;
    font-weight: 500;
  }

  .descValues {
    display: unset;
    padding-left: 6px;
    font-weight: normal;
  }

  .tagHeading {
    display: contents;
    font-weight: 500;
  }

  .tagValues {
    display: unset;
    padding-left: 6px;
    font-weight: normal;
  }
  .eventTimeHeading {
    display: contents;
    font-weight: 500;
  }

  .eventTime {
    display: unset;
    padding-left: 6px;
    font-weight: normal;
  }
`;

export const NoteItemsWrapper = styled(Box)`
  padding: 5px;
  overflow: hidden;
  overflow-y: auto; 
  height: calc(100vh - 250px);
  width:100%;
  margin-bottom: 15px;
  border-radius: 5px;
  ${({ theme }) => `
    border: 1px solid ${theme.palette.background.textFieldBorder};
    background: ${theme.palette.background.light};
    `};
`;

export const IconButtonStyled = styled(IconButton)`
  margin-top: 10px;
  ${({ theme }) => `
    background: ${theme.palette.background.blueLight};
    `};
  &:hover {
    ${({ theme }) => `
             background: ${theme.palette.background.blueLight};
        `};
  }
`;

export const AddIconStyled = styled(AddIcon)`
  ${({ theme }) => `
    color: ${theme.palette.background.light};
    `};
  &:hover {
    ${({ theme }) => `
        color: ${theme.palette.background.light};
        `};
  }
`;
export const FieldGrid = styled(Grid)`
  padding-top: 0px !important;
  padding-inline: 4px;
`;

export const FieldLabel = styled(Typography)`
  ${({ theme }) => `
    color: ${theme.palette.background.dark};
  `}
  font-size: 16px;
  font-weight: 500;
  padding-left: 3px;
`;

export const DialogStyled = styled(Dialog)`
  font-family: 'Roboto', sans-serif !important;
  .MuiDialog-paperFullWidth {
    ${({ theme }) => `
    color: ${theme.palette.text.PrimaryText};
  background-image: linear-gradient(${theme.palette.background.bgGradiantStart}, ${theme.palette.background.bgGradiantEnd});
  `}
  }
  &.MuiGrid-root.MuiGrid-container {
    padding-left: 15px;
    padding-right: 15px;
  }
`;
