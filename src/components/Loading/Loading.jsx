import { Box, useTheme } from '@mui/material';
import React from 'react';
import { DBWSpinner } from '../DBWSpinner';

export const Loading = React.memo(({ color }) => {
  const muiTheme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        color,
      }}
    >
      <DBWSpinner color={color ?? muiTheme.type === 'dark' ? '#fff' : '#000'} />
    </Box>
  );
});
