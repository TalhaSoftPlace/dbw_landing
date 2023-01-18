import React from 'react';
import { Box } from '@mui/material';
import { SubjectStyle } from './SingleEmailView.styles';

export const EmailSubject = React.memo(({ email }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: 'background.primary',
        padding: '5px',
      }}
    >
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <SubjectStyle size="small">{email?.subject}</SubjectStyle>
      </Box>
    </Box>
  );
});
