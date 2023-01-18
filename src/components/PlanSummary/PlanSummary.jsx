import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Wrapper } from './PlanSummary.style';

import Grid from '@mui/material/Grid';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import { useLocalization } from '../../hooks';
import { currencies } from '../../constants';
import { usePreviewInvoice } from '../../queries';
import { LoadingOverlay } from '../LoadingOverlay';

export const PlanSummary = React.memo(
  ({
    values,
    diff,
    subscriptionItemId,
    subscriptionId,
    quantity,
    priceList,
    selectedPlan,
    setFieldValue,
    userquantity,
  }) => {
    const { t } = useLocalization();
    const { data: invoicePreview, isLoading } = usePreviewInvoice({
      subscriptionItemId,
      subscriptionId,
      quantity,
      priceList,
    });

    useEffect(()=>{
      setFieldValue("prorationDate", invoicePreview?.prorationDate)
      
    },[invoicePreview?.prorationDate, setFieldValue])

    const selectedCurrency = useMemo(
      () => currencies.find(c => c.id === values.currency),
      [values.currency]
    );

    const priceAmount = useMemo(() => {
      return parseFloat(invoicePreview?.priceAmount).toFixed(2);
    }, [invoicePreview]);
    const totalAmount = useMemo(() => {
      return parseFloat(invoicePreview?.totalAmount).toFixed(2);
    }, [invoicePreview]);

    const taxAmount = useMemo(() => {
      return parseFloat(invoicePreview?.taxAmount ?? 0).toFixed(2);
    }, [invoicePreview]);

    const newaddedUser = useMemo(() => {
      return !!userquantity ? values?.users - userquantity : values?.users;
    }, [userquantity, values?.users]);
    return (
      <Wrapper>
        {isLoading && <LoadingOverlay />}
        <Grid container spacing={1}>
          <Grid item sm={12}>
            <span className="planTitle">
              {t.planSummary.dbw}
              {selectedPlan?.name} / {values.period}
            </span>
          </Grid>

          <Grid item sm={6} lg={8}>
            <span>
              {newaddedUser} {t.planSummary.user}
            </span>
          </Grid>
          <Grid
            style={{ display: 'flex', justifyContent: 'end' }}
            item
            sm={6}
            lg={4}
          >
            <span className="planTitle">
              {selectedCurrency?.symbol}
              {priceAmount}
            </span>
          </Grid>

          <Grid item xs={12} className="pt-0">
            <div className="hrLine-bold w-100"></div>
          </Grid>
          <Grid className="mpt-0" item xs={8} sx={{ mt: 0 }}>
            <span>{t.planSummaryForm.total}</span>
          </Grid>
          <Grid className="text-align-end mpt-0" item xs={4} sx={{ mt: 0 }}>
            <span>
              {selectedCurrency?.symbol}
              {priceAmount}
            </span>
          </Grid>
          <Grid className="mpt-0" item xs={8} sx={{ mt: 0 }}>
            <span>Tax</span>
          </Grid>
          <Grid className="text-align-end mpt-0" item xs={4} sx={{ mt: 0 }}>
            <span>
              {selectedCurrency?.symbol}
              {taxAmount}
            </span>
          </Grid>
          <Grid item xs={12} className="pt-0">
            <div className="hrLine-bold w-100"></div>
          </Grid>

          <Grid className="mpt-0" item xs={8} sx={{ mt: 0 }}>
            <b>{t.planSummaryForm.totalPay}</b>
          </Grid>
          <Grid className="text-align-end mpt-0" item xs={4} sx={{ mt: 0 }}>
            <b>
              {selectedCurrency?.symbol}
              {totalAmount}
            </b>
          </Grid>

          <Grid item xs={2} sm={1}>
            <IconButton color="primary" sx={{ padding: '8px 8px 8px 0px' }}>
              <InfoIcon />
            </IconButton>
          </Grid>
          <Grid item xs={10} sm={11} className="planMessagegrid">
            <p style={{ marginTop: '11px' }} className="planMessage">
              {t.planSummary.planMessage}
            </p>
          </Grid>
          <Grid item xs={10}>
            <span style={{ marginTop: '11px' }} className="paymentInfo">
              {t.planSummaryForm.readOur}
              <Link to="/sigin">{t.planSummaryForm.paymentTerm}</Link>
            </span>
          </Grid>
        </Grid>
      </Wrapper>
    );
  }
);
