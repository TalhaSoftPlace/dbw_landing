import { Box } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { Loading } from '../../components';
import { useAuth } from '../../hooks';
import {
  CloseIconStyled,
  DialogStyled,
  Wrapper,
} from './HandleNextStep.styles';

export const HandleNextStep = React.memo(({ values, show, handleClose }) => {
  const { refetch } = useAuth();
  const handlePaymentConfirmed = useCallback(
    ev => {
      if (ev.data === '3DS-authentication-complete') {
        refetch();
      }
    },
    [refetch]
  );
  useEffect(() => {
    window.addEventListener('message', handlePaymentConfirmed, false);
    return window.removeEventListener('message', handlePaymentConfirmed, false);
  }, [handlePaymentConfirmed]);
  return (
    <DialogStyled open={show} keepMounted aria-describedby="" fullWidth>
      <span
        style={{ position: 'absolute', right: '10px', top: '10px', zIndex: 4 }}
      >
        <CloseIconStyled onClick={handleClose} />
      </span>
      <Wrapper>
        <Box
          style={{
            position: 'absolute',
            top: '230px',
            left: '240px',
            zIndex: 1,
          }}
        >
          <Loading color="#174180" />
        </Box>
        <iframe title="Verify your payment" src={values?.nextAction} />
      </Wrapper>
    </DialogStyled>
  );
});
