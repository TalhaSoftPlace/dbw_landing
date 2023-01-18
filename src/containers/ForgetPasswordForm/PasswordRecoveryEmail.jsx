import React, { useCallback, useEffect, useState } from 'react';
import { InputAdornment, Box } from '@mui/material';
import { Button } from '../../components';
import { ConfirmationDialog } from '../../containers';
import { useLocalization } from '../../hooks';
import {
  Fileds,
  HeadingWrapper,
  StyledTextField,
  ErrorIcon,
} from './ForgetPasswordForm.styles';
import { enterToFormikSubmit } from '../../utils';
// import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
export const PasswordRecoveryEmail = React.memo(
  ({ values, handleChange, handleBlur, setFieldValue, touched, errors }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const { t } = useLocalization();
    // const recaptchaRef = React.useRef();
    const navigate = useNavigate();

    const handleClose = React.useCallback(() => {
      setOpenDialog(false);
    }, []);
    // const handleOpen = useCallback(() => {
    //   setOpenDialog(true);
    // }, []);
    useEffect(() => {
      // recaptchaRef?.current?.executeAsync().then(token => {
      //   setFieldValue('recaptchaToken', token);
      // });
    }, [ setFieldValue]);

    const handleNextClick = useCallback(() => {
      setFieldValue('step', 'add-recovery');
    }, [setFieldValue]);
    const handleBackClick = useCallback(() => {
      navigate(`/sign-in`);
    }, [navigate]);
    const handleKeyPress = useCallback(
      e => enterToFormikSubmit(handleNextClick)(e),
      [handleNextClick]
    );
    return (
      <div onKeyDown={handleKeyPress}>
        <HeadingWrapper>
          <h2>{t.container.forgetPasswordForm.enterEmail}</h2>
          <p>{t.container.forgetPasswordForm.enterEmailToRecoverPass}</p>
        </HeadingWrapper>
        <Fileds sx={{ pt: 3, pb: 4 }} w={100}>
          <StyledTextField
            autoFocus
            className="left"
            size="small"
            variant="outlined"
            name="username"
            onBlur={handleBlur}
            value={values?.username}
            onChange={handleChange}
            inputProps={{
              autoComplete: 'off',
              form: {
                autocomplete: 'off',
              },
            }}
          />
          <StyledTextField
            error={!!errors.domain && !!touched.domain}
            className="right filled"
            size="small"
            placeholder={t.createAdminForm?.domainLabel}
            variant="outlined"
            name="domain"
            onChange={handleChange}
            onBlur={handleBlur}
            inputProps={{
              autoComplete: 'off',
              form: {
                autocomplete: 'off',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">@</InputAdornment>
              ),
            }}
          />
          {/* <Box sx={{pt:2, pb:'5px' , display:'flex' , justifyContent:'center'}}>
            {!!process.env.REACT_APP_RECAPTCHA_SITE_KEY && (
              <ReCAPTCHA
                ref={recaptchaRef}
                size="visible"
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} //Todo
              />
            )}
          </Box> */}
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
            <Button
              sx={{ height: 44, marginTop: 2, width: '110px', mr: 2 }}
              fullWidth
              variant="primaryGrey"
              onClick={handleBackClick}
            >
              {t.container.forgetPasswordForm.cancelButton}
            </Button>
            <Button
              sx={{ height: 44, marginTop: 2, width: '110px' }}
              variant="primary"
              onClick={handleNextClick}
            >
              {t.container.forgetPasswordForm.nextButton}
            </Button>
          </Box>
        </Fileds>
        <ConfirmationDialog
          title="Invalid Email !"
          subtitle="Please contact your administrator to recover password"
          open={openDialog}
          handleClose={handleClose}
        >
          <ErrorIcon />
        </ConfirmationDialog>
      </div>
    );
  }
);
