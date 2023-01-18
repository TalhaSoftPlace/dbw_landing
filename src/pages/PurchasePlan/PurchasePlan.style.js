import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { ReactComponent as ChevronDown } from '../../images/chevron-thin-down.svg';

export const ChevronDownIcon = styled(ChevronDown)`
  ${({ theme }) => `
    * {
    fill: ${theme.palette.text.light};
    }
    `}
`;

export const Background = styled(Box)`
  ${({ theme }) => `
    background-color: ${theme.palette.background.primary};
    `}
  min-height: 100vh;

  a {
    font-weight: 300;
    text-decoration: none;
    ${({ theme }) => `
    color: ${theme.palette.text.light};
    `}
  }
`;

export const Wrapper = styled(Box)`
  margin-top: 4px;
`;
