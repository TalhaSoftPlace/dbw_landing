import React, { useCallback} from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';

import {
  FormControl,
  IconButton,
  InputAdornment,
  
  Typography,
} from '@mui/material';
import { Button } from '../../components';
import { useLocalization } from '../../hooks';
import {
  Fileds,
  HeadingWrapper,
  InfoLabel,
  OutlinedInputs,
} from './AdminPasswordUpdate.styles';
import { useSnackbar } from 'notistack';
import { enterToFormikSubmit } from '../../utils';

export const CreateNewPassword = React.memo(
  ({ values, handleChange, setFieldValue, touched, errors , handleSubmit }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useLocalization();
    const submit = useCallback(() => {
      Object.values(errors).forEach((error) => {
        enqueueSnackbar(error, { variant: 'error' });
      });
     
      handleSubmit(values);
    }, [enqueueSnackbar, errors, handleSubmit, values]);

    const handleKeyPress = useCallback(
      (e) => enterToFormikSubmit(submit)(e),
      [submit]
    );

    const toggleShowPassword = useCallback(
      () => setFieldValue('showPassword', !values?.showPassword),
      [values, setFieldValue]
    );

    
    return (
      <div onKeyDown={handleKeyPress}>
        <HeadingWrapper>
          <h2>Change User Password</h2>
        </HeadingWrapper>
        <Fileds mt={3} w={100} pb={3}>
        <Typography mt={2} sx={{color:'text.primaryText'}}> Admin {t.createAdminForm?.passwordLabel}</Typography>
          <FormControl size="small" fullWidth>
            <OutlinedInputs
              error={!!errors.adminPassword && !!touched.adminPassword}
              id="adminPassword"
              name="adminPassword"
              onChange={handleChange}
              value={values?.adminPassword}
              autoComplete="off"
              type={values?.showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  {!!values?.adminPassword.length && (
                    <>
                      {!errors.adminPassword ? (
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
         
          </FormControl>
          <Typography mt={2} sx={{color:'text.primaryText'}}> New {t.createAdminForm?.passwordLabel}</Typography>
          <FormControl size="small" fullWidth>
            <OutlinedInputs
              error={!!errors.newPassword && !!touched.newPassword}
              id="newPassword"
              name="newPassword"
              onChange={handleChange}
              value={values?.newPassword}
              autoComplete="off"
              type={values?.showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  {!!values?.newPassword.length && (
                    <>
                      {!errors.newPassword ? (
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
         
          </FormControl>
          <Typography mt={2} sx={{color:'text.primaryText'}}>
            {t.createAdminForm?.repeatPasswordLabel}
          </Typography>
          <FormControl fullWidth size="small">
            <OutlinedInputs
              error={!!errors.confirmPassword && !!touched.confirmPassword}
              id="repeat-password"
              name="confirmPassword"
              onChange={handleChange}
              value={values?.confirmPassword}
              autoComplete="off"
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
          </FormControl>

          <Button
            onClick={submit}
            sx={{ height: 44, marginTop: 4 }}
            fullWidth
            variant="primary"
          >
            Submit
          </Button>
        </Fileds>
        
      </div>
    );
  }
);
