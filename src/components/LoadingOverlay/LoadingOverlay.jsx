import { Backdrop } from '@mui/material';
import React from 'react';
import { DBWSpinner } from '../DBWSpinner';

export const LoadingOverlay = React.memo(({ zIndex = 9999 }) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex }} open={true}>
      <DBWSpinner color="white" />
    </Backdrop>
  );
});
