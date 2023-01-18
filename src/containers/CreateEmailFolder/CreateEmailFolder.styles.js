import styled from '@emotion/styled';
import {Typography, Box} from '@mui/material';

export const FieldLabel = styled(Typography)`
  ${({ theme }) => `
    color: ${theme.palette.background.primaryText};
  `}
  margin-bottom: 5px;
  font-weight: 400;
`;

export const Wrapper = styled(Box)`
  width:360px;
  padding-inline:20px;
  ${({ theme }) => `
  color: ${theme.palette.background.primaryText};
  @media (max-width: ${theme.breakpoints.values.sm}px){
    width:260px;
  }
  
`}
`;


