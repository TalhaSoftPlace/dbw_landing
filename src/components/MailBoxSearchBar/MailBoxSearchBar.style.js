import styled from '@emotion/styled';
import { Box } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.blueDark,
  color: theme.palette.text.light,
  paddingRight: '20px',
  '&:hover': {
    backgroundColor: theme.palette.background.blueDark,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  '& .icon': {
    marginTop: '13px',
  },
}));

export const SearchIconWrapper = styled(Box)`
  padding: 10px;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: start;
  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.values.lg}px)
    { 
      padding: 6px 10px;
    }
  `}}
`;

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  position: 'relative',
  width:'100%',
  '& .MuiInputBase-input': {
    boxSizing: 'content-box !important',
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export const CloseIconStyled = styled(CloseIcon)`
  top: 5px;
  right: 10px;
  font-size: 30px;
  position: absolute;
  cursor: pointer;
  ${({ theme }) => `
    color: ${theme.palette.text.blueLight};
    `}
`;

export const SearchResult = styled(Box)`
    position: absolute;
    top: 99px;
    left: 233px;
    max-height: 465px;
    width: 398px;
    z-index: 1;
    overflow: hidden;
    border-radius: 0px 0px 5px 5px;
    box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lg}px){
    top: 88px;
    left: 183px;
    max-height: 465px;
    width: 398px;
  }
  @media (max-width: ${theme.breakpoints.values.md}px){
      top: 88px;
      left: 6px;
      max-height: 465px;
      width: 446px;
    }
  @media (max-width: ${theme.breakpoints.values.sm}px){
    top: 88px;
    left: 6px;
    max-height: 465px;
    width: 374px;
  }
     color:${theme.palette.text.light};
     background-color:${theme.palette.text.searchDark};
    
    
  .searchitem{
    
    padding-block: 5px; 
    margin: 0px;
  }
  .emailbox{
    max-height: 370px;
    overflow-x:auto;
  }
   `}
}
`;
export const StyledListItem = styled(ListItemText)`
  cursor: pointer;
  padding-block: 5px;
  width: calc(100% - 42px);
  font-size: 16px;
  span {
    width: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  align-items: center;
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.lg}px){
    font-size: 14px;
  }
    `}
  .email-subject {
    font-size: 16px;
    width: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    ${({ theme }) => `

    @media(max-width: ${theme.breakpoints.values.lg}px)
    {
      font-size: 14px;
      padding-block: 0px;
    }

    @media (max-width: ${theme.breakpoints.values.md}px){
      font-size: 14px;
    `}
  }
  ${({ theme }) => `  
  .subject {
    margin-top: 15px;
    width: 95%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
     @media(max-width: ${theme.breakpoints.values.lg}px)
    {
      font-size: 14px;
      padding-block: 0px;
    }

    @media (max-width: ${theme.breakpoints.values.md}px){
      font-size: 14px;
  }
  }
`}
  padding-block: 3px;
`;
export const SingleSearch = styled(Box)`
  display: flex;
  padding-inline: 10px;
  ${({ theme }) => ` 
  border-bottom:1px solid ${theme.palette.background.lightGrey};
  &:hover {
    background-color: ${theme.palette.text.darkPrimary};
    color: ${theme.palette.text.light};
  }
  `}
`;
export const RightWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
`;
