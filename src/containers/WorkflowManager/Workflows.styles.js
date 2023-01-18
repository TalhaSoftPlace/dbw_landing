import styled from '@emotion/styled';
import { Box } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const Wrapper = styled(Box)`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  ${({ theme }) => `
          @media (max-width: ${theme.breakpoints.values.md}px){
            padding: 10px;
          }
   `};
`;

export const AddNew = styled(Box)`
  cursor: pointer;
  height: 120px;
  width: 300px;
  border-radius: 10px;
  text-align: center;
  line-height: 120px;
  ${({ theme }) => `
          border: 4px solid  ${theme.palette.background.blueLight};
          @media (max-width: ${theme.breakpoints.values.md}px){
            height: 100px;
            width: 135px;
          }
          @media (max-width: ${theme.breakpoints.values.xs}px){
            height: 100px;
            width: 125px;
          }
   `};
  svg {
    font-size: 70px !important;
    margin-top: 20px;
  }
`;

export const ItemWrapper = styled(Box)`
  position: relative;
  width: 300px;
  height: 120px;
  border-radius: 10px;

  ${({ theme }) => `
 
      border: 4px solid ${theme.palette.background.blueLight};
      background-color: ${theme.palette.background.blueLight};
      &.published {
        background-color: ${theme.palette.background.primary};
      }
   `};
`;

export const IconWrapper = styled(Box)`
  position: absolute;
  top: -10px;
  right: 4px;
  cursor: pointer;
`;

export const PublishedIcon = styled(Box)`
  position: absolute;
  bottom: 2px;
  right: 6px;
`;

export const TextWrapper = styled(Box)`
  cursor: pointer;
  position: absolute;
  display:flex;
  width: 100%;
  align-items:center;
  height:80px;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  span {
    line-height: 1.3;
    font-size: 16px;

    ${({ theme }) => `
      @media (max-width: ${theme.breakpoints.values.lg}px){
        font-size: 16px;
      }
   `};

  }
`;

export const SpanText = styled.span`
  margin-top:-10px;
  ${({ theme }) => `
  color:${theme.palette.email.text.light};
   `};
`;
export const MoreHorizIcons = styled(MoreHorizIcon)`
${({ theme }) => `
  color:${theme.palette.email.text.light};
   `};
`;
