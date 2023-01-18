import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
export const DialogStyled = styled(Dialog)`
 .iconspace{
  padding-right:16px;
 }
 .iconspace2{
  padding-right:21px;
 }
  font-family: 'Roboto', sans-serif !important;
  border-radius: 6px;

  ${({ theme }) => `
      color: ${theme.palette.text.textLight};
      @media (max-width: ${theme.breakpoints.values.xs}px){
        .iconspace{
          padding-right:5px;
         }
         .iconspace2{
          padding-right:5px;
         }
      }
    `}
  .MuiDialog-container {
    ${({ position, theme }) => `
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50vw;
        top: 60vh;
  
    `}
    width: 460px;
    height: auto;
  }
  .MuiDialog-paperFullWidth {
    margin: 0;
    max-width: 460px !important;
    width: 90vw !important;
    ${({ theme }) => `
    background-image: linear-gradient(${theme.palette.background.primary}, ${theme.palette.background.dark});
    `}
  }
  &.MuiGrid-root.MuiGrid-container {
    padding: 0;
  }
  .MuiTypography-root,
  MuiDialogContent-root {
    padding: 4px;
  }
  .attendeebox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const CloseIconStyled = styled(CloseIcon)`
  float: right;
  font-size: 18px;
  border-radius: 5px;
  margin: 5px;
  padding: 4px;
  border: 1px solid;
  cursor: pointer;
  ${({ theme }) => `
    color: ${theme.palette.text.blueLight};
    `}
`;

export const DeleteIconStyled = styled(DeleteOutlineIcon)`
  float: right;
  font-size: 18px;
  border-radius: 5px;
  margin: 5px;
  padding: 4px;
  border: 1px solid;
  cursor: pointer;
  ${({ theme, deleting }) => `
    color: ${theme.palette.text.blueLight};
    ${
      deleting === 'true'
        ? `
        cursor: progress;
      `
        : ``
    }
    `}
`;

export const EditIconStyled = styled(ModeEditOutlinedIcon)`
  float: right;
  font-size: 18px;
  border-radius: 5px;
  margin: 5px;
  padding: 4px;
  border: 1px solid;
  cursor: pointer;
  ${({ theme }) => `
    color: ${theme.palette.text.blueLight};
    `}
`;

export const StyledHeading = styled(Typography)`
  font-size: 22px;
  margin-top: -10px;
  font-weight: 500;
  ${({ theme }) => `
      color: ${theme.palette.email.text.greyLight};
    `}
`;

export const StyledTime = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
  margin-top: -8px;
  ${({ theme }) => `
      color: ${theme.palette.email.text.greyLight};
    `}
`;

export const StyledDays = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
  margin-top: -8px;
  ${({ theme }) => `
      color: ${theme.palette.text.greyDark};
    `}
`;

export const StyledBox = styled(Box)`
  margin-top: 10px;
  ${({ theme }) => `
  color: ${theme.palette.email.text.greyLight};
        a {
      color: ${theme.palette.text.blueLight};
      text-decoration: underline;
    }
    `}
`;

export const Response = styled.span``;
export const AttendeeBox = styled.span`
  padding-top: 8px;
  width: 300px;
  ${({ theme }) => `
  color: ${theme.palette.email.text.greyLight};

    `}
`;

export const AttendeeBoxWrapper = styled(Box)`
  overflow-y: auto;
  max-height: 190px;
  width: 100%;
  padding-right: 15px;
  padding-left: 0px;
  ${({ theme }) => `
  color: ${theme.palette.email.text.greyLight};
    `}
`;

export const VerifiedAttendee = styled(CheckCircleOutlineIcon)`
  ${({ theme }) => `
      color: ${theme.palette.background.greenbg};

    `}
`;

export const CancelAttendee = styled(HighlightOffIcon)`
  ${({ theme }) => `
      color: ${theme.palette.background.redbg};

    `}
`;
export const NoResponseAttendee = styled(HelpOutlineIcon)`
  ${({ theme }) => `
      color: ${theme.palette.background.yellowbg};

    `}
`;
