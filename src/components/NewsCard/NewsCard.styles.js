import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const News = styled(Box)`
  align-items: center;
  gap: 16%;
  font-size: 18px;
  padding-inline: 10px;
  ${({ theme }) => `
    color: ${theme.palette.landingpage.text.light};
    background-color: ${theme.palette.landingpage.background.dark};
    }
  `}
  .head {
    margin-top: 20px;
    margin-bottom: 30px;
  }
  h6
  {
    font-weight: 400 !important;
  }
`;

export const Textdate = styled(Box)`
  font-size: 18px;
  ${({ theme }) => `
  color: ${theme.palette.landingpage.text.greyDark};
  @media (max-width: ${theme.breakpoints.values.lgx}px){
    font-size : 12px;
  }

  `}
`;
