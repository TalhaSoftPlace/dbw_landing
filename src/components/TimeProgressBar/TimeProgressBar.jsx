import { Box, Tooltip } from '@mui/material';
import * as React from 'react';
import { BorderLinearProgress } from './TimeProgressBar.styles';

export const TimeProgressBar = React.memo(({ value, minutesRemaning }) => {
  return (
    <Box sx={{ width: '54px' }}>
      <Tooltip
        title={
          minutesRemaning > 0
            ? `${Math.floor(minutesRemaning / 60)}h ${minutesRemaning %
                60}m left to reply`
            : `You are late`
        }
      >
        <BorderLinearProgress variant="determinate" value={value} />
      </Tooltip>
    </Box>
  );
});
