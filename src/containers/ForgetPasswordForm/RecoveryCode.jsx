import React from 'react';
import {
  HeadingWrapper,
  TypographyStyled,
  Fileds,
  InfoText,
} from './ForgetPasswordForm.styles';
import { Button } from '../../components';
import { FormControl, OutlinedInput, Box } from '@mui/material';
import { useLocalization } from '../../hooks';
export const RecoveryCode = React.memo(
  ({ values, handleChange, handleBlur, setFieldValue }) => {
    const { t } = useLocalization();
    const handleNext = React.useCallback(() => {
      setFieldValue('step', 'reset-password');
    }, [setFieldValue]);
    const handleforgetCode = React.useCallback(() => {
      setFieldValue('step', 'RecoveryDnsForm');
    }, [setFieldValue]);
    return (
      <div>
        <HeadingWrapper>
          <h2>{t.container.forgetPasswordForm.passwordRecovery}</h2>
        </HeadingWrapper>
        <Fileds className="disable-hover" mt={3} pb={4} w={100}>
          <TypographyStyled pt={3} pb={1}>
          {t.container.forgetPasswordForm.recoveryCode}
          </TypographyStyled>
          <FormControl size="small" fullWidth>
            <OutlinedInput
              autoFocus
              variant="outlined"
              id="recoverycode"
              name="recoveryCode"
              value={values.recoverycode}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="6a6e 0d3c 35c8 046b"
            />
            <InfoText sx={{ textAlign: 'right', cursor: 'pointer' }}>
              <Box className="forgotpassword" onClick={handleforgetCode}>
              {t.container.forgetPasswordForm.forgetCode}
              </Box>
            </InfoText>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              sx={{ height: 44, marginTop: 6 }}
              fullWidth
              variant="primary"
              onClick={handleNext}
            >
              {t.container.forgetPasswordForm.nextButton}
            </Button>
          </Box>
        </Fileds>
      </div>
    );
  }
);
