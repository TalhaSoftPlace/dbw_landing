import { Box, Typography } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { EmailInfoBox } from './EmailInfoBox';

export const EmailInfo = React.memo(({ email }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = useMemo(() => !!anchorEl, [anchorEl]);
  const handleClick = useCallback((event) => {
    setAnchorEl(event?.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);
  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flexGrow: 0,
          }}
        >
          <Typography
            className="conversationtext sendername"
            sx={{
              display: 'inline',
            }}
            component="span"
            color="email.text.lightgrey"
            variant="inherit"
          >
            {email?.sender}
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 0,
          }}
        >
          <ExpandMoreIcon
            sx={{
              color: 'text.light',
            }}
          />
        </Box>
      </Box>
      <EmailInfoBox
        email={email}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      />
    </>
  );
});
