import { Box } from '@mui/material';
import styled from '@emotion/styled';

export const StyledBox = styled(Box)` 
  position: relative;
  height: calc(100vh - 100px);
  max-width: calc(100vw - 370px);
  margin: 30px;
  margin-bottom: 0px;
  padding: 20px;
  border-radius: 20px;
  ${({ theme }) => `
  border: 2px solid ${theme.palette.email.background.borderLight};
  background-color: ${theme.palette.background.darkbg};
  border-radius: 20px; 
  @media (max-width: ${theme.breakpoints.values.md}px){
  max-width: calc(100vw - 20px);
  height: calc(100vh - 125px);
  margin: 11px;
  margin-bottom: 0px;
  padding: 10px;
    }
    background-color: ${theme.palette.background.dark};
    * { 
        color: ${theme.palette.email.text.textLight};
        font-family: 'Roboto', sans-serif !important;
    }
  `};
  .view-btns {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      display: none; 
    }
  `};
  }

  .view-btns .disabled {
    opacity: 0.5;
  }
  .view-btns .active {
    opacity: 0.5;
  }

  .rbc-time-header-cell {
    min-height: 50px;
    margin: 0px !important;
  }
  .rbc-time-header-content {
    .rbc-addons-dnd-row-body {
      display: none;
    }
  }
  .rbc-time-header {
    margin-right: 3px !important;
  }
  .rbc-header {
    min-height: 50px;
    border-left: none !important;
    padding-inline: 5px;
    padding-block: 10px;
    
  }
  .rbc-off-range-bg {
    ${({ theme }) => `
        background: ${theme.palette.background.primary} !important;
    `};
  }
  .rbc-month-view,
  .rbc-time-view {
    
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
  }
  .rbc-timeslot-group .rbc-time-slot {
    border: none !important;
  }

  .rbc-time-content {
    border-top: none !important;
  }

  .rbc-today {
    ${({ theme }) => `
        background: ${theme.palette.background.rbctoday} !important;
    `};
  }
  .rbc-events-container {
    margin-left: 5px !important;
    margin-right: 5px !important;
  }
  .rbc-day-slot,
  .rbc-event {
    display: flex;
    max-height: 100%;
    ${({ variant }) => {
      switch (variant) {
        case 'month':
          return `
          min-height: 18px !important;
        `;
        default:
          return `
          min-height: 30px !important;
    `;
      }
    }}
  }
  .rbc-day-bg{
    ${({ theme }) => `
    border:1px solid ${theme.palette.email.text.calendarBorder} !important;
    `};
  }
  .rbc-time-view {
    ${({ theme }) => `
    border:2px solid ${theme.palette.email.text.calendarBorder} !important;
    `};
  }
  .rbc-timeslot-group {
    ${({ theme }) => `
    border-top:1px solid ${theme.palette.email.text.calendarBorder} !important;
    `};
    
  }
  .rbc-month-view {
    ${({ theme }) => `
    border:2px solid ${theme.palette.email.text.calendarBorder} !important;
    `};
    cursor: pointer;
    .rbc-today {
      ${({ theme }) => `
        position: relative;
        &.rbc-day-bg{
          &:before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            border: 2px solid ${theme.palette.background.blueLight};
          }
        }
    `};
    }
  }
  .rbc-event {
    border: none !important;
    height: 18px;
    * {
      line-height: 13px;
    }
    ${({ theme }) => `
        background: ${theme.palette.email.background.eventbg} !important;
    `};
  }
  .rbc-show-more {
    height: 20px;
    padding: 2px 10px !important;
    line-height: 1.3;
  }
  .rbc-row {
   
    margin-bottom: 0px;
    .rbc-row-segment {
      padding-inline: 6px;
    }
  }
  .rbc-event-content {
    font-size: 12px !important;
    padding: 0;
    margin: 0;
    margin-top: -1px;
    position: relative;
    padding-left: 14px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:before {
      content: '';
      position: absolute;
      height: 8px;
      width: 8px;
      border-radius: 8px;
      left: 1px;
      top: 4px;
      ${({ theme }) => `
        background-color: ${theme.palette.background.light};
    `};
    }
  }
  .rbc-toolbar button:active:hover,
  .rbc-toolbar button:active:focus,
  .rbc-toolbar button.rbc-active:hover,
  .rbc-toolbar button.rbc-active:focus {
    ${({ theme }) => `
        background-color: ${theme.palette.background.blueDark} !important;
    `};
  }
  .rbc-toolbar button:active,
  .rbc-toolbar button.rbc-active,
  .rbc-toolbar button {
    ${({ theme }) => `
        margin-left: 2px;
        border: none;
        cursor: pointer;
        color: ${theme.palette.email.text.light}!important;
        background-color: ${theme.palette.background.blueLight} !important;
        &:hover {
        background-color: ${theme.palette.background.blueDark} !important;
        }
    `};
  }
  .rbc-month-header {
    .rbc-header {
      padding-top: 16px;
    }
  }
  .rbc-time-header-cell {
    .rbc-button-link {
      padding: 0px;
    }
  }
  .rbc-day-slot {
    max-height: unset !important;
  }
  .rbc-header {
    span {
      white-space: pre;
    }
  }
`;
export const StyledLoadingWrapp = styled(Box)`
  position: absolute;
  cursor: progress;
  background: rgb(0, 0, 0, 0.6);
  z-index: 99;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;
