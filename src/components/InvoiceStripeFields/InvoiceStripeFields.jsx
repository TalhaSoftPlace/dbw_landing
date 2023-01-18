import React, { useCallback } from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { CircularProgress, Grid, MenuItem } from '@mui/material';
import {
  AgreeTermsText,
  CardInputWrapper,
  FieldLabel,
  OutlinedInputStyled,
  StyledSelectField,
} from './InvoiceStripeFields.styles';
import { countries } from '../../constants';
import { useLocalization } from '../../hooks';
import { Button } from '../Button';
import { useSnackbar } from 'notistack';
export const InvoiceStripeFields = React.memo(
  ({
    isCardAdd,
    handleChange,
    values,
    onPayment,
    isLoading,
  }) => {
    const { t } = useLocalization();
    const stripe = useStripe();
    const elements = useElements();
    const { enqueueSnackbar } = useSnackbar();

    const processCard = useCallback(async () => {
      if (elements == null) {
        return;
      }
      const { error, token } = await stripe.createToken(
        elements.getElement(CardNumberElement),
        {
          name: values.name,
          address_zip: values.zip,
          address_country: values.country,
        }
      );
      if (!error) {
        onPayment(token?.id);
      } else {
        enqueueSnackbar(error.message, {
          variant: 'error',
        });
      }
    }, [
      elements,
      stripe,
      values.name,
      values.zip,
      values.country,
      onPayment,
      enqueueSnackbar,
    ]);

    return (
      <Grid style={{ padding: '18px' }} container spacing={2}>
        <Grid item xs={12} lg={6}>
          <FieldLabel>{t.stripeForm.card}</FieldLabel>
          <CardInputWrapper>
            <CardNumberElement />
          </CardInputWrapper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FieldLabel>{t.stripeForm.expirey}</FieldLabel>
          <CardInputWrapper>
            <CardExpiryElement />
          </CardInputWrapper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FieldLabel>{t.stripeForm.cvv}</FieldLabel>
          <CardInputWrapper>
            <CardCvcElement />
          </CardInputWrapper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FieldLabel variant="MuiTypography-body2">
            {t.stripeForm.country}
          </FieldLabel>
          <StyledSelectField
            size="small"
            fullWidth
            margin="normal"
            variant="outlined"
            labelId="country"
            id="country"
            value={values?.country}
            name="country"
            className="field"
            onChange={handleChange}
            MenuProps={{ classes: { paper: 'pagination-page' } }}
            sx={{ height: '60px' }}
          >
            {countries.map(({ name, code }) => (
              <MenuItem key={code} value={code}>
                {name}
              </MenuItem>
            ))}
          </StyledSelectField>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FieldLabel variant="MuiTypography-body2">
            {t.stripeForm.zip}
          </FieldLabel>
          <OutlinedInputStyled
            size="small"
            fullWidth
            margin="normal"
            variant="outlined"
            id="zip"
            name="zip"
            value={values?.zip}
            onChange={handleChange}
            placeholder="Zip"
            sx={{ height: '60px' }}
          />
        </Grid>
        <Grid key={'warning'} item xs={12} sm={12}>
          <AgreeTermsText>{t.InvoicesPage.termsMessage}</AgreeTermsText>
        </Grid>

        <Grid
          key={'button'}
          item
          xs={12}
          sm={12}
          lg={12}
          sx={{ width: '100%', textAlign: 'center' }}
        >
          <Button
            disabled={!stripe || !elements || isLoading}
            onClick={processCard}
            className="w-100"
            variant="paynow"
          >
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>{isCardAdd ? t.InvoicesPage.addNow : t.InvoicesPage.payNow}</>
            )}
          </Button>
        </Grid>
      </Grid>
    );
  }
);
