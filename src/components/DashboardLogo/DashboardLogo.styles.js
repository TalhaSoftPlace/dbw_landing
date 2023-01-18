import styled from '@emotion/styled';
import { ReactComponent as LogoSvg } from '../../images/logo.svg';
import { Box } from '@mui/material';

export const Image = styled(LogoSvg)`
  ${({ color }) => `
    * {
      fill: ${color};
    }
  `}
`;

export const StyledText = styled.span`
  padding-left: 20px;
  padding-right: 24px;
  font-size: 20px !important;
  text-transform: uppercase;
  font-weight: 700;

  ${({ theme }) => `
      color:  ${theme.palette.text.light};
      @media (max-width: ${theme.breakpoints.values.md}px){
        font-size: 14px !important;
        font-weight: 500;

      }
      `}
`;

export const StyledBox = styled(Box)`
  img {
    margin-top: 10px;
    border-radius: 6px;
    overflow: hidden;
    ${({ theme }) => `
    
      @media (max-width: ${theme.breakpoints.values.md}px){
        margin-top: 0px;
      }
      `}
  }
  
`;
