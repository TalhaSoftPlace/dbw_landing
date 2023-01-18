import React from 'react';
import { Wrapper } from './PaypalButton.styles';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { CircularProgress } from '@mui/material';

const Button = React.memo(({ amount, onScuess }) => {
  const [{ isPending }] = usePayPalScriptReducer();
  return (
    <Wrapper mt={1}>
      {isPending ? (
        <CircularProgress size={80} />
      ) : (
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount,
                  },
                },
              ],
            });
          }}
          onApprove={onScuess}
        />
      )}
    </Wrapper>
  );
});

export const PaypalButton = React.memo((props) => {
  return (
    <PayPalScriptProvider
      options={{ 'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID }}
    >
      <Button {...props} />
    </PayPalScriptProvider>
  );
});
