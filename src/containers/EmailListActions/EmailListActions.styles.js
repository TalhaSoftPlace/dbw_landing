import styled from '@emotion/styled';
import { Box  , Menu} from '@mui/material';
import { ReactComponent as All } from '../../images/All.svg';
import { ReactComponent as Delete } from '../../images/Delete.svg';
import { ReactComponent as Inbox } from '../../images/Inbox.svg';
import { ReactComponent as Junk } from '../../images/Junk.svg';
import { ReactComponent as Sent } from '../../images/Sent.svg';
import { ReactComponent as Timed } from '../../images/Timed.svg';
import RefreshIcon from '@mui/icons-material/Refresh';
import StarIcon from '@mui/icons-material/Star';
export const Wrapper = styled(Box)`
  ${({ theme }) => `  
      background-color : ${theme.palette.email.background.bluePrimary};
      .LightIcon{
        color: ${theme.palette.email.text.light};
      }
      .YelloIcon{
        color: ${theme.palette.text.yellow};
      }
    `};
  .seperator {
    ${({ theme }) => `
      border-right: 3px solid ${theme.palette.email.background.dark};
    `};
  }

  .filter {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      display:none;
    }
    `}
  }
  .iconbtn {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      padding-inline:8px !important;
      padding-block:0px !important;
    }
    `}
  }
  .iconbtnpn {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      padding:0px;
    }
    `}
  }
  .css-17slstj-MuiSvgIcon-root {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      width:1em;
    }
    `}
  }
  .MuiMenu-list{
    max-height:400px;
    overflow-y:auto;
  }
`;
export const FilterText = styled(Box)``;
export const StyledMenu = styled(Menu)`
${({ theme }) => `
color: ${theme.palette.email.background.greyDark};
`}

.main-folder{
  width:150px;
  ${({ theme }) => `
color: ${theme.palette.email.background.greyDark};
`}
}
  ul{
    max-height:285px;
    overflow-y:auto;
    ${({ theme }) => `
color: ${theme.palette.email.background.greyDark};
`}
  }
`;

export const AllIcon = styled(All)`
width:18px;
padding-right:10px;
height:18px;
`;
export const DeleteIcon = styled(Delete)`
width:18px;
padding-right:10px;
height:18px;
`;
export const InboxIcon = styled(Inbox)`
width:18px;
padding-right:10px;
height:18px;
`;
export const JunkIcon = styled(Junk)`
width:18px;
padding-right:10px;
height:18px;
`;
export const SentIcon = styled(Sent)`
width:18px;
padding-right:10px;
height:18px;
`;
export const TimedIcon = styled(Timed)`
  width:18px;
  padding-right:10px;
  height:18px;
`;

export const Star = styled(StarIcon)`
width:18px;
padding-right:10px;
height:18px;

${({ theme }) => `
color: ${theme.palette.text.iconColor};
`}
`;

export const RefreshStyledIcon = styled(RefreshIcon)`
    ${({ isfetching }) => `
    ${
      isfetching==='true'
        ? `
        -moz-transition: all .5s linear;
        -webkit-transition: all .5s linear;
        transition: all .5s linear;
        -webkit-transform: rotate(10800deg);
        -webkit-transition-duration: 20s;
        -webkit-animation-timing-function: linear;
        -webkit-animation-iteration-count: infinite;
    `
        : ``
    }
    `};
`;
