import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Wrapper = styled(Box)`
  .object {
    padding-left: 50px !important;
  }

  &.readonly {
    form {
      button {
        display: none;
      }
    }
  }

  ${({ theme }) => `
        background: ${theme.palette.background.lightGray};
        .MuiOutlinedInput-input{
          color: ${theme.palette.text.primaryText} !important;
        }
    `};
  padding: 10px 15px;


`;
