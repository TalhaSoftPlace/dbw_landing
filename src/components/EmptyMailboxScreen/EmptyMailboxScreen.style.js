import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import BgIcon from '../../images/BGgraphics.svg';
export const Wrapper = styled(Box)`
  background-image: url(${BgIcon});
  background-repeat: no-repeat;
  background-position: center;
  align-items: center;
  text-align: center;
  display: flex;
  justify-content: center;
  height: 100%;
  gap: 4%;
  padding-inline: 1%;
  padding-block: 1px;
  font-size: 22px;
  ${({ theme }) => `
  background-color:${theme.palette.background.primary};
`}
  .welcomebtn {
    padding-top: 30px;
    ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.lgx}px){
    padding-top:20px;
   }
`}
  }
`;

export const Title = styled(Box)`
  ${({ theme }) => `
  color:${theme.palette.email.text.lightgrey};
  font-size:15px;
  text-align:center;
  padding-bottom:30px;
  @media (max-width: ${theme.breakpoints.values.lgx}px){
    font-size: 12px;
    padding-bottom:30px;
   }
`}
`;
export const BgWrapper = styled(Box)`
  padding-top: 10%;
`;
export const SubHeading = styled(Typography)`
  ${({ theme }) => `
  color:${theme.palette.text.blueLight};
  font-size:18px;
  font-weight:500;
  text-align:center;
  @media (max-width: ${theme.breakpoints.values.lgx}px){
    font-size: 14px;
   }
`}
`;
export const Subtitle = styled(Box)`
  ${({ theme }) => `
  color:${theme.palette.text.grey};
  font-size:15px;
  text-align:center;
  @media (max-width: ${theme.breakpoints.values.lgx}px){
    font-size: 12px;
    
   }
`}
`;
