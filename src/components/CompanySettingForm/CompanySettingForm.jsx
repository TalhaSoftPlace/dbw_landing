import React, { useCallback } from 'react';
import { LogoUploader, Button, RichTextarea } from '../../components';
import { Divider, Grid, InputLabel } from '@mui/material';
import {
  Content,
  ContentWrapper,
  IconWrapper,
  InputAdornmentStyled,
  LogoUploaderWrapper,
  TextFieldStyled,
} from './CompanySettingForm.styles';
import { useLocalization } from '../../hooks';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIconDesktop,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
} from '@mui/icons-material';
import { getErrorsArrayfromFormikErrors } from '../../utils';
import { useSnackbar } from 'notistack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const CompanySettingForm = React.memo(
  ({
    handleChange,
    values,
    setFieldValue,
    handleSubmit,
    errors,
    resetForm,
  }) => {
    const { t } = useLocalization();
    const { enqueueSnackbar } = useSnackbar();
    const submit = useCallback(() => {
      getErrorsArrayfromFormikErrors(errors).forEach(error => {
        enqueueSnackbar(error, { variant: 'error' });
      });
      handleSubmit();
    }, [enqueueSnackbar, errors, handleSubmit]);

    const resetLogoWrapper = React.useRef(null);

    const reset = useCallback(() => {
      resetForm();
      resetLogoWrapper.current();
    }, [resetForm, resetLogoWrapper]);

    const handleDeleteLogo = useCallback(() => {
      setFieldValue('logo', '');
    }, [setFieldValue]);

    return (
      <ContentWrapper>
        <Content>
          <Grid container>
            <Grid item sm={12} lg={12}>
              <LogoUploaderWrapper>
                <IconWrapper onClick={handleDeleteLogo}>
                  <DeleteForeverIcon />
                </IconWrapper>
                <LogoUploader
                  setFieldValue={setFieldValue}
                  defaultLogo={values?.logo}
                  handleDialogCloseRef={resetLogoWrapper}
                />
              </LogoUploaderWrapper>
            </Grid>
          </Grid>
        </Content>
        <br />
        <Grid container>
          <Grid item sm={12} lg={12}>
            <Divider sx={{ borderColor: 'text.primary' }} />
          </Grid>
        </Grid>
        <br />
        <Content>
          <Grid container spacing={2}>
            <Grid item sm={12} lg={12}>
              <InputLabel
                sx={{
                  fontSize: 18,
                  color: 'text.light',
                }}
              >
                {t.companySettings.companyname}:
              </InputLabel>
              <TextFieldStyled
                autoFocus
                error={!!errors.companyName}
                value={values.companyName}
                name="companyName"
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item sm={12} lg={6} sx={{ mt: 3 }}>
              <InputLabel
                sx={{
                  fontSize: 18,
                  color: 'text.light',
                }}
              >
                {t.components.companySettingForm.facebook}
              </InputLabel>
              <TextFieldStyled
                error={!!errors.facebook}
                value={values.facebook}
                name="facebook"
                onChange={handleChange}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornmentStyled position="end">
                      <FacebookIcon />
                    </InputAdornmentStyled>
                  ),
                }}
              />
            </Grid>

            <Grid item sm={12} lg={6} sx={{ mt: 3 }}>
              <InputLabel
                sx={{
                  fontSize: 18,
                  color: 'text.light',
                }}
              >
                {t.components.companySettingForm.instagram}
              </InputLabel>
              <TextFieldStyled
                error={!!errors.instagram}
                value={values.instagram}
                name="instagram"
                onChange={handleChange}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornmentStyled position="end">
                      <InstagramIconDesktop />
                    </InputAdornmentStyled>
                  ),
                }}
              />
            </Grid>

            <Grid item sm={12} lg={6} sx={{ mt: 3 }}>
              <InputLabel
                sx={{
                  fontSize: 18,
                  color: 'text.light',
                }}
              >
                {t.components.companySettingForm.linkedin}
              </InputLabel>
              <TextFieldStyled
                error={!!errors.linkedin}
                value={values.linkedin}
                name="linkedin"
                onChange={handleChange}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornmentStyled position="end">
                      <LinkedInIcon />
                    </InputAdornmentStyled>
                  ),
                }}
              />
            </Grid>

            <Grid item sm={12} lg={6} sx={{ mt: 3 }}>
              <InputLabel
                sx={{
                  fontSize: 18,
                  color: 'text.light',
                }}
              >
                {t.components.companySettingForm.twitter}
              </InputLabel>
              <TextFieldStyled
                error={!!errors.twitter}
                value={values.twitter}
                name="twitter"
                onChange={handleChange}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornmentStyled position="end">
                      <TwitterIcon />
                    </InputAdornmentStyled>
                  ),
                }}
              />
            </Grid>

            <Grid item sm={12} lg={12} sx={{ mt: 3 }}>
              <InputLabel
                sx={{
                  fontSize: 18,
                  color: 'text.light',
                }}
              >
                {t.components.companySettingForm.disclaimer}
              </InputLabel>
              <RichTextarea
                values={values}
                name="disclaimer"
                setFieldValue={setFieldValue}
              />
            </Grid>

            <Grid item lg={12} sx={{ textAlign: 'right', mt: 3 }}>
              <Button
                variant="primaryGrey"
                sx={{ width: '110px', mr: 1, lineHeight: 0 }}
                onClick={reset}
              >
                {t.components.companySettingForm.cancel}
              </Button>
              <Button
                variant="primaryLight"
                sx={{ width: '110px', lineHeight: 0 }}
                onClick={submit}
              >
                {t.components.companySettingForm.saveTxt}
              </Button>
            </Grid>
          </Grid>
        </Content>
      </ContentWrapper>
    );
  }
);
