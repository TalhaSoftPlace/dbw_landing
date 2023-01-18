import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

export const Wrapper = styled(Box)`
  align-items: center;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 4%;
  padding-inline: 1%;
  padding-block: 30px;
  font-size: 22px;
  ${({ theme }) => `
  color:${theme.palette.text.light};
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
  color:${theme.palette.text.light};
  font-size:30px;
  text-align:center;
  padding-bottom:20px;
  @media (max-width: ${theme.breakpoints.values.lgx}px){
    font-size: 15px;
    padding-bottom:10px;
   }
`}
`;
export const SubHeading = styled(Typography)`
  ${({ theme }) => `
  color:${theme.palette.text.light};
  font-size:18px;
  text-align:left;
  padding-bottom:20px;
  @media (max-width: ${theme.breakpoints.values.lgx}px){
    font-size: 12px;
   }
`}
`;
export const VideoWrapper = styled(Box)`
  align-items: center;
  gap: 16%;
  padding-inline: 10%;
  padding-block: 20px;
  ${({ theme }) => `
    color:${theme.palette.text.light};
    @media (max-width: ${theme.breakpoints.values.md}px){
      padding-inline : 0px;
       }
  `}
`;
export const VideoSection = styled(Box)`
  align-items: center;
  padding-top: 60px;
  ${({ theme }) => `
    color:${theme.palette.text.light};
   .videolist{
      padding-inline: 13%;
      @media (max-width: ${theme.breakpoints.values.md}px){
      padding-inline : 5%
       }
   } 
  `}
`;

export const VideoWrapp = styled(Box)`
  position: relative;
  width: 100%;
  height: 600px;
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lg}px){
      height: 400px !important;
    }
    @media (max-width: ${theme.breakpoints.values.md}px){
      height: 250px !important;
    }
`}
`;
