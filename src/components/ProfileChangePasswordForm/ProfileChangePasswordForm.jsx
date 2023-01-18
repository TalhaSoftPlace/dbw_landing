import React, { useCallback } from 'react';
import {
  FieldGrid,
  FieldLabel,
  Wrapper,
  StyledButton,
  StyledBox,
  ButtonGrid,
  InfoLabel,
  StyledInputAdornment,
  StyledOutlinedInput,
  VisibilityOffIcon, VisibilityIcon
} from './ProfileChangePasswordForm.styles';
import { Grid, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useLocalization } from '../../hooks';
import {
  IconButton,
} from '@mui/material';
export const ProfileChangePasswordForm = React.memo(
  ({ handleChange, values, setFieldValue, handleSubmit, touched, errors }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useLocalization();

    const submit = useCallback(() => {
      Object.values(errors).forEach((error) => {
        enqueueSnackbar(error, { variant: 'error' });
      });
      handleSubmit(values);
    }, [enqueueSnackbar, errors, handleSubmit, values]);

    const toggleShowPassword = useCallback(
      () => setFieldValue('showPassword', !values?.showPassword),
      [values, setFieldValue]
    );

    return (
      <>
        <StyledBox sx={{ display: 'flex', justifyContent: 'center' }}>
          <Wrapper>
            <Box className="wrapper">
              <Grid container spacing={2} sx={{ pt: 2 }}>
              <FieldGrid item xs={12}>
                  <FieldLabel>Old Password:</FieldLabel>
                  <StyledOutlinedInput
                    error={!!errors.oldpassword && !!touched.oldpassword}
                    id="oldpassword"
                    name="oldpassword"
                    value={values?.oldpassword}
                    onChange={handleChange}
                    autoComplete="off"
                    type={values?.showPassword ? 'text' : 'password'}
                    fullWidth
                    endAdornment={
                      <StyledInputAdornment position="end">
                        {!!values?.oldpassword.length && (
                          <>
                          {!errors.oldpassword ? (
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
                          aria-label="toggle password VisibilityIcon"
                          onClick={toggleShowPassword}
                          edge="end"
                          tabIndex={-1}
                        >
                          {!values?.showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </StyledInputAdornment>
                    }
                  />
                </FieldGrid>
                
                <FieldGrid item xs={12} md={6}>
                  <FieldLabel>New Password:</FieldLabel>
                  <StyledOutlinedInput
                    error={!!errors.newpassword && !!touched.newpassword}
                    id="newpassword"
                    name="newpassword"
                    value={values?.newpassword}
                    onChange={handleChange}
                    autoComplete="off"
                    type={values?.showPassword ? 'text' : 'password'}
                    fullWidth
                    endAdornment={
                      <StyledInputAdornment position="end">
                        {!!values?.newpassword.length &&(
                          <>
                            {!errors.newpassword ? (
                              <InfoLabel variant="sccuess">
                                {t.createAdminForm?.strongPassword}
                              </InfoLabel>
                            ) : (
                              <InfoLabel variant="error">
                                {t.createAdminForm?.weakPassword}
                              </InfoLabel>
                            )}
                          </>
                        )
                }
                        <IconButton
                          aria-label="toggle password VisibilityIcon"
                          onClick={toggleShowPassword}
                          edge="end"
                          tabIndex={-1}
                        >
                          {!values?.showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </StyledInputAdornment>
                    }
                  />
                </FieldGrid>
                <FieldGrid item xs={12} md={6}>
                  <FieldLabel>
                    {t.createAdminForm?.repeatPasswordLabel}
                  </FieldLabel>
                  <StyledOutlinedInput
                    error={
                      !!errors.confirmPassword && !!touched.confirmPassword
                    }
                    id="confirmPassword"
                    name="confirmPassword"
                    value={values?.confirmPassword}
                    onChange={handleChange}
                    autoComplete="off"
                    type={values?.showPassword ? 'text' : 'password'}
                    fullWidth
                    endAdornment={
                      <StyledInputAdornment position="end">
                        {!errors.confirmPassword && (
                          <InfoLabel variant="sccuess">
                            {t.createAdminForm?.matched}
                          </InfoLabel>
                        )}
                        <IconButton
                          aria-label="toggle password VisibilityIcon"
                          onClick={toggleShowPassword}
                          edge="end"
                          tabIndex={-1}
                        >
                          {!values?.showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </StyledInputAdornment>
                    }
                  />
                  
                </FieldGrid>
              </Grid>
              <ButtonGrid>
                <StyledButton variant="primary" onClick={submit}>
                  Submit
                </StyledButton>
              </ButtonGrid>
            </Box>
          </Wrapper>
        </StyledBox>
      </>
    );
  }
);
