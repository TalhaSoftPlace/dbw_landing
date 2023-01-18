import React, { useMemo } from 'react';
import { Container } from '@mui/material';
import { PlanSummaryForm } from '../../containers';
import { Wrapper } from './PurchasePlan.style';
import {
  CustomizePlan,
  ProcessCart,
  PlansAccordion,
  LoadingOverlay,
} from '../../components';
import { Formik } from 'formik';
import useGeoLocation from 'react-ipgeolocation';
import {
  useCheckCustomerExsist,
  usePaymentCards,
  usePlans,
} from '../../queries';

export const PurchasePlan = React.memo(() => {
  const { data: customerExists } = useCheckCustomerExsist();
  usePaymentCards(!!customerExists);

  const { data: plans = [], isLoading } = usePlans();
  const location = useGeoLocation();

  const initialValues = useMemo(() => {
    return {
      name: '',
      country: location?.country || 'TR',
      zip: '',
      step: 'plan-selection',
      planId: plans?.[0]?.planId ?? 1,
      period: 'monthly',
      currency: 'usd',
      paymentMethodId: '1',
      changeCard: false,
      users: 1,
      storage: 5,
      nextAction: null,
    };
  }, [location.country, plans]);

  return (
    <>
      <Container maxWidth="lg" sx={{ p: 2 }}>
        {isLoading ? (
          <LoadingOverlay />
        ) : (
          <Wrapper>
            <Formik validateOnMount initialValues={initialValues}>
              {props => {
                switch (props.values.step) {
                  case 'plan-selection':
                    return <PlansAccordion {...props} />;
                  case 'customize-plan':
                    return <CustomizePlan {...props} />;
                  case 'process-cart':
                    return <ProcessCart {...props} />;
                  case 'preview-cart':
                    return <PlanSummaryForm {...props} />;
                  default:
                    return;
                }
              }}
            </Formik>
          </Wrapper>
        )}
      </Container>
    </>
  );
});
