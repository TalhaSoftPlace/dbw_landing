import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { ReactComponent as Workflow } from '../../images/WorkFlowIcon.svg';
export const Wrapper = styled(Box)`
  ${({ theme }) => `
    background-color: ${theme.palette.background.dark};
    border: 2px solid ${theme.palette.background.borderbg};
    @media (max-width: ${theme.breakpoints.values.sm}px){
      margin-inline: 10px;
    }
    `};
  height: calc(100vh - 100px);
  margin: 30px;
  border-radius: 20px;
  overflow: hidden;
  overflow-y: auto;
`;

export const WorkflowsWrapper = styled(Box)`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      gap: 10px;
    }
   
    `}
`;

export const WorkflowItem = styled(Box)`
  cursor: pointer;
  width: 230px;
  height: 110px;
  border-radius: 20px;
  display: flex;

  align-items: center;
  overflow: hidden;

  ${({ theme }) => `
      border: 4px solid ${theme.palette.background.blueLight};
      background-color: ${theme.palette.background.blueLight};
      &.published {
        background-color: ${theme.palette.background.primary};
      }
      @media (max-width: ${theme.breakpoints.values.lg}px){
        width: 200px;
        height: 90px;
      }
      @media (max-width: ${theme.breakpoints.values.sm}px){
        width: 320px;
        height: 90px;
      }
   `};
`;

export const IconWrapper = styled(Box)`
  flex-grow: 0;
  svg {
    margin: 5px auto;
    height: 100px;
    padding-left: 10px;

    ${({ theme }) => `
      @media (max-width: ${theme.breakpoints.values.sm}px){
        margin: 5px auto;
        height: 55px;
        width: 55px;
      }
   `};
  }
`;
export const TextWrapper = styled(Box)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ theme }) => `
      color:${theme.palette.email.text.light};
      @media (max-width: ${theme.breakpoints.values.md}px){
        font-size: 12px;
      }
   `};
  gap: 30px;

  span {
    font-size: 40px;
    margin-top: -56px;

    ${({ theme }) => `
      @media (max-width: ${theme.breakpoints.values.md}px){
        font-size: 25px;
        margin-top: -27px;
      }

      @media (max-width: ${theme.breakpoints.values.sm}px){
        font-size: 25px;
        margin-top: -50px;
      }
   `};
  }
`;
export const WorkflowIcon = styled(Workflow)`
  width: 60px;
  ${({ theme }) => `
      @media (max-width: ${theme.breakpoints.values.sm}px){
        width:40px;
      }
   `};
`;
