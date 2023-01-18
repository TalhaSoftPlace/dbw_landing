import React from 'react';
import { Box } from '@mui/material';
import { StyledButton } from './EmailConversation.styles';
import { useLocalization } from '../../hooks';

export const ListFilter = React.memo(() => {
  const { t } = useLocalization();
  return (
    <Box
      sx={{ display: 'flex', bgcolor: 'background.primary', paddingBlock: '5px' }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <StyledButton size="small">{t.EmailConversation.filterTitle}</StyledButton>
      </Box>
      
    </Box>
  );
});
