import styled from '@emotion/styled';
import { Box } from '@mui/material';
import InputBase from '@mui/material/InputBase';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.blueDark,
  color: theme.palette.text.light,
  '&:hover': {
    backgroundColor: theme.palette.background.blueDark,
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

export const SearchIconWrapper = styled(Box)`
  padding: 10px;
  height: 100%;
  position: absolute;
  display: flex;
  align-item: center;
  justify-content: center;
`;

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    boxSizing: 'content-box !important',
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '540px',
    },
  },
}));
