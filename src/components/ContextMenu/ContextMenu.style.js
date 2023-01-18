import styled from '@emotion/styled';
import Menu from '@mui/material/Menu';

export const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    ${({ theme }) => `
    background-color: ${theme.palette.background.primary};
    border-radius : 5px;
    padding-inline:15px;
    `}
  }
  .contextmenu {
    ${({ theme }) => `
    color: ${theme.palette.text.light};

    `}
  }
`;
