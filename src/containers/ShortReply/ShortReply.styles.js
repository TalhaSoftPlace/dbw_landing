import styled from '@emotion/styled';
import { InputLabel, Grid, TextField, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
export const InputLabelStyles = styled(InputLabel)`
  font-size: 13px;
`;

export const MessageBoxHead = styled(Grid)`
  ${({ theme }) => `
    background: ${theme.palette.background.lightGray};
    border-bottom : 1px solid ${theme.palette.text.textLight};
    border-radius:5px 5px 0 0;
    padding:5px;
`};
`;

export const StyledBox = styled(Box)`
  .quill {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      width: 100%;
    }
    `}
  }
`;

export const MessageBoxTop = styled(Grid)(({ theme }) => ({
  borderRadius: ` 0 0  5px 5px `,
  backgroundColor: `${theme.palette.background.lightGrey}`,
  paddingBottom: '8px',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '100%',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
  '& .MuiChip-label, .MuiAutocomplete-input, .MuiChip-deleteIcon': {
    color: `${theme.palette.text.primaryText} !important`,
    fontWeight: '400',
  },

  '.file-types': {
    display: 'none',
  },
  '.fileUploader': {
    border: `0.5px solid ${theme.palette.text.light}`,
    width: '100%',
    height: '40px',
  },
  '.fileUploader span': {
    borderBottom: `0.5px solid ${theme.palette.text.primary}`,
  },
  '.fileUploader span span': {
    textDecoration: 'none',
  },
  '.sendbtn': {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  '.closeIconbox': {
    position: 'absolute',
    top: '0px',
    right: '5px',
  },
}));

export const TextFieldStyled = styled(TextField)`
  ${({ theme }) => `
border-bottom: 0.5px solid ${theme.palette.text.greyDark};
`};
  input {
    color: white;
  }
`;

export const BoxStyled = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    top: '5px',
    left: '5px',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
}));

export const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: 0px;
  rigth: 5px;
  cursor: pointer;
`;
