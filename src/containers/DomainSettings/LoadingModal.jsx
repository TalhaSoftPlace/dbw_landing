import { Backdrop, Box, Typography } from '@mui/material';
import React from 'react';
import { StyledBox, SuccessIcon } from './LoadingModal.styles';
import { useLocalization } from '../../hooks';
import { DBWSpinner, Button } from '../../components';
export const LoadingModal = React.memo(
  ({ zIndex = 99999, handleCancel, completed }) => {
    const { t } = useLocalization();

    const domainLoadingText = React.useMemo(() => {
      return (
        <Box sx={{ color: 'inherit' }}>
          {t.domainloadingtext1}
          <br />
          {t.domainloadingtext2}
        </Box>
      );
    }, [t.domainloadingtext1, t.domainloadingtext2]);

    const successText = React.useMemo(() => {
      return (
        <Box sx={{ color: 'inherit' }}>
          {t?.container?.domainSetting?.successTxt}
          <br />
          {t?.container?.domainSetting?.successMsg}
        </Box>
      );
    }, [t]);
    return (
      <Backdrop sx={{ zIndex }} open={true}>
        <StyledBox>
          <Typography color="text.blueLight" variant="h4">
            {completed ? 'Successfully Verified' : t.verifyDomain.verifying}
          </Typography>
          <Typography color="text.dark" variant="subtitle1">
            {completed ? successText : domainLoadingText}
          </Typography>
          <Box mt={3} mb={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            {completed ? (
              <SuccessIcon />
            ) : (
              <DBWSpinner size={150} color="#266CD5" />
            )}
          </Box>
          <Button variant="primary" width="160px" onClick={handleCancel}>
            {completed ? 'Ok' : 'Cancel'}
          </Button>
        </StyledBox>
      </Backdrop>
    );
  }
);
