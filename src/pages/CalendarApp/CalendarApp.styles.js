import { Box } from '@mui/material';
import styled from '@emotion/styled';

export const SidePanel = styled(Box)`
  height: calc(100vh - 58px);
  width: 340px;
  flex-grow: 0;
  ${({ theme }) => `
    background-color: ${theme.palette.background.dark};
  `};
`;
export const CalendarArea = styled(Box)`
  height: calc(100vh - 58px);
  max-width: 100vw;
  overflow: hidden;
  ${({ theme }) => `
  .calendarview {
    display: flex;
    flex-direction: row;
    @media (max-width: ${theme.breakpoints.values.md}px){
      flex-direction: column;
    }
  }
  .calendarrightpanel{
    flex-grow : 1;
    width:100%;
  }
    
    
  `};
`;
