import styled from '@emotion/styled';
import { List, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import { Button } from '../../components';

export const StyledList = styled(List)`
  width: 100%;

  ${({ theme }) => `
    background-color: ${theme.palette.background.primary};
    color: ${theme.palette.text.grey};
    border-top: 2px solid ${theme.palette.background.dark};
    `}
  .primaryheader {
    display: flex;
    justify-content: space-between;
  }
  .conversationtext {
    font-size: 16px;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lg}px){
      font-size: 13px;
    }
  
    `}
  }
`;

export const StyledListItem = styled(ListItem)`
  align-items: center;
  cursor: pointer;
  ${({ theme, variant }) => {
    switch (variant) {
      case 'reciever':
        return `
        background-color: ${theme.palette.background.dark};
        border-bottom: 2px solid ${theme.palette.background.dark};
        `;
      case 'sender':
        return `   
        border-bottom: 2px solid ${theme.palette.background.primary};
        background-color: ${theme.palette.text.blueDark};
        margin-left: 70px;
        width: calc(100% - 70px);

        @media (max-width: ${theme.breakpoints.values.md}px){
          margin-left: 0px;
          width: 100%;
        }
        `;
      default:
        return ``;
    }
  }}

  padding-block: 3px;
`;

export const RightWrapper = styled(Box)`
  display: flex;
  align-items: flex-end;
  justify-content: end;
  gap: 5px;
`;

export const StyledButton = styled(Button)`
  height: 16px;
  font-size: 18px;
  padding-inline: 10px;
  width: auto;
  min-width: 16px;
  ${({ theme }) => `
  color: ${theme.palette.text.greyLight};
  @media (max-width: ${theme.breakpoints.values.lg}px){
    font-size: 12px;
  }
  `}
`;
export const TimeWrapper = styled(Box)`
  padding-right: 40px;
  ${({ theme }) => `
  color: ${theme.palette.text.greyLight};
  @media (max-width: ${theme.breakpoints.values.lg}px){
    padding-right: 20px;
  }

  `}
`;
