import { CircularProgress, Grid } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { BoxHeader, PlanSummary } from '../../components';
import { useAuth, useLocalization } from '../../hooks';
import { useUpdateSubscriptionMutation } from '../../mutations';
import { usePaymentCards, usePlans, useSubscription } from '../../queries';
import { ButtonStyled, GridStyled } from './PlanSummaryView.styles';
import { ReactComponent as VisaIcon } from '../../images/visa.svg';
import { ReactComponent as SafekeyIcon } from '../../images/safekey.svg';
import { SubscriptionionSuccessDialog, HandleNextStep } from '../../containers';
import { ReactComponent as SuccessIcon } from '../../images/SuccessIcon.svg';
import { useQueryClient } from 'react-query';
import { queryKeys } from '../../constants';
export const PlanSummaryView = React.memo(
  ({
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    touched,
    errors,
    onClose,
    userquantity,
  }) => {
    const { t } = useLocalization();
    const { user: { userName } = {} } = useAuth();
    const { data: plans = [] } = usePlans();
    const { data: cards = [] } = usePaymentCards();
    const { data: subscription } = useSubscription();
    const queryClient = useQueryClient();
    const [openDialog, setOpenDialog] = React.useState(false);
    const hadleOpen = React.useCallback(() => {
      setOpenDialog(true);
    }, []);

    const handleClose = React.useCallback(() => {
      setOpenDialog(false);
      setTimeout(() => onClose(), 500);
      queryClient.refetchQueries([queryKeys.User]);
      queryClient.refetchQueries([queryKeys.Subscription,userName]);
    }, [onClose, queryClient, userName]);
    const sub = useMemo(() => subscription?.subscriptions?.[0], [
      subscription?.subscriptions,
    ]);

    const {
      mutateAsync: updateSubscription,
      isLoading: updatingSubscription,
    } = useUpdateSubscriptionMutation();
    const selectedPlan = useMemo(
      () => plans.find(({ planId }) => planId === values.planId),
      [plans, values.planId]
    );
    const diff = useMemo(() => values.users - values.oldUsers ?? 0, [
      values.oldUsers,
      values.users,
    ]);
    const priceList = useMemo(
      () =>
        selectedPlan.features
          .filter(feature => feature.currency === values.currency)
          .map(feature => {
            return {
              priceId: feature.id,
              quantity: values.users,
              subscriptionId: sub?.subscriptionId,
              subscriptionItemId: sub?.items?.find(
                ({ type }) => type === 'user'
              )?.subscriptionItemId,
              type: 'user',
            };
          }),
      [selectedPlan.features, sub, values.currency, values.users]
    );

    const payload = useMemo(() => {
      const feature = selectedPlan.features.find(
        feature => feature.currency === values.currency
      );
      return [
        {
          priceId: feature.id,
          quantity: values.users,
          type: 'user',
          prorationDate: values.prorationDate,
          subscriptionId: sub?.subscriptionId,
          subscriptionItemId: sub?.items?.find(({ type }) => type === 'user')
            ?.subscriptionItemId,
        },
      ];
    }, [selectedPlan.features, sub, values]);
    
    const onPayment = useCallback(async () => {
      if (sub) {
        await updateSubscription({
          payload,
        }).then(res => {
          if (res.nextAction) {
            setFieldValue(
              'nextAction',
              res.nextAction?.useStripeSdk?.stripe_js
            );
          } else if (res.subscriptionStatus === 'active') {
            hadleOpen();
          }
        });
      }
    }, [sub, updateSubscription, payload, setFieldValue, hadleOpen]);

    return (
      <div>
        {values.nextAction && (
          <HandleNextStep
            {...{
              values,
              handleClose: () => {
                setFieldValue('nextAction', undefined);
                handleClose();
              },
              show: !!values.nextAction,
            }}
          />
        )}
        <BoxHeader
          title={t.customizePlan.headerTitle}
          subtitle={t.customizePlan.headerSubtitle}
        ></BoxHeader>
        <GridStyled container>
          {diff > 0 && (
            <>
              <Grid item xs={12}>
                <h3>{t.customizePlan.invoice}</h3>
                <p>
                  {t.customizePlan.invoiceMsg}
                  <span className="last4">{cards?.[0]?.last4}</span>
                </p>
              </Grid>

              <PlanSummary
                {...{
                  values,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  touched,
                  errors,
                  priceList,
                  selectedPlan,
                  diff,
                  subscriptionId: sub?.subscriptionId,
                  subscriptionItemId: sub?.items?.[0]?.subscriptionItemId,
                  quantity: values?.users,
                  userquantity,
                }}
                checkoutText={t.planSummaryForm.payNow}
              />
            </>
          )}
          <Grid
            item
            xs={12}
            md={12}
            sx={{ mt: 3, mb: 3 }}
            style={{ justifyContent: 'center', display: 'flex' }}
          >
            <ButtonStyled
              disabled={updatingSubscription}
              onClick={onPayment}
              variant="primary"
            >
              {updatingSubscription ? (
                <CircularProgress size={30} color="inherit" />
              ) : diff > 0 ? (
                'Process Payment'
              ) : (
                'Update Subscription'
              )}
            </ButtonStyled>
          </Grid>
          <p>{t.planSummaryForm.securepayment}</p>
          <Grid gap={4} item xs={12}>
            <VisaIcon /> &nbsp; &nbsp; &nbsp; <SafekeyIcon />
          </Grid>
        </GridStyled>
        <SubscriptionionSuccessDialog
          title="Customize Your Plan"
          subtitle={
            diff > 0
              ? 'You have upgraded your subscription successfully'
              : 'You have donwgraded your subscription successfully'
          }
          open={openDialog}
          handleClose={handleClose}
          handleDelete={handleClose}
          deletebtn="OK"
        >
          <SuccessIcon />
        </SubscriptionionSuccessDialog>
      </div>
    );
  }
);
