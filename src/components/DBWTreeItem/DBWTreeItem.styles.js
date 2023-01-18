import { styled } from '@mui/material/styles';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import { Box, Dialog, Grid, Typography, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const LabelBox = styled(
  Box,
  {}
)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'right',
  alignItems: 'end',
}));

export const StyledTreeItem = styled((props) => <TreeItem {...props} />)(
  ({ theme }) => ({
    '*': {
      flexBasis: 'unset',
    },
    position: 'relative',
    width: '100%',
    '&:after': {
      content: '""',
      width: '20px',
      height: '2.5px',
      position: 'absolute',
      top: '52px',
      left: '-20px',
      backgroundColor: `${theme.palette.text.grey} !important`,
    },
    '&:before': {
      content: '""',
      height: 'calc(100% + 10px)',
      width: '2.5px',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: '-20px',
      backgroundColor: `${theme.palette.text.grey} !important`,
    },

    '&:first-of-type': {
      '&:before': {
        top: '20px',
        height: 'calc(100% - 10px)',
      },
    },
    '&:last-of-type': {
      '&:before': {
        height: '52px',
      },
    },
    '&:only-of-type': {
      '&:before': {
        height: '32px',
      },
    },

    marginBottom: '10px',
    [`& .${treeItemClasses.iconContainer}`]: {
      marginLeft: 20,
      marginRight: 20,
      '& .close': {
        opacity: 0.3,
      },
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 15,
      paddingLeft: 18,
    },

    [`& .${treeItemClasses.content}`]: {
      position: 'relative',
      top: '30px',
      paddingTop: 10,
      paddingBottom: 10,
      marginBottom: '10px',
      paddingLeft: '10px',
      borderRadius: '8px',
      backgroundColor: `${theme.palette.text.darkPrimary}`,
    },
    [`& .${treeItemClasses.selected}`]: {
      backgroundColor: `${theme.palette.background.hoverdark} !important`,
    },
  })
);

export const DialogStyled = styled(Dialog)`
  font-family: 'Roboto', sans-serif !important;
  .MuiDialog-paperFullWidth {
    ${({ theme }) => `
  background-image: linear-gradient(${theme.palette.background.bgGradiantStart}, ${theme.palette.background.bgGradiantEnd});
  background: ${theme.palette.background.dark};
  `}
  }
  &.MuiGrid-root.MuiGrid-container {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export const FieldGrid = styled(Grid)`
  padding-top: 0px !important;
  button {
    ${({ theme }) => `
    color: ${theme.palette.background.light};
    `}
  }
`;

export const FieldLabel = styled(Typography)`
  ${({ theme }) => `
    color: ${theme.palette.text.light};
  `}
  font-size: 16px;
  font-weight: 500;
`;

export const CloseIconStyled = styled(CloseIcon)`
  float: right;
  font-size: 30px;
  cursor: pointer;
  ${({ theme }) => `
    color: ${theme.palette.text.blueLight};
    `}
`;

export const StyledTextField = styled(TextField)`
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    opacity: 1;
  }
  margin-bottom: 20px;
  input {
    padding-left: 6px;
    padding-bottom: 5px;
    padding-top: 10px;
  }
  ${({ theme }) => `
  background-color: ${theme.palette.text.darkPrimary};
  border-radius: 5px;
  height: 42px;
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
