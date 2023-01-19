import React, { useCallback } from 'react';
import {
  Fileds,
  HeadingWrapper,
  StyledTextField,
} from './CreateUserForm.styles';
import { Button } from '../../components';
import { Box, Tooltip } from '@mui/material';
import { copyTextToClipboard } from '../../utils';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useToggle,useLocalization } from '../../hooks';
export const RecoveryCode = React.memo(({ values, handleChange }) => {
  const [showTooltip, toggleTooltip] = useToggle();
  const { t } = useLocalization();
  const handleCopy = useCallback(async () => {
    const text = values.recoveryMail;
    await copyTextToClipboard(text.toString());
    if (!showTooltip) {
      toggleTooltip();
      setTimeout(() => toggleTooltip(), 1500);
    }
  }, [values.recoveryMail, showTooltip, toggleTooltip]);

  const handleClose = useCallback(() => {
    window.location.replace(process.env.REACT_APP_FRONTEND_URL);
  }, []);

  return (
    <div>
      <HeadingWrapper>
        <h2>{t.container.createUserForm.RecoveryCode}</h2>
        <p>
        {t.container.createUserForm.RecoveryNote}
        </p>
      </HeadingWrapper>
      <Box sx={{ width: '100%', pt: 2 }}>
        <Fileds mt={3} w={100}>
          <StyledTextField
            size="small"
            placeholder="Recovery Code"
            name="recoveryMail"
            value={values.recoveryMail}
            onChange={handleChange}
            variant="outlined"
          />
          <Tooltip open={showTooltip} title={'Copied to clipboard!'}>
            <ContentCopyIcon
              onClick={handleCopy}
              sx={{
                position: 'absolute',
                top: '50px',
                right: '4px',
                color: 'text.blueLight',
                cursor: 'pointer',
              }}
            />
          </Tooltip>
        </Fileds>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
        <Button
          sx={{ height: 44, marginTop: 2, width: '110px' }}
          variant="primary"
          onClick={handleClose}
        >
          {t.container.createUserForm.oK}
        </Button>
      </Box>
    </div>
  );
});
