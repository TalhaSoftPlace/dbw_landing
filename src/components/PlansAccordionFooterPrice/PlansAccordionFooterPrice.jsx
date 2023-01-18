import React from 'react';
import { PricingStyled } from './PlansAccordionFooterPrice.styles';
export const PlansAccordionFooterPrice = React.memo(({ price, currency }) => {
  const Price = React.useMemo(() => {
    return parseFloat(price).toFixed(2);
  }, [price]);
  return (
    <PricingStyled>
      <span className="price">{currency}</span>
      <span className="price">{Price}</span>per user/month
    </PricingStyled>
  );
});
