import { DialogContent, DialogTitle, Grid } from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import { StripeCard } from '../../components';
import { useLocalization, useAuth } from '../../hooks';
import {
  AddCircleOutlineStyled,
  AmountDueText,
  BoxStyled,
  CheckGreenIconStyled,
  CloseIconStyled,
  CreditCardIconStyled,
  DialogStyled,
  EnterInfoText,
  HeaderActionButton,
} from './AddNewCard.styles';
import { useAddCardMutation } from '../../mutations';
import { HandleNextStep } from '../HandleNextStep';
import { useQueryClient } from 'react-query';
import { queryKeys } from '../../constants';
const initialValues = {
  stripePmId: '',
};

export const AddNewCard = React.memo(() => {
  const queryClient = useQueryClient();
  const { mutateAsync: addCard } = useAddCardMutation();
  const { user } = useAuth();
  const { t } = useLocalization();

  const [dialogOpen, setDislogOpen] = React.useState(false);

  const handleClose = React.useCallback(() => {
    setDislogOpen(false);
  }, []);
  const handleOpen = React.useCallback(() => {
    setDislogOpen(true);
  }, []);

  return (
    <>
      <HeaderActionButton onClick={handleOpen}>
        <AddCircleOutlineStyled /> {t.paymentMethod.addbtn}
      </HeaderActionButton>

      <DialogStyled
        open={dialogOpen}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ paddingBlock: 1, paddingInline: 2 }}>
          <CloseIconStyled onClick={handleClose} />
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mb: 1 }} className="dialogcontent">
            <Grid item sm={12}>
              <AmountDueText sx={{color:'text.primaryText'}}>{t.paymentMethod.addbtn}</AmountDueText>
              <EnterInfoText variant="h5" sx={{color:'text.primaryText'}}>
                {t.paymentMethod.addCardText}
              </EnterInfoText>
            </Grid>

            <Grid item sm={6}>
              <BoxStyled>
                <Grid container>
                  <Grid item sm={3}>
                    <CreditCardIconStyled />
                  </Grid>
                  <Grid item sm={6} sx={{color:'email.text.primaryText'}} >
                    <h3
                      style={{
                        fontSize: '18px',
                        marginTop: '12px',
                        textAlign: 'center',
                      }}
                    >
                      {t.container.addNewCard.creditCard}
                    </h3>
                  </Grid>
                  <Grid item sm={3}>
                    <CheckGreenIconStyled />
                  </Grid>
                </Grid>
              </BoxStyled>
            </Grid>

            <Formik initialValues={initialValues}>
              {props => {
                const onPayment = cardToken => {
                  addCard({
                    userName: user.userName,
                    cardToken,
                    defaultMethod: false,
                  }).then(res => {
                    if (res.nextAction?.useStripeSdk?.stripe_js) {
                      props.setFieldValue(
                        'nextAction',
                        res.nextAction?.useStripeSdk?.stripe_js
                      );
                    }
                    setDislogOpen(false);
                  });
                };
                
                return (
                  <>
                    {props.values.nextAction && (
                      <HandleNextStep
                        {...{
                          values: props.values,
                          handleClose: () => {
                            props.setFieldValue('nextAction', undefined);
                            queryClient.refetchQueries([queryKeys.Cards, user?.userName]);

                          },
                          show: !!props.values.nextAction,
                        }}
                      />
                    )}
                    <StripeCard
                      {...props}
                      isInvoice={true}
                      isCardAdd={true}
                      onPayment={onPayment}
                    />
                  </>
                );
              }}
            </Formik>
          </Grid>
        </DialogContent>
      </DialogStyled>
    </>
  );
});
