import styled from '@emotion/styled';
import { Box } from '@mui/material';
export const Wrapper = styled(Box)`
  ${({ theme }) => `
  align-items: center;
  gap: 16%;
    background-color: ${theme.palette.background.primary};
    `}
  .description{
    font-size:15px;
  }
  .deepBlue{
    ${({ theme }) => `
      color: ${theme.palette.text.blueLight};
      `}
  }
`;

export const AccordionBody = styled(Box)`
  ${({ theme }) => `
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    `}

    p{
      ${({ theme }) => `
      color: ${theme.palette.text.primaryText};
      `}
    }
`;
