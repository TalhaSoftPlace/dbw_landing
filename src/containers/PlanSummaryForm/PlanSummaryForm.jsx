import { useTheme } from '@emotion/react';
import { CircularProgress, Grid } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BoxHeader, PlanSummary } from '../../components';
import { useAuth, useLocalization, useWindowResize } from '../../hooks';
import {
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} from '../../mutations';
import { usePaymentCards, usePlans, useSubscription } from '../../queries';
import { ConfirmationDialog } from '../../containers';
import { ReactComponent as SuccessIcon } from '../../images/SuccessIcon.svg';
import {
  ButtonStyled,
  ChevronDownIcon,
  GridStyled,
  MobileChevronDownIcon,
} from './PlanSummaryForm.styles';
import { ReactComponent as VisaIcon } from '../../images/visa.svg';
import { ReactComponent as SafekeyIcon } from '../../images/safekey.svg';
import { useQueryClient } from 'react-query';
import { queryKeys } from '../../constants';
import { HandleNextStep } from '../HandleNextStep';
import { useNavigate } from 'react-router-dom';

export const PlanSummaryForm = React.memo(
  ({ values, handleChange, handleBlur, setFieldValue, touched, errors }) => {
    const { t } = useLocalization();
    const [deleted, setDelete] = useState(false);
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const { data: plans = [] } = usePlans();
    const navigate = useNavigate();
    const { data: cards = [] } = usePaymentCards();
    const defaultCard = useMemo(() => cards?.find(c => c.defualt), [cards]);

    useEffect(() => {
      if (!defaultCard) {
        setFieldValue('step', 'process-cart');
      }
    }, [defaultCard, setFieldValue]);

    const { mutateAsync: deleteSub } = useDeleteSubscriptionMutation();
    const { data: subscription } = useSubscription();
    const {
      mutateAsync: addSubscription,
      isLoading: creatingSubscription,
    } = useCreateSubscriptionMutation();
    const selectedPlan = useMemo(
      () => plans.find(({ planId }) => planId === values.planId),
      [plans, values.planId]
    );

    const [openDialog, setOpenDialog] = React.useState(false);
    const [
      subscribtionCreationCalled,
      setSubscribtionCreationCalled,
    ] = React.useState(false);
    const hadleOpen = React.useCallback(() => {
      setOpenDialog(true);
    }, []);
    const handleClose = React.useCallback(() => {
      queryClient.refetchQueries([queryKeys.User]);
      queryClient.refetchQueries([queryKeys.Cards, user.userName]);
      subscribtionCreationCalled && navigate('/admin/billing');
      setFieldValue('nextAction', undefined);
      setOpenDialog(false);
    }, [
      navigate,
      queryClient,
      setFieldValue,
      subscribtionCreationCalled,
      user.userName,
    ]);
    const priceList = useMemo(
      () =>
        selectedPlan.features
          .filter(feature => feature.currency === values.currency)
          .map(feature => {
            if (feature.type === 'storage') {
              return { price: feature.id, quantity: values.storage / 5 };
            }
            return { price: feature.id, quantity: values.users };
          }),
      [selectedPlan.features, values]
    );
    const winSize = useWindowResize();
    const muiTheme = useTheme();
    const handleRemovePrevious = useCallback(() => {
      const incompleteSubscription = subscription?.subscriptions?.find(
        ({ subscriptionStatus }) => subscriptionStatus === 'incomplete'
      );
      if (incompleteSubscription) {
        if (!values.nextAction) {
          !deleted &&
            deleteSub({
              subscriptionId: incompleteSubscription?.subscriptionId,
            });
          setDelete(true);
        } else {
          setDelete(false);
        }
      }
    }, [deleteSub, deleted, subscription?.subscriptions, values.nextAction]);
    useEffect(() => {
      handleRemovePrevious();
    }, [handleRemovePrevious]);

    const goBack = useCallback(() => {
      setFieldValue('step', 'customize-plan');
    }, [setFieldValue]);

    const onPayment = useCallback(async () => {
      setSubscribtionCreationCalled(true);
      await addSubscription({
        userName: user.userName,
        priceList,
      }).then(res => {
        if (
          res.subscriptionStatus === 'incomplete' &&
          res.nextAction?.useStripeSdk?.stripe_js
        ) {
          setFieldValue('nextAction', res.nextAction?.useStripeSdk?.stripe_js);
        } else {
          hadleOpen();
        }
      });
    }, [addSubscription, user.userName, priceList, setFieldValue, hadleOpen]);

    const changeCard = useCallback(() => {
      setFieldValue('changeCard', true);
      setFieldValue('step', 'process-cart');
    }, [setFieldValue]);

    return (
      <div>
        {values.nextAction && (
          <HandleNextStep
            {...{
              values,
              handleClose,
              show: !!values.nextAction,
            }}
          />
        )}
        <BoxHeader
          title={t.customizePlan.headerTitle}
          subtitle={t.customizePlan.headerSubtitle}
        >
          <span onClick={goBack}>
            {winSize.width > muiTheme.breakpoints.values.md ? (
              <ChevronDownIcon />
            ) : (
              <MobileChevronDownIcon />
            )}
            {winSize.width > muiTheme.breakpoints.values.md
              ? t.customizePlan.back
              : ''}
          </span>
        </BoxHeader>
        <GridStyled container>
          <Grid item xs={12}>
            <h3>{t.customizePlan.invoice}</h3>
            <p>
              {t.customizePlan.invoiceMsg}
              <span className="last4">{defaultCard?.last4}</span>
              <span className="asLink" onClick={changeCard}>
                {t.container.planSummaryForm.changeCardBtn}
              </span>
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
            }}
            checkoutText={t.planSummaryForm.payNow}
          />
          <Grid
            item
            xs={12}
            md={12}
            sx={{ mt: 3, mb: 3 }}
            style={{ justifyContent: 'center', display: 'flex' }}
          >
            <ButtonStyled
              disabled={creatingSubscription}
              onClick={onPayment}
              variant="primary"
            >
              {creatingSubscription ? (
                <CircularProgress size={30} color="inherit" />
              ) : (
                'Process Payment'
              )}
            </ButtonStyled>
          </Grid>
          <p>{t.planSummaryForm.securepayment}</p>
          <Grid gap={4} item xs={12}>
            <VisaIcon /> &nbsp; &nbsp; &nbsp; <SafekeyIcon />
          </Grid>
        </GridStyled>

        <ConfirmationDialog
          title="Congratulations !"
          subtitle="Your subscription has been created successfully"
          open={openDialog}
          handleClose={handleClose}
          handleDelete={handleClose}
          deletebtn="OK"
        >
          <SuccessIcon />
        </ConfirmationDialog>
      </div>
    );
  }
);
