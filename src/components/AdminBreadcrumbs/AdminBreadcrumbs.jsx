import React from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { BreadcrumbsStyled } from './AdminBreadcrumbs.styles';
import { Link } from 'react-router-dom';
import { useBreadcrumbItems } from '../../hooks';

export const AdminBreadcrumbs = React.memo(() => {
  const linkItems = useBreadcrumbItems();

  return (
    <BreadcrumbsStyled
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {linkItems.map((path) => (
        <Link underline="hover" sx={{color:'text.light'}} key={path.text} to={path.link}>
          {path.text}
        </Link>
      ))}
    </BreadcrumbsStyled>
  );
});
