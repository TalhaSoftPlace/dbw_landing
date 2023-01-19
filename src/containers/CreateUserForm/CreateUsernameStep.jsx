import React, { useCallback, useEffect } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
// import ReCAPTCHA from 'react-google-recaptcha';
import {
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { Button } from '../../components';
import { useLocalization } from '../../hooks';
import {
  Fileds,
  HeadingWrapper,
  InfoLabel,
  InfoText,
  StyledTextField,
  TypographyStyled,
} from './CreateUserForm.styles';
import { useCheckDomainExsist } from '../../queries';
import { useSnackbar } from 'notistack';
import { enterToFormikSubmit } from '../../utils';
import { useCreateAdminMutation } from './../../mutations';

export const CreateUsernameStep = React.memo(
  ({ values, handleChange, handleBlur, setFieldValue, touched, errors }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useLocalization();
    const { data: domainInfo, isLoading } = useCheckDomainExsist({
      domain: !errors.domain && values.domain,
      setFieldValue,
    });
    const {
      mutateAsync: addUser,
      isLoading: isCreating,
    } = useCreateAdminMutation();
    useEffect(() => {
      setFieldValue('isDomainExsist', !!domainInfo?.provider);
    }, [domainInfo, setFieldValue]);

    // const recaptchaRef = React.useRef();

    const handleNextClick = useCallback(() => {
      if (
        !errors.username &&
        !errors.domain &&
        !errors.password &&
        !errors.confirmPassword &&
        !errors.isDomainExsist
      ) {
        const { username, domain, password, registrarName } = values;
        !isLoading &&
          addUser({
            username,
            domainName: domain,
            password,
            registrarName,
          }).then(res => {
            if (!!res?.recoveryCode) {
              enqueueSnackbar('Registration Successful', {
                variant: 'success',
              });
              setFieldValue('recoveryMail', res?.recoveryCode);
              setFieldValue('step', 'add-recovery');
            } else {
              enqueueSnackbar(res?.description, {
                variant: 'error',
              });
            }
          });
      } else {
        errors.username &&
          enqueueSnackbar(errors.username, { variant: 'error' });
        errors.domain && enqueueSnackbar(errors.domain, { variant: 'error' });
        errors.password &&
          enqueueSnackbar(errors.password, { variant: 'error' });
        errors.confirmPassword &&
          enqueueSnackbar(errors.confirmPassword, { variant: 'error' });
        errors.isDomainExsist &&
          enqueueSnackbar(errors.isDomainExsist, { variant: 'error' });
      }
    }, [
      errors.username,
      errors.domain,
      errors.password,
      errors.confirmPassword,
      errors.isDomainExsist,
      values,
      isLoading,
      addUser,
      enqueueSnackbar,
      setFieldValue,
    ]);

    const handleKeyPress = useCallback(
      e => enterToFormikSubmit(handleNextClick)(e),
      [handleNextClick]
    );

    const toggleShowPassword = useCallback(
      () => setFieldValue('showPassword', !values?.showPassword),
      [values, setFieldValue]
    );

    useEffect(() => {
      // recaptchaRef?.current?.executeAsync().then((token) => {
      //   setFieldValue('recaptchaToken', token);
      // });
    }, [setFieldValue]);

    return (
      <div onKeyDown={handleKeyPress}>
        <HeadingWrapper>
          <h2>{t.createAdminForm?.title}</h2>
          <span>{t.createAdminForm?.subtitle}</span>
        </HeadingWrapper>
        <Fileds mt={3} w={100}>
          <Typography>{t.createAdminForm?.usernameLabel}</Typography>
          <StyledTextField
            autoFocus
            error={!!errors.username && !!touched.username}
            className="left"
            size="small"
            variant="outlined"
            name="username"
            onBlur={handleBlur}
            value={values?.username}
            onChange={handleChange}
            autoComplete="new-password"
            inputProps={{
              autoComplete: 'new-password',
              form: {
                autocomplete: 'new-password',
              },
            }}
          />
          <StyledTextField
            error={!!errors.domain && !!touched.domain}
            success={values?.isDomainExsist?.toString()}
            className="right-box filled"
            size="small"
            placeholder={t.createAdminForm?.domainLabel}
            variant="outlined"
            name="domain"
            value={values?.domain}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="new-password"
            inputProps={{
              autoComplete: 'new-password',
              form: {
                autocomplete: 'new-password',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">@</InputAdornment>
              ),
              endAdornment: isLoading && (
                <CircularProgress size={20} color="primary" />
              ),
            }}
          />
          <InfoText>{t.createAdminForm?.usernameInfo}</InfoText>
          <Typography mt={2}>{t.createAdminForm?.passwordLabel}</Typography>
          <FormControl size="small" fullWidth>
            <OutlinedInput
              error={!!errors.password && !!touched.password}
              id="password"
              name="password"
              value={values?.password}
              onChange={handleChange}
              autoComplete="new-password"
              inputProps={{
                autoComplete: 'new-password',
                form: {
                  autocomplete: 'new-password',
                },
              }}
              onBlur={handleBlur}
              type={values?.showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  {!!values?.password?.length && (
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
              value={values?.confirmPassword}
              onChange={handleChange}
              autoComplete="off"
              inputProps={{
                autoComplete: 'off',
                form: {
                  autocomplete: 'off',
                },
              }}
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
          {/* <Box sx={{ pt: 2, pb: '5px' , display:'flex' , justifyContent:'center'}}>
            {!!process.env.REACT_APP_RECAPTCHA_SITE_KEY && (
              <ReCAPTCHA
                ref={recaptchaRef}
                size="visible"
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} //Todo
              />
            )}
          </Box> */}
          <Button
            disabled={isCreating}
            onClick={handleNextClick}
            sx={{ height: 44, marginTop: 4 }}
            fullWidth
            variant="primary"
          >
            {isCreating ? (
              <CircularProgress size={30} color="inherit" />
            ) : (
              t.createAdminForm?.nextButton
            )}
          </Button>
          <TypographyStyled mt={2} align="center">
            {t.createAdminForm?.alreadyHave}
            <a href={process.env.REACT_APP_FRONTEND_URL}>{t.createAdminForm?.signin}</a>
          </TypographyStyled>
        </Fileds>
      </div>
    );
  }
);
