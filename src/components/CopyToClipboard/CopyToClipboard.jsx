import React, { useCallback } from 'react';
import { Wrapper } from './CopyToClipboard.styles';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { Box, Tooltip } from '@mui/material';
import { copyTextToClipboard } from '../../utils';
import { useToggle } from '../../hooks';

export const CopyToClipboard = React.memo(({ text }) => {
  const [showTooltip, toggleTooltip] = useToggle();

  const handleCopy = useCallback(async () => {
    await copyTextToClipboard(text.toString());
    if (!showTooltip) {
      toggleTooltip();
      setTimeout(() => toggleTooltip(), 1500);
    }
  }, [text, toggleTooltip, showTooltip]);

  return (
    <Wrapper onClick={handleCopy} onContextMenu={handleCopy}>
      <Box className="icon">
        <Tooltip open={showTooltip} title={'Copied to clipboard!'}>
          <CopyAllIcon />
        </Tooltip>
      </Box>

      <Tooltip title={text.toString()}>
        <Box className="text">{text.toString()}</Box>
      </Tooltip>
    </Wrapper>
  );
});
