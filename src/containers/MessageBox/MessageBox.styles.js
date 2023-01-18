import styled from '@emotion/styled';
import { InputLabel, Grid, TextField, Box, IconButton } from '@mui/material';
import Draggable from 'react-draggable';
import SendIcoon from '@mui/icons-material/Send';
export const InputLabelStyles = styled(InputLabel)`
  font-size: 13px;
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.sm}px){
      padding-top: 10px !important;
      font-size: 12px;
    }
  `}
`;

export const ToBccIconButton = styled(IconButton)`
  ${({ theme }) => `
    color: ${theme.palette.text.primaryText};
    font-size: 14px;
    padding: 0px;
    @media (max-width: ${theme.breakpoints.values.sm}px){
      font-size: 12px;
    }
    svg{
      @media (max-width: ${theme.breakpoints.values.sm}px){
        font-size: 16px;
      }
    }
`};
`;
export const SendWrapper = styled(Box)`
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  width: 100%;
`;

export const MobileCloseHeader = styled(Grid)`
  padding: 0px 15px 5px;
  ${({ theme }) => `
    background: ${theme.palette.background.primary};
    border-top: 1px solid ${theme.palette.background.blueLight};
    border-left: 1px solid ${theme.palette.background.blueLight};
    border-right: 1px solid ${theme.palette.background.blueLight};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`};
`;

export const StyledBox = styled(Box)`
  -webkit-transition: all 1s ease-in-out;
  -moz-transition: all 1s ease-in-out;
  -ms-transition: all 1s ease-in-out;
  -o-transition: all 1s ease-in-out;
  transition: all 1s ease-in-out;
  .quill {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      width: 100%;
    }
    `}
  }
  background-color: #fff;
`;

export const MessageBoxTop = styled(Grid, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open, nobordertoponmobile, hasborderbottom }) => ({
  borderLeft: `1px solid ${theme.palette.background.blueLight}`,
  borderRight: `1px solid ${theme.palette.background.blueLight}`,
  ...(open && {
    width: '100%',
  }),
  ...(!nobordertoponmobile === 'treu' && {
    borderTop: `1px solid ${theme.palette.background.lightGray}`,
  }),
  ...(hasborderbottom === 'true' && {
    borderBottomLeftRadius: `10px`,
    borderBottomRightRadius: `10px`,
  }),
  [theme.breakpoints.up('md')]: {
    // paddingTop: '16px',
    ...(!open && {
      width: '680px',
    }),
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    ' label': {
      paddingTop: '0px',
    },
    ' .MuiGrid-item.MuiGrid-grid-xs-12': {
      marginTop: '0px',
    },
    ' .mobileccbcc': {
      paddingBottom: '5px',
    },
  },
  '& .MuiChip-label, .MuiAutocomplete-input, .MuiChip-deleteIcon': {
    color: `${theme.palette.text.primaryText} !important`,
    fontWeight: '400',
  },
  paddingLeft: '24px',
  '.file-types': {
    display: 'none',
  },
}));

export const MessageBoxTBottom = styled(Grid, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open, nobordertoponmobile = false, hasborderbottom = false }) => ({
  borderLeft: `1px solid ${theme.palette.background.blueLight}`,
  borderRight: `1px solid ${theme.palette.background.blueLight}`,
  borderBottom: `1px solid ${theme.palette.background.blueLight}`,
  ...(open && {
    width: '100%',
  }),
  ...(!nobordertoponmobile && {
    borderTop: `1px solid ${theme.palette.background.lightGray}`,
  }),
  ...(hasborderbottom && {
    borderBottomLeftRadius: `10px`,
    borderBottomRightRadius: `10px`,
  }),
  [theme.breakpoints.up('md')]: {
    // paddingTop: '16px',
    ...(!open && {
      width: '680px',
    }),
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    paddingLeft: '16px',
    '.attachmenticon': {
      marginRight: '16px',
    },
    ' label': {
      paddingTop: '0px',
    },
    ' .MuiGrid-item.MuiGrid-grid-xs-12': {
      marginTop: '0px',
    },
    ' .mobileccbcc': {
      paddingBottom: '5px',
    },
  },
  '& .MuiChip-label, .MuiAutocomplete-input, .MuiChip-deleteIcon': {
    color: `${theme.palette.text.primaryText} !important`,
    fontWeight: '400',
  },
  paddingLeft: '24px',
  '.file-types': {
    display: 'none',
  },
  '.fileUploader': {
    border: `0.5px solid ${theme.palette.text.light}`,
  },
  '.fileUploader span': {
    borderBottom: `0.5px solid ${theme.palette.text.primary}`,
  },
  '.fileUploader span span': {
    textDecoration: 'none',
  },
  '.fileUploader label': {
    text: '123',
  },
}));

