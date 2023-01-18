import React, { useCallback, useEffect, useMemo } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import visaIcon from '../../images/visa-logo.svg';
import { Grid } from '@mui/material';
import { Wrapper, PackageGrid } from './CartProcessForm.style';
import { LoadingOverlay, StripeCard } from '../../components';
import { useAuth, useLocalization, useWindowResize } from '../../hooks';
import { ReactComponent as VisaIcon } from '../../images/visa.svg';
import { ReactComponent as SafekeyIcon } from '../../images/safekey.svg';
import { useCheckCustomerExsist, usePaymentCards } from '../../queries';
import { useAddCardMutation, useCreateCustomerMutation } from '../../mutations';
import { useTheme } from '@emotion/react';

const paymentMethods = [
  {
    id: '1',
    name: 'Debit/Credit Card',
    subtitle:
      'You can use all credit card service. We can accept Visa and Master Card.',
    icon: visaIcon,
  },
];

export const CartProcessForm = React.memo(
  ({ values, handleChange, setFieldValue, errors }) => {
    const { user } = useAuth();
    const {
      data: customerExists,
      isSuccess,
      isLoading: checkingCustomer,
    } = useCheckCustomerExsist();
    const { data: cards, isLoading: loadingCards } = usePaymentCards(
      !!customerExists
    );
    const winSize = useWindowResize();
    const muiTheme = useTheme();
    const {
      mutateAsync: addCustomer,
      isLoading: creatingCustomer,
    } = useCreateCustomerMutation();
    const {
      mutateAsync: addCard,
      isLoading: addingCard,
    } = useAddCardMutation();
    const { t } = useLocalization();

    const defaultCard = useMemo(() => cards?.find(c => c.defualt), [cards]);
    useEffect(() => {
      !values.changeCard &&
        defaultCard &&
        setFieldValue('step', 'preview-cart');
    }, [defaultCard, setFieldValue, values.changeCard]);

    const inProgress = useMemo(() => creatingCustomer || addingCard, [
      creatingCustomer,
      addingCard,
    ]);

    const onPayment = useCallback(
      async cardToken => {
        if (isSuccess && !customerExists && !addingCard && !creatingCustomer) {
          await addCustomer({
            name: values.name,
            userName: user.userName,
            email: user.recoveryMail,
            country: values.country,
            postal_code: values.zip,
          });
        }

        await addCard({
          userName: user.userName,
          cardToken,
          defaultMethod: true,
        }).then(res => {
          if (res.nextAction?.useStripeSdk?.stripe_js) {
            setFieldValue(
              'nextAction',
              res.nextAction?.useStripeSdk?.stripe_js
            );
          }
          setFieldValue('changeCard', false);
        });
      },
      [
        isSuccess,
        customerExists,
        addingCard,
        creatingCustomer,
        addCard,
        user.userName,
        user.recoveryMail,
        addCustomer,
        values.name,
        values.country,
        values.zip,
        setFieldValue,
      ]
    );

    return (
      <Wrapper>
        {(checkingCustomer || loadingCards) && <LoadingOverlay />}
        <Grid container>
          <Grid sx={{ px: 3, mt: 2 }} item lg={12} xs={12} md={12}>
            <h5>{t.cartProcess.title}</h5>

            <Grid container>
              <Grid item xs={12}>
                <FormControl className="w-100">
                  <RadioGroup
                    name="paymentMethodId"
                    value={values.paymentMethodId}
                    onChange={handleChange}
                  >
                    <Grid sx={{ mt: 2 }} gap={1} container>
                      {paymentMethods.map((paymentMethod, i) => {
                        return (
                          <PackageGrid
                            key={i}
                            variant={
                              paymentMethod.id === values.paymentMethodId
                                ? 'primary'
                                : ''
                            }
                            item
                            lg={5}
                            sm={12}
                            md={12}
                          >
                            <FormControlLabel
                              className="w-100"
                              value={paymentMethod.id}
                              control={<Radio />}
                              label=""
                            />
                            <span>{paymentMethod.name}</span>
                            <img
                              alt="payment_icon"
                              src={paymentMethod.icon}
                            ></img>
                            <br />
                            <label>{paymentMethod.subtitle}</label>
                          </PackageGrid>
                        );
                      })}
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Grid>
              <div className="hrLine w-100"></div>
              <Grid item xs={12}>
                <h5>{t.cartProcess.paymentDetails}</h5>
              </Grid>
              <Grid mt={2} container>
                <Grid item xs={12}>
                  <StripeCard
                    {...{
                      values,
                      handleChange,
                      setFieldValue,
                      errors,
                      isLoading: inProgress,
                      isSignUp: true,
                      onPayment,
                    }}
                  />
                </Grid>
              </Grid>
              {winSize.width > muiTheme.breakpoints.values.md ? (
                <>
                  <p>{t.planSummaryForm.securepayment}</p>
                  <Grid gap={4} item xs={12}>
                    <VisaIcon /> &nbsp; &nbsp; &nbsp; <SafekeyIcon />
                  </Grid>
                </>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>

          <Grid sx={{ px: 3, mt: 2 }} item lg={4} xs={12} md={12}>
            {winSize.width < muiTheme.breakpoints.values.md ? (
              <>
                <p>{t.planSummaryForm.securepayment}</p>
                <Grid gap={4} item xs={12}>
                  <VisaIcon /> &nbsp; &nbsp; &nbsp; <SafekeyIcon />
                </Grid>
              </>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Wrapper>
    );
  }
);
