import React, { useCallback, useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { ConfirmationDialog } from '../../containers';
import { Button, LoadingOverlay } from '../../components';
import { useLocalization } from '../../hooks';
import {
  Fileds,
  HeadingWrapper,
  InfoText,
  KeepMeSignedIn,
  TypographyStyled,
} from './Login.styles';
import { enterToFormikSubmit } from '../../utils';
import { useNavigate } from 'react-router-dom';
export const LoginForm = React.memo(
  ({
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
    isLoading,
  }) => {
    const { t } = useLocalization();
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const handleKeyPress = useCallback(
      e => enterToFormikSubmit(handleSubmit)(e),
      [handleSubmit]
    );

    const toggleShowPassword = useCallback(
      () => setFieldValue('showPassword', !values?.showPassword),
      [values, setFieldValue]
    );

    const handleClose = React.useCallback(() => {
      setOpenDialog(false);
    }, []);

    const handleOpen = useCallback(row => {
      setOpenDialog(true);
    }, []);
    const handleNavigate = useCallback(
      user => {
        navigate(`/forget-password`);
      },
      [navigate]
    );
    const handleUsernameChange = useCallback(
      e => {
        setFieldValue('username', e.target.value?.replace(/\s/g, ''));
      },
      [setFieldValue]
    );
    const confirmationText = React.useMemo(() => {
      return (
        <Grid container sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              textAlign: 'center',
              width: '100%',
              fontSize: '35px',
              fontWeight: '600',
              color: 'text.blueLight',
            }}
          >
            {' '}
            {t.container.login.forgetPassBtn}
          </Box>
          <Box>{t.container.login.forAdministrationDomain}</Box>
          <Box>{t.container.login.forUserDomain}</Box>
        </Grid>
      );
    }, [t]);
    return (
      <>
        <form onKeyDown={handleKeyPress}>
          {isLoading && <LoadingOverlay />}
          <HeadingWrapper>
            <h2>{t.loginForm?.title}</h2>
            <span>{t.loginForm?.subtitle}</span>
          </HeadingWrapper>
          <Fileds className="disable-hover" mt={3} w={100}>
            <TypographyStyled mt={2}>
              {t.loginForm?.usernameLabel}
            </TypographyStyled>
            <FormControl size="small" fullWidth>
              <OutlinedInput
                autoFocus
                variant="outlined"
                id="username"
                name="username"
                value={values?.username}
                onChange={handleUsernameChange}
                onBlur={handleBlur}
                type={values?.username ? 'text' : 'username'}
                placeholder={t.loginForm?.usernamePlaceholder}
              />
            </FormControl>

            <Typography mt={2}>{t.loginForm?.passwordLabel}</Typography>
            <FormControl size="small" fullWidth>
              <OutlinedInput
                placeholder={t.loginForm?.passwordPlaceholder}
                id="password"
                name="password"
                value={values?.password}
                onChange={handleChange}
                onBlur={handleBlur}
                type={values?.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                      edge="end"
                    >
                      {values?.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  width: '100%',
                  color: 'text.blueLight',
                  cursor: 'pointer',
                  pt: 1,
                }}
              >
                <InfoText onClick={handleOpen}>
                  <u>{t.loginForm?.forgetPassword}</u>
                </InfoText>
              </Box>
            </FormControl>
            <KeepMeSignedIn
              control={<Checkbox defaultChecked />}
              label="Keep me Logged in"
            />
            <Box>
              <InfoText>{t.loginForm?.KeepMesignIndesc}</InfoText>
            </Box>

            <Button
              disabled={isLoading}
              onClick={handleSubmit}
              sx={{ height: 44, marginTop: 4 }}
              fullWidth
              variant="primary"
            >
              {t.loginForm?.signInbutton}
            </Button>
          </Fileds>
        </form>
        <ConfirmationDialog
          open={openDialog}
          handleClose={handleClose}
          handleDelete={handleNavigate}
          deletebtn="Continue"
          cancelbtn="Cancel"
        >
          {confirmationText}
        </ConfirmationDialog>
      </>
    );
  }
);
