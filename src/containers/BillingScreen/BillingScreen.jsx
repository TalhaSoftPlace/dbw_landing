import React from 'react';
import { Grid } from '@mui/material';
import { ReactComponent as PlansIcon } from '../../images/billingplan.svg';
import { ReactComponent as PaymentmethodIcon } from '../../images/billing-paymentMethod.svg';
import { ReactComponent as InvoiceIcon } from '../../images/billing-Inovices.svg';
import { useLocalization } from '../../hooks';
import { BillingCard, ContentSection } from '../../components';
import { StyledGrid } from './BillingScreen.styles';
import { useAuth } from '../../hooks';
export const BillingScreen = React.memo(() => {
  const { user } = useAuth();
  const { t } = useLocalization();
  return (
    <ContentSection heading={t.Billing.title} subHeading={t.Billing.subtitle}>
      <StyledGrid container spacing={6} sx={{ mb: 5 }}>
        <Grid item xs={12} sm={6} lg={4} xl={4}>
          <BillingCard
            title={t.Billing.plan.title}
            body={t.Billing.plan.body}
            btntxt={
              !!user &&
              (user?.domainModel?.domainStatus === 'ACTIVE' ||
                user?.domainModel?.domainStatus === 'TOBEDELETED' ||
                user?.domainModel?.domainStatus === 'INCOMPLETE')
                ? 'Subscription'
                : t.Billing.paymentMethod.btn
            }
            goto={
              !!user &&
              (user?.domainModel?.domainStatus === 'ACTIVE' ||
                user?.domainModel?.domainStatus === 'TOBEDELETED' ||
                user?.domainModel?.domainStatus === 'INCOMPLETE')
                ? 'purchase-plan'
                : 'my-plan'
            }
          >
            <PlansIcon />
          </BillingCard>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          lg={4}
          xl={4}
          className={
            !!user &&
            (user?.domainModel?.domainStatus === 'ACTIVE' ||
              user?.domainModel?.domainStatus === 'TOBEDELETED')
              ? 'disabled-link'
              : ''
          }
        >
          <BillingCard
            title={t.Billing.paymentMethod.title}
            body={t.Billing.paymentMethod.body}
            btntxt={t.Billing.paymentMethod.btn}
            goto="payment-methods"
          >
            <PaymentmethodIcon />
          </BillingCard>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          lg={4}
          xl={4}
          className={
            !!user &&
            (user?.domainModel?.domainStatus === 'ACTIVE' ||
              user?.domainModel?.domainStatus === 'TOBEDELETED')
              ? 'disabled-link'
              : ''
          }
        >
          <BillingCard
            title={t.Billing.invoice.title}
            body={t.Billing.invoice.body}
            btntxt={t.Billing.invoice.btn}
            goto="my-invoices"
          >
            <InvoiceIcon />
          </BillingCard>
        </Grid>
      </StyledGrid>
    </ContentSection>
  );
});