export const TextFieldStyled = styled(TextField)`
  padding-left: 16px;
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
        padding-left: 0px;
    }
  `};
  .MuiInput-root:before {
    ${({ theme }) => `
  border-bottom: 3px solid ${theme.palette.background.tagsBorder} !important;
  `};
  }
  input {
    ${({ theme }) => `
    color: ${theme.palette.text.primaryText};
    `};
  }
`;

export const BoxStyled = styled(Box, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  position: 'fixed',
  ...(open && {
    width: '95%',
    'z-index': '4444444',
    left: '45px',
  }),
  [theme.breakpoints.down('md')]: {
    position: 'fixed',
    bottom: '5px !important',
    left: '5px !important',
    width: '98%',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
}));

export const Wrapper = styled(Box)`
.MuiAutocomplete-popper {
  ${({ theme }) => `
  color: ${theme.palette.text.primaryText} !important;
  `};
}
  .inner {
    cursor: default;
  }
  .is-disabled {
    border: none !important;
  }

  ${({ theme }) => `
    .eWRUdH {
      z-index: 99999;
      background-color:  ${theme.palette.background.primary};
      color: #fff;
    }
    
  box-shadow: 0 0 6px ${theme.palette.text.grey};
  border-radius: 10px;
  @media (max-width: ${theme.breakpoints.values.md}px){
      &:before {
        content: ""; // ::before and ::after both require content
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: .7;
        z-index: -1;
      }
    }
   .mobile-close-header{
      display:flex;
      -webkit-display: flex;
      -webkit-justify-content: flex-end;
      justify-content: flex-end;
      align-items:end;
    }
    .tobcc{
     -webkit-justify-content: flex-end;
      justify-content: flex-end;
    }
  `}
  .cursor {
    cursor: move;
  }
  .no-cursor {
    cursor: auto;
  }
`;
export const DraggableBox = styled(Draggable)`
  ${({ theme }) => `
@media (max-width: ${theme.breakpoints.values.sm}px){
      transform: translate(0px, 0px) !important;
      .cursor {
        cursor: move;
        transform: translate(0px, 0px) !important;
      }
    }
`}
`;

export const SendIcon = styled(SendIcoon)`
  ${({ theme }) => `
 color:  ${theme.palette.email.text.light} !important;
 fill : ${theme.palette.email.text.light} !important;

 `}
`;

export const EmailView = styled.iframe`
  border: none;
  .text-email {
    white-space: pre-wrap; /* Since CSS 2.1 */
    white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    word-wrap: break-word; /* Internet Explorer 5.5+ */
  }

  padding: 15px;
  width: 100%;
  overflow-x: hidden;
  height: 200px;
  border-radius: 5px 5px 0 0;
  ${({ theme }) => `
  background-color: ${theme.palette.email.text.light};
     color: ${theme.palette.text.primaryText};
      .messageBox {
        display: flex;
        padding: 15px;
        margin-top:20px;
        width:620px;
        height: 100px;
      }
      h5{
        color: ${theme.palette.text.primaryText};
      }
   `}
`;
