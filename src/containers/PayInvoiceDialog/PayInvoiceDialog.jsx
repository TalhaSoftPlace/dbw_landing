import React, { useCallback } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CloseIconStyled, DialogStyled } from './PayInvoiceDialog.styles';
import { Grid } from '@mui/material';
import { usePaymentCards } from '../../queries';
import { usePayInvoiceRetryMutation } from '../../mutations';
import { Button } from '../../components';
import { useLocalization } from '../../hooks';

export const PayInvoiceDialog = React.memo(
  ({ selectedInvoice, setClose, open }) => {
    const { mutateAsync: payInvoice } = usePayInvoiceRetryMutation();
    var { data: cards = [] } = usePaymentCards();
    const { t } = useLocalization();
    const handleClose = useCallback(() => {
      setClose(false);
    }, [setClose]);
    const handlePayInvoice = React.useCallback(
      id => {
        payInvoice({ invoiceId: selectedInvoice, cardId: id }).then(() => {
          setClose(false);
        });
      },
      [payInvoice, selectedInvoice, setClose]
    );

    const generateRowContent = React.useMemo(() => {
      return (
        <>
          {cards?.map((card, index) => {
            return (
              <Grid container key={index} sx={{ pb: 1 }}>
                <Grid item md={6}>
                  {card.brand}(********{card.last4})
                </Grid>
                <Grid item md={3}>
                  {card.defualt ? 'Default' : ''}
                </Grid>
                <Grid item md={3}>
                  <Button
                    variant="primary"
                    onClick={() => handlePayInvoice(card.id)}
                  >
                    {t.container.payInvoiceDialog.payNowBtn}
                  </Button>
                </Grid>
              </Grid>
            );
          })}
        </>
      );
    }, [cards, handlePayInvoice,t]);

    return (
      <DialogStyled
        open={open}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <CloseIconStyled onClick={handleClose} />
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={2}
            sx={{ pl: 3, pt: 3, pr: 3, mb: 2 }}
            className="dialogcontent"
          >
            <Grid container sx={{ pt: 2, fontWeight: '600' }}>
              <Grid item md={6}>
              {t.container.payInvoiceDialog.methhod}
              </Grid>
              <Grid item md={3}>
              {t.container.payInvoiceDialog.status}
              </Grid>
              <Grid item md={3}>
              {t.container.payInvoiceDialog.details}
              </Grid>
            </Grid>
            {generateRowContent}
          </Grid>
        </DialogContent>
      </DialogStyled>
    );
  }
);
