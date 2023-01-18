import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

export const Wrapper = styled(Box)`
  align-items: center;
  text-align: center;
  display: flex;
  justify-content: center;
  height: 80vh;
  gap: 4%;
  padding-inline: 1%;
  padding-block: 1px;
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
  font-size:60px;
  line-height:1.5;
  text-align:center;
  @media (max-width: ${theme.breakpoints.values.lgx}px){
    // font-size: 45px;
   }
`}
`;
export const SubHeading = styled(Typography)`
  ${({ theme }) => `
  color:${theme.palette.text.blueLight};
  font-size:20px;
  text-align:center;
  @media (max-width: ${theme.breakpoints.values.lgx}px){
    font-size: 15px;
   }
`}
`;
export const Subtitle = styled(Box)`
  ${({ theme }) => `
  color:${theme.palette.text.light};
  font-size:30px;
  text-align:center;
  @media (max-width: ${theme.breakpoints.values.lgx}px){
    font-size: 24px;
    
   }
`}
`;
