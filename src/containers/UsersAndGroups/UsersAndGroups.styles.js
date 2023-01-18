import styled from '@emotion/styled';
import { Box } from '@mui/system';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
export const ErrorIcon = styled(ErrorOutlineIcon)`
  font-size: 70px;
  ${({ theme }) => `
  color: ${theme.palette.text.danger};
  `}
`;
export const Delete = styled(DeleteIcon)`
  font-size: 70px;
  ${({ theme }) => `
  color: ${theme.palette.text.danger};
  `}
`;
export const StyledTabs = styled(ButtonGroup)`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;

export const StyledButton = styled(Button)`
  border-radius: 6px;
  ${({ theme }) => `
  background: ${theme.palette.email.background.dark};
  color: ${theme.palette.text.light};
  &.active {    
    background: ${theme.palette.background.blueLight};
    color: ${theme.palette.email.text.light};
  }
  &:hover {    
    background: ${theme.palette.background.blueLight};
    color: ${theme.palette.email.text.light};
  }
`};
`;

export const StyledSpan = styled(Box)`
  &.suspended {
    opacity: 0.5;
  }
  .online,
  .offline {
    margin-right: 10px;
    display: inline-block;
    height: 12px;
    width: 12px;
    border-radius: 12px;
    ${({ theme }) => `
        background-color: ${theme.palette.background.greenbg};
    `};
  }
  .offline {
    margin-right: 10px;
    ${({ theme }) => `
        background-color: ${theme.palette.background.redbg};
    `};
  }
  ${({ theme }) => `
        color: ${theme.palette.text.light};
    `};
`;

export const Wrapper = styled(Box)`
  padding-top: 20px;
  text-align: end;
`;
export const UserBox = styled(Box)`
  .total-users {
    padding-inline: 20px;
  }
  .pagination {
    display: flex;
    -webkit-display: flex;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
    width: 100%;
  }
`;
