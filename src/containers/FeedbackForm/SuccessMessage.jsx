import {Box, Typography  } from '@mui/material';
import React from 'react';
import {Button} from '../../components';
import { StyledBox, SuccessIcon } from './FeedbackForm.styles';
import { useLocalization } from '../../hooks';
export const SuccessMessage = React.memo(
  ({ setFieldValue }) => {
    const { t } = useLocalization();

const handleBack = React.useCallback(() => {
    setFieldValue('step', 'feedback');
},[setFieldValue]);

    return (
        <StyledBox>
            <Box mt={3} mb={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <SuccessIcon />
          </Box>
          <Typography color="text.blueLight" variant="h4" sx={{pb:4 , pt:1}}>
            {t.container.successMessage.feedBackSuccessMessage}
          </Typography>
          <Button variant="primary" width="160px" onClick={handleBack}>
          {t.container.successMessage.okButton}
          </Button>
        </StyledBox>
    );
  }
);
