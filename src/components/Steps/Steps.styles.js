import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StepWrapper = styled(Box)`
  * {
    margin: 0;
  }
  height: 60px;
  position: relative;
  padding-inline: 40px;
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.lg}px){
    height: 40px;
    padding-inline: 24px;
  }
  `}

  ${({ theme, active, completed }) => `
    background-color: ${
      active === 'true'
        ? theme.palette.background.blueLight
        : theme.palette.email.background.dark
    };
    color: ${
      active === 'true' 
        ? theme.palette.email.text.light
        : theme.palette.text.light
    };
    ${
      completed === 'true' 
        ? `
      &:hover {
       background-color: ${theme.palette.background.blueLight};
       color: ${theme.palette.email.text.light} !important;
    }
    cursor: pointer;
    `
        : ``
    }
    `}

  &:first-of-type {
    padding-left: 18px;
    border-radius: 10px 0 0 10px;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lg}px){
      padding-left: 12px;
      border-radius: 5px 0 0 5px;
    }
  `}
  }
  &:last-of-type {
    padding-right: 18px;
    border-radius: 0 10px 10px 0;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lg}px){
      padding-right: 12px;
      border-radius: 0 5px 5px 0;
    }
  `}
  }
  &:not(:last-of-type) {
    &::after {
      z-index: 2;
      position: absolute;
      content: '';
      right: -22px;
      height: 44px;
      width: 44px;
      transform: rotate(45deg);
      background-color: inherit;
      top: 8px;
      box-sizing: border-box;
      ${({ theme }) => `
      border-top: 2px solid  ${theme.palette.background.primary};
      border-right: 2px solid ${theme.palette.background.primary};
    @media (max-width: ${theme.breakpoints.values.lg}px){
      right: -16px;
        height: 28px;
        width: 28px;
        top: 6px;
    }
  `}
    }
  }
`;
export const StepContent = styled(Box)`
  z-index: 1;
  gap: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  line-height:1.5;

  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lg}px){
      gap:3px;
      line-height:1.3;
    }
  `}

  ${({ completed, theme   }) =>
    completed === 'true'
      ? `
       color: ${theme.palette.text.sccuess};
    `
      : `` }

   ${({ completed, theme ,active  }) =>
      (active === 'true' && completed === 'true')
      ? `
       color: ${theme.palette.email.text.success};
    `
      : `` }
       
  label {
    font-size: 13px;
    font-weight: 400;
  }

  h6 {
    font-size: 16px;
    font-weight: 400;
  }
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lg}px){
      h6 {
      font-size: 11px;
    }
    label {
      font-size: 9px;
    }
    }
    @media (max-width: ${theme.breakpoints.values.md}px){
      h6 {
      font-size: 9px;
    }
    label {
      display: none !important;
    }
    }
  `}
`;

export const StepsWrapper = styled(Box)`
  display: flex;
`;
