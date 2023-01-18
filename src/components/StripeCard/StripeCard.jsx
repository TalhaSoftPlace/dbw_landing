import React from 'react';
import { loadStripe } from '@stripe/stripe-js/pure';
import { Elements } from '@stripe/react-stripe-js';
import { StripeCardFields } from '../StripeCardFields';
import { InvoiceStripeFields } from '../InvoiceStripeFields';

loadStripe.setLoadParameters({ advancedFraudSignals: false });
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export const StripeCard = props => (
  <Elements stripe={stripePromise}>
    {props.isInvoice ? (
      <InvoiceStripeFields isCardAdd={props.isCardAdd} {...props} />
    ) : (
      <StripeCardFields {...props} />
    )}
  </Elements>
);
