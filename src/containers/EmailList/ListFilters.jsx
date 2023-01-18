import React from 'react';
import { Box } from '@mui/material';
import { useLocalization } from '../../hooks';

import { ReactComponent as SortIcon } from '../../images/sort.svg';
import { StyledButton } from './EmailList.styles';

export const ListFilter = React.memo(() => {
  
  const { t } = useLocalization();

  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: 'background.primary',
        height: '37px',
        paddingBlock: '10px',
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <StyledButton size="small">{t.container.emailList.allEmails}</StyledButton>
        <StyledButton size="small">{t.container.emailList.readEmails}</StyledButton>
        <StyledButton size="small">{t.container.emailList.unreadEmails}</StyledButton>
      </Box>
      <Box sx={{ flexGrow: 'none' }}>
        <StyledButton sx={{ marginLeft: 'auto' }} size="small">
          Newest first &nbsp;&nbsp; <SortIcon />
        </StyledButton>
      </Box>
    </Box>
  );
});
