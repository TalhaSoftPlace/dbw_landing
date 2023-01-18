import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const AttachmentWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 4px;
  padding: 4px;
  min-width: 150px;
  cursor: pointer;
  border-bottom: 1px solid;
  font-size: 14px;
  align-items: center;
  ${({ theme }) => `
    color: ${theme.palette.text.greyDark};
     &:hover {
        background: ${theme.palette.background.primary};
        color: ${theme.palette.text.light};
      }
    `};
  &:last-of-type {
    border-bottom: none;
  }
  .atachment-name {
    font-family: 'Roboto', sans-serif !important;
  }
`;
