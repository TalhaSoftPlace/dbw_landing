import * as React from 'react';
import { Grid } from '@mui/material';
import { AcoridanHead } from './AccordionHeader.style';
import { useLocalization } from '../../hooks';
export const AccordionHeader = ({ title, price, currency }) => {
  const parsedPrice = React.useMemo(() => {
    return parseFloat(price).toFixed(2);
  }, [price]);
  const { t } = useLocalization();
  return (
    <Grid container>
      <Grid item sm={12} className="accordionHead" sx={{ width: '100%' }}>
        <AcoridanHead>
          <div>
            <p className="heading">{title}</p>
          </div>
          <div>
            <p className="price">
              {currency}
              {parsedPrice} {t.components.accordingHeader.perMonth}
            </p>
          </div>
        </AcoridanHead>
      </Grid>
    </Grid>
  );
};
