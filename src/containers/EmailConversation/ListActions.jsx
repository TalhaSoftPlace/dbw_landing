import React from 'react';
import { Stack, IconButton } from '@mui/material';
import {TimeWrapper} from './EmailConversation.styles';
import {
  Typography,
} from '@mui/material';
import OpenInNewSharpIcon from '@mui/icons-material/OpenInNewSharp';
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import { ReactComponent as BackArrowIcon } from '../../images/backarrow.svg';
import { ReactComponent as BackwardArrowIcon } from '../../images/backwordarrow.svg';
import { ReactComponent as DotIcon } from '../../images/doticon.svg';
import { useLocalization } from '../../hooks';
export const ListActions = React.memo(() => {
  const { t } = useLocalization();
  return (
    <Stack direction="row" spacing={1}>
      <TimeWrapper>
        <Typography className="time"
          component="span"
          sx={{ fontSize: 13  , display: { xs: 'none', sm: 'none', md:'none', lg: 'flex' }  }}
        >
          {t.EmailConversation.time}
        </Typography>
      </TimeWrapper>
      <IconButton aria-label="attach" size="small">
        <BackwardArrowIcon sx={{ color: 'text.blueLight' }} fontSize="inherit" />
      </IconButton>
      <IconButton aria-label="attach" size="small">
        <BackArrowIcon sx={{ color: 'text.blueLight' }} fontSize="inherit" />
      </IconButton>
      <IconButton aria-label="flag" size="small">
        <ArrowForwardSharpIcon sx={{ color: 'text.blueLight' }} fontSize="inherit" />
      </IconButton>
      <IconButton aria-label="delete" size="small">
        <OpenInNewSharpIcon sx={{ color: 'text.blueLight' }} fontSize="inherit" />
      </IconButton>
      <IconButton aria-label="delete" size="small">
        <DotIcon sx={{ color: 'text.blueLight' }} fontSize="inherit" />
      </IconButton>
    </Stack>
  );
});
