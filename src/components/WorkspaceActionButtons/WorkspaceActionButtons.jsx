import React from 'react';
import { Button } from '../Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import { BtnWrapper } from './WorkspaceActionButtons.style';

export const WorkspaceActionButtons = React.memo(() => {
  return (
    <BtnWrapper>
      <Button size="small" variant="primary">
        <EditOutlinedIcon
          style={{ fontSize: '16px' }}
          sx={{ color: 'text.white' }}
        />
        &nbsp; New Message
      </Button>
      <Button sx={{ ml: 1 }} size="small" variant="outlined">
        <VideocamIcon
          style={{ fontSize: '16px' }}
          sx={{ color: 'text.white' }}
        />
        &nbsp; New Meeting
      </Button>
    </BtnWrapper>
  );
});
