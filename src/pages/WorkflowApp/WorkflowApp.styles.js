import { Box } from '@mui/material';
import styled from '@emotion/styled';

export const WorkflowArea = styled(Box)`
  height: calc(100vh - 58px);
  overflow: hidden;
  .workflow-view {
    display: flex;
    flex-direction: row;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      flex-direction: column;
    }
    @media (max-width: ${theme.breakpoints.values.lg}px){
      font-size:10px;
    }
  `};
  }

  .workflow-table {
    height: calc(100vh - 280px);
    overflow: hidden;
    overflow-y: auto;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      max-height: '535px';
    }
  `};
  }
`;
export const StyledSpan = styled(Box)`
  ${({ theme }) => `
        color: ${theme.palette.text.light};
    `};
`;
