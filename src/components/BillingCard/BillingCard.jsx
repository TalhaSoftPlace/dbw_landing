import * as React from 'react';
import { Button } from '../../components';
import { BillingStyledCard, Heading } from './BillingCard.styles';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';

export const BillingCard = ({ children, title, body, btntxt, goto = '' , disableBtn }) => {
  return (
    <BillingStyledCard sx={{ mt: 2, mb: 2 }}>
      <CardContent sx={{ mx: 1, mt: 4 }}>{children}</CardContent>
      <CardContent sx={{ mx: 1, mt: 0, pt: 0 }}>
        <Heading>{title}</Heading>
      </CardContent>
      <CardContent sx={{ mx: 1, mt: 0, pt: 0, height:'120px', alignItems: 'center', display: 'flex', justifyContent:'center' }}>
        <p>{body}</p>
      </CardContent>
      <CardContent sx={{ mx: 1, mt: 2, pt: 0 }}>
        <Link to={goto} className="linkstyle">
          <Button variant="primary" size="large" disabled={disableBtn}>
            {btntxt}
          </Button>
        </Link>
      </CardContent>
    </BillingStyledCard>
  );
};
