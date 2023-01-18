import React, { useCallback } from 'react';
import {
  Fileds,
  HeadingWrapper,
  StyledTextField,
  ContentBox,
  PhoneNumber,
} from './CreateUserForm.styles';

import { CircularProgress, Typography } from '@mui/material';
import { Button } from '../../components';
import { useLocalization } from '../../hooks';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useSnackbar } from 'notistack';
import { enterToFormikSubmit } from '../../utils';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <ContentBox sx={{ p: 3 }}>{children}</ContentBox>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export const RecoveryStep = React.memo(
  ({
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
    isLoading,
  }) => {
    const [tabValue, setTabValue] = React.useState(0);

    const { enqueueSnackbar } = useSnackbar();
    const { t } = useLocalization();

    const onSubmit = useCallback(() => {
      errors.recoveryMail &&
        enqueueSnackbar(errors.recoveryMail, { variant: 'error' });
      errors.phoneNumber &&
        enqueueSnackbar(errors.phoneNumber, { variant: 'error' });
      handleSubmit();
    }, [errors, enqueueSnackbar, handleSubmit]);

    const handleKeyPress = useCallback(
      (e) => enterToFormikSubmit(onSubmit)(e),
      [onSubmit]
    );

    const handleTabChange = useCallback((event, newValue) => {
      setTabValue(newValue);
    }, []);

    const handleBack = useCallback(() => {
      setFieldValue('step', 'create-username');
    }, [setFieldValue]);

    return (
      <div onKeyDown={handleKeyPress}>
        <HeadingWrapper>
          <h2>{t.recoverform.title}</h2>
          <span>{t.recoverform.subtitle}</span>
        </HeadingWrapper>

        <Box sx={{ width: '100%', pt: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab label={t.recoverform.email} />
              <Tab label={t.recoverform.phone} />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <p>{t.recoverform.emailbody}</p>
            <Fileds mt={3} w={100}>
              <Typography mb={1}>
                <b>{t.recoverform.addEmailField}</b>
              </Typography>
              <StyledTextField
                autoFocus
                error={!!errors.recoveryMail && !!touched.recoveryMail}
                size="small"
                placeholder="Email"
                name="recoveryMail"
                value={values.recoveryMail}
                onBlur={handleBlur}
                onChange={handleChange}
                variant="outlined"
              />
            </Fileds>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <p>{t.recoverform.phonebody}</p>
            <Fileds mt={3} w={100}>
              <Typography mb={1}>
                <b>{t.recoverform.addPhone}</b>
              </Typography>
              <PhoneNumber
                defaultCountry={'us'}
                dropdownClass={'countrycodelist'}
                error={!!errors.phoneNumber && !!touched.phoneNumber}
                size="small"
                placeholder="Phone"
                name="phoneNumber"
                value={values.phoneNumber}
                onBlur={handleBlur}
                onChange={handleChange}
                variant="outlined"
              />
            </Fileds>
          </TabPanel>
        </Box>
        <Button
          onClick={onSubmit}
          sx={{ height: 44, marginTop: 4 }}
          fullWidth
          variant="primary"
        >
          {isLoading ? <CircularProgress size={30} color="inherit" /> : 'Next'}
        </Button>
        <Button
          onClick={handleBack}
          sx={{ height: 44, marginTop: 2 }}
          fullWidth
          variant="link"
        >
          {t.container.createUserForm.backCreatingUser}
        </Button>
      </div>
    );
  }
);
