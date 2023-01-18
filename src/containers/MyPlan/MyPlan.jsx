import React, {
  useMemo,
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  Box,
  InputAdornment,
  MenuItem,
  Modal,
  Typography,
  Container,
} from '@mui/material';
import { ConfirmationDialog } from '../../containers';
import {
  StyledSelect,
  StyledTextField,
  Heading,
  Paragraph,
  StyledField,
  StyleBox,
  DeleteBox,
  StorageIcon,
  PlanIcon,
  MailIcon
} from './MyPlan.styles';
import { Button, ContentSection, Loading } from '../../components';
import { useAuth, useLocalization, useToggle } from '../../hooks';
import { Formik } from 'formik';
import { usePlans, useSubscription } from '../../queries';
import { PlanSummaryView } from '../PlanSummary';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { ReactComponent as CancelSubscriptionIcon } from '../../images/CancelSubscriptionIcon.svg';
import { useDeleteSubscriptionMutation } from '../../mutations';
import { useNavigate } from 'react-router-dom';
import { SubscriptionionSuccessDialog } from './../SubscriptionionSuccessDialog/SubscriptionionSuccessDialog';
import { SuccessIcon } from './../FeedbackForm/FeedbackForm.styles';

const Form = React.memo(
  ({ values, handleChange, handleSubmit, userSubscription }) => {
    const subRef = useRef();
    const [openDialog, setOpenDialog] = useState(false);
    useEffect(() => {
      if (subRef.current && subRef.current !== userSubscription?.quantity) {
        setOpenDialog(userSubscription?.quantity - subRef.current);
      }
      subRef.current = userSubscription?.quantity;
    }, [userSubscription]);

    const { t } = useLocalization();
    const { data: plans } = usePlans();
    const diff = useMemo(() => values.users - values.oldUsers ?? 0, [
      values.oldUsers,
      values.users,
    ]);
    const handleClose = useCallback(() => {
      setOpenDialog(false);
    }, []);
    return (
      <>
        <Box sx={{ marginBottom: '30px' }}>
          <SubscriptionionSuccessDialog
            title="Customize Your Plan"
            subtitle={
              openDialog > 0
                ? 'You have upgraded your subscription successfully'
                : 'You have downgraded your subscription successfully'
            }
            open={!!openDialog}
            handleClose={handleClose}
            handleDelete={handleClose}
            deletebtn="OK"
          >
            <SuccessIcon />
          </SubscriptionionSuccessDialog>
          {values.planId ? (
            <>
              <Box>
                <Typography component="span">{t.myPlan.planName}</Typography>
                {values.planId && (
                  <StyledSelect
                    value={values.planId}
                    onChange={handleChange}
                    autoWidth
                    name="planId"
                    variant="outlined"
                    startAdornment={
                      <InputAdornment position="start">
                        <PlanIcon width={30} />
                      </InputAdornment>
                    }
                  >
                    {plans?.map(plan => (
                      <MenuItem key={plan.planId} value={plan.planId}>
                        {plan.name}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                )}
              </Box>
              <Box>
                <Typography component="span">{t.myPlan.emails}</Typography>
                <StyledTextField
                  inputProps={{ min: '1', max: '1000' }}
                  className="right filled"
                  size="small"
                  variant="outlined"
                  name="users"
                  value={values.users}
                  onChange={handleChange}
                  placeholder="Users"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon width={30}  />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <Typography component="span">{t.myPlan.storage}</Typography>
                <StyledTextField
                  readOnly
                  inputProps={{ min: '10', max: '1000', step: '10' }}
                  className="right filled"
                  size="small"
                  variant="outlined"
                  name="storage"
                  value={10}
                  onChange={handleChange}
                  placeholder="Storage"
                  type="text"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <StorageIcon width={30} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">GB</InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <Typography component="span">
                  {t.container.myPlan.currency}
                </Typography>
                {values.currency && (
                  <StyledSelect
                    readOnly
                    value={values.currency}
                    onChange={handleChange}
                    autoWidth
                    name="currency"
                    variant="outlined"
                    startAdornment={
                      <InputAdornment position="start">
                        <PriceChangeIcon width={30} />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="usd">USD</MenuItem>
                    <MenuItem value="eur">EUR</MenuItem>
                  </StyledSelect>
                )}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  marginTop: '20px',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  disabled={diff === 0}
                  onClick={handleSubmit}
                  sx={{
                    lineHeight: 0.75,
                  }}
                  variant="primary"
                >
                  {t.myPlan.customize}
                </Button>
              </Box>
            </>
          ) : (
            <Loading />
          )}
        </Box>
      </>
    );
  }
);

export const MyPlan = React.memo(() => {
  const { t } = useLocalization();
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const [showSummary, toggleShowSummary] = useToggle(false);
  const { data: subscription } = useSubscription();
  const { mutateAsync: deleteSub, isLoading } = useDeleteSubscriptionMutation();
  const { data: plans } = usePlans();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const domainName = useMemo(() => user?.domainModel?.domainName, [
    user?.domainModel?.domainName,
  ]);
  const handleClose = React.useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpenDialog(true);
  }, []);
  const userSubscription = useMemo(
    () =>
      subscription?.subscriptions?.[0]?.items?.find(
        item => item.type === 'user'
      ),
    [subscription]
  );

  const handleDeleteSubscription = React.useCallback(() => {
    const id = subscription?.subscriptions?.[0]?.subscriptionId;
    id &&
      !isLoading &&
      deleteSub({ subscriptionId: id }).then(() => {
        navigate(`/admin/billing`);
      });
  }, [deleteSub, isLoading, navigate, subscription?.subscriptions]);

  const selectedPlan = useMemo(
    () =>
      plans?.find(
        plan =>
          !!plan.features.find(feature => {
            return feature.id === userSubscription?.priceId;
          })
      ),
    [plans, userSubscription?.priceId]
  );

  const initialValues = useMemo(
    () => ({
      planId: selectedPlan?.planId,
      oldUsers: userSubscription?.quantity ?? 1,
      users: userSubscription?.quantity ?? 1,
      currency: 'usd',
      storage: 10,
    }),
    [selectedPlan?.planId, userSubscription?.quantity]
  );

  const verificationText = useMemo(
    () => 'delete subscription for ' + domainName,
    [domainName]
  );
  return (
    <>
      <ContentSection
        heading={t.myPlan.heading}
        subHeading={t.myPlan.subHeading}
      >
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={toggleShowSummary}
        >
          {props => (
            <>
              <Form {...props} userSubscription={userSubscription} />
              {!openDialog &&
                showSummary &&
                (props.values.users - props.values.oldUsers ?? 0) !== 0 && (
                  <Modal
                    open={showSummary}
                    onClose={() => {
                      props.resetForm(initialValues);
                      toggleShowSummary();
                    }}
                  >
                    <Box
                      sx={{
                        width: '600px',
                        margin: 'auto',
                        marginTop: '5vh',
                        overflow: 'hidden',
                      }}
                    >
                      <PlanSummaryView
                        {...props}
                        onClose={() => {
                          props.resetForm(initialValues);
                          toggleShowSummary();
                        }}
                        userquantity={userSubscription?.quantity}
                      />
                    </Box>
                  </Modal>
                )}
            </>
          )}
        </Formik>
      </ContentSection>

      <StyleBox>
        {initialValues.planId && (
          <Container maxWidth="lgx">
            <Box onClick={handleOpen} sx={{ color: 'text.grey' }}>
              <u>{t.container.myPlan.deleteSubscription}</u>
            </Box>
          </Container>
        )}
      </StyleBox>
      <ConfirmationDialog
        open={openDialog}
        handleClose={handleClose}
        handleDelete={handleDeleteSubscription}
        dangerbtn="Delete My Subcription"
        successbtn="Continue Subcription"
        disabledAction={verificationText !== inputValue || isLoading}
      >
        <>
          <CancelSubscriptionIcon />
          <DeleteSubscription
            inputValue={inputValue}
            setInputValue={setInputValue}
            domainName={domainName}
          />
        </>
      </ConfirmationDialog>
    </>
  );
});

export const DeleteSubscription = React.memo(
  ({ inputValue, setInputValue, domainName }) => {
    const handleChange = e => {
      setInputValue(e.target.value);
    };
    const { t } = useLocalization();

    return (
      <>
        <DeleteBox sx={{ pt: 2 }}>
          <Heading>{t.container.myPlan.deleteSubscriptionUltimatum1}</Heading>
          <Paragraph sx={{ pt: 1 }}>
            {t.container.myPlan.deleteSubscriptionUltimatum2}
          </Paragraph>
          <Paragraph>
            {t.container.myPlan.deleteSubscriptionUltimatum3}
          </Paragraph>
          <Paragraph>
            {t.container.myPlan.deleteSubscriptionUltimatum4}
          </Paragraph>
          <Heading sx={{ textAlign: 'center' }} className="noselect">
            {t.container.myPlan.deleteSubscriptionFor} <b>{domainName}</b>
          </Heading>
          <StyledField
            size="small"
            placeholder="Write above text here..."
            name="confirmationtext"
            autoComplete="off"
            value={inputValue}
            onChange={handleChange}
            variant="outlined"
          />
        </DeleteBox>
      </>
    );
  }
);
