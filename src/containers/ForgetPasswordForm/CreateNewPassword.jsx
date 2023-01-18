import React, { useCallback, useEffect, useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
// import ReCAPTCHA from 'react-google-recaptcha';
import { ConfirmationDialog } from '../../containers';
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  Box,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '../../components';
import { useLocalization } from '../../hooks';
import {
  Fileds,
  HeadingWrapper,
  InfoLabel,
  InfoText,
  KeepMeSignedIn,
} from './ForgetPasswordForm.styles';
import { enterToFormikSubmit } from '../../utils';
import { ReactComponent as SuccessIcon } from '../../images/SuccessIcon.svg';
import { useAdminRecoverPasswordMutation } from '../../mutations';

export const CreateNewPassword = React.memo(
  ({ values, handleChange, handleBlur, setFieldValue, touched, errors }) => {
    const {
      mutateAsync: recoverPassword,
      isSuccess,
    } = useAdminRecoverPasswordMutation();
    const { t } = useLocalization();
    // const recaptchaRef = React.useRef();
    const [openDialog, setOpenDialog] = useState(false);
    const handleClose = React.useCallback(() => {
      setOpenDialog(false);
    }, []);

    const handleOpen = useCallback(() => {
      recoverPassword({
        userEmail: `${values.username}@${values.domain}`,
        password: values.password,
        recoveryCode: values.recoveryCode,
      }).then(() => {
        setOpenDialog(true);
      });
    }, [recoverPassword, values]);
    const handleNextClick = useCallback(() => {
      if (isSuccess) {
        window.location.replace('/sign-in');
      }
    }, [isSuccess]);

    const handleKeyPress = useCallback(
      e => enterToFormikSubmit(handleNextClick)(e),
      [handleNextClick]
    );

    const toggleShowPassword = useCallback(
      () => setFieldValue('showPassword', !values?.showPassword),
      [values, setFieldValue]
    );

    useEffect(() => {
      // recaptchaRef?.current?.executeAsync().then(token => {
      //   setFieldValue('recaptchaToken', token);
      // });
    }, [ setFieldValue]);

    return (
      <div onKeyDown={handleKeyPress}>
        <HeadingWrapper>
          <h2>{t.container.forgetPasswordForm.createPassword}</h2>
        </HeadingWrapper>
        <Fileds mt={3} w={100} pb={3}>
          <Typography mt={2}>{t.createAdminForm?.passwordLabel}</Typography>
          <FormControl size="small" fullWidth>
            <OutlinedInput
              error={!!errors.password && !!touched.password}
              id="password"
              name="password"
              onChange={handleChange}
              autoComplete="off"
              onBlur={handleBlur}
              type={values?.showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  {!!values?.password.length && (
                    <>
                        {!errors.password ? (
                    <InfoLabel variant="sccuess">
                      {t.createAdminForm?.strongPassword}
                    </InfoLabel>
                  ) : (
                    <InfoLabel variant="error">
                      {t.createAdminForm?.weakPassword}
                    </InfoLabel>
                  )}
                    </>
                  )}
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    edge="end"
                    tabIndex={-1}
                  >
                    {values?.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <InfoText>{t.createAdminForm?.passwordInfo}</InfoText>
          </FormControl>
          <Typography mt={2}>
            {t.createAdminForm?.repeatPasswordLabel}
          </Typography>
          <FormControl fullWidth size="small">
            <OutlinedInput
              error={!!errors.confirmPassword && !!touched.confirmPassword}
              id="repeat-password"
              name="confirmPassword"
              onChange={handleChange}
              autoComplete="off"
              onBlur={handleBlur}
              type={values?.showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  {!errors.confirmPassword && (
                    <InfoLabel variant="sccuess">
                      {t.createAdminForm?.matched}
                    </InfoLabel>
                  )}
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    edge="end"
                    tabIndex={-1}
                  >
                    {values?.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <InfoText>{t.createAdminForm?.repeatPasswordInfo}</InfoText>
          </FormControl>

          <KeepMeSignedIn
            control={<Checkbox defaultChecked />}
            label="Keep me Logged in"
          />
          <Box>
            <InfoText>{t.loginForm?.KeepMesignIndesc}</InfoText>
          </Box>

          {/* <Box sx={{ pt: 2, pb: '5px' , display:'flex' , justifyContent:'center' }}>
            {!!process.env.REACT_APP_RECAPTCHA_SITE_KEY && (
              <ReCAPTCHA
                ref={recaptchaRef}
                size="visible"
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} //Todo
              />
            )}
          </Box> */}
          <Button
            onClick={handleOpen}
            sx={{ height: 44, marginTop: 4 }}
            fullWidth
            variant="primary"
          >
            {t.createAdminForm?.nextButton}
          </Button>
        </Fileds>
        <ConfirmationDialog
          title="Congratulations !"
          subtitle="Your account has been verified"
          open={openDialog}
          handleClose={handleClose}
          handleDelete={handleNextClick}
          deletebtn="OK"
        >
          <SuccessIcon />
        </ConfirmationDialog>
      </div>
    );
  }
);
