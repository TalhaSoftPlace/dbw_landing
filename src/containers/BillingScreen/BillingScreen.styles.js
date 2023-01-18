import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

export const StyledGrid = styled(Grid)`
  .disabled-link {
    pointer-events: none;
    ${({ theme }) => `
    color: ${theme.palette.text.greyLight} !important;
    `}
  }
`;
