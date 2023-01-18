import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { ReactComponent as Workflow } from '../../images/WorkFlowIcon.svg';
export const FormbuilderWrapper = styled(Box)`
  * {
    color: black !important;
  }
  height: calc(100vh - 370px);
  position: relative;
  iframe {
    height: 100%;
    width: 100%;
  }
`;

export const FormModal = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
`;
export const WorkflowIcon = styled(Workflow)`
width:60px;
${({ theme }) => `
      @media (max-width: ${theme.breakpoints.values.lg}px){
        width:40px;
      }
   `};

`;