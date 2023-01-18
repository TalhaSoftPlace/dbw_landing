import { Breadcrumbs } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BreadcrumbsStyled = styled(Breadcrumbs)`
  padding: 14px 26px;

  box-shadow: 0px 3px 6px ${({ theme }) => theme.palette.background.dropShadow};
  
  a {
    text-decoration: none;
    color : ${({ theme }) => theme.palette.text.light};
    font-size: 16px;
  }
  li:last-of-type {
    a {
      pointer-events: none;
      cursor: default;
    }
  }
  svg {
    text-decoration: none;
    color : ${({ theme }) => theme.palette.text.light};
    font-size: 20px;
  }
`;
