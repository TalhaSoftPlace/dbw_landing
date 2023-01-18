import React, { useCallback } from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import {
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from '@mui/material';
import {
  CardInputWrapper,
  FieldLabel,
  OutlinedInputStyled,
  ButtonStyled,
} from './StripeCardFields.styles';
import { useLocalization,useToggle } from '../../hooks';
import { countries, currencies } from '../../constants';
import { useSnackbar } from 'notistack';

export const StripeCardFields = React.memo(
  ({ handleChange, values, onPayment, isLoading }) => {
    const [clicked, toggleClicked] = useToggle(false);
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useLocalization();
    const stripe = useStripe();
    const elements = useElements();

    const processCard = useCallback(async () => {
      if (elements == null || isLoading || clicked ) {
        return;
      }
      toggleClicked();
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
        toggleClicked();
      } else {
        toggleClicked();
        enqueueSnackbar(error.message, {
          variant: 'error',
        });
      }
    }, [elements, isLoading, clicked, toggleClicked, stripe, values.name, values.zip, values.country, onPayment, enqueueSnackbar]);

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <FieldLabel variant="MuiTypography-body2">
            {t.stripeForm.name}
          </FieldLabel>
          <FormControl
            size="small"
            fullWidth
            margin="normal"
            variant="outlined"
          >
            <OutlinedInputStyled
              id="name"
              name="name"
              value={values?.name}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FieldLabel variant="MuiTypography-body2">
            {t.stripeForm.card}
          </FieldLabel>
          <CardInputWrapper>
            <CardNumberElement />
          </CardInputWrapper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FieldLabel variant="MuiTypography-body2">
            {t.stripeForm.expirey}
          </FieldLabel>
          <CardInputWrapper>
            <CardExpiryElement />
          </CardInputWrapper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FieldLabel variant="MuiTypography-body2">
            {t.stripeForm.cvv}
          </FieldLabel>
          <CardInputWrapper>
            <CardCvcElement />
          </CardInputWrapper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FieldLabel variant="MuiTypography-body2">
            {t.stripeForm.country}
          </FieldLabel>
          <FormControl
            size="small"
            fullWidth
            margin="normal"
            variant="outlined"
          >
            <Select
              labelId="country"
              id="country"
              value={values?.country}
              name="country"
              className="field"
              onChange={handleChange}
            >
              {countries.map(({ name, code }) => (
                <MenuItem key={code} value={code}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FieldLabel variant="MuiTypography-body2">
            {t.stripeForm.zip}
          </FieldLabel>
          <FormControl
            size="small"
            fullWidth
            margin="normal"
            variant="outlined"
          >
            <OutlinedInputStyled
              id="zip"
              name="zip"
              value={values?.zip}
              onChange={handleChange}
              placeholder="Zip"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FieldLabel variant="MuiTypography-body2">Currency</FieldLabel>
          <FormControl
            size="small"
            fullWidth
            margin="normal"
            variant="outlined"
          >
            <Select
              labelId="currency"
              id="currency"
              value={values?.currency}
              name="currency"
              className="field"
              onChange={handleChange}
            >
              {currencies.map(({ name, id, symbol }) => (
                <MenuItem key={id} value={id}>
                  {`${symbol} ${name}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FieldLabel variant="MuiTypography-body2">Period</FieldLabel>
          <FormControl
            size="small"
            fullWidth
            margin="normal"
            variant="outlined"
          >
            <Select
              labelId="period"
              id="period"
              value={values?.period}
              name="period"
              className="field"
              onChange={handleChange}
            >
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ mt: 2 }}
          style={{ justifyContent: 'center', display: 'flex' }}
        >
          <ButtonStyled
            disabled={!stripe || !elements || isLoading || clicked}
            onClick={processCard}
            variant="primary"
          >
            {isLoading || clicked ? (
              <CircularProgress size={30} color="inherit" />
            ) : (
              'Preview Payment'
            )}
          </ButtonStyled>
        </Grid>
      </Grid>
    );
  }
);
