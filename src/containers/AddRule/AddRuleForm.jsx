import { Box, Grid, MenuItem } from '@mui/material';
import React from 'react';
import {
  FieldLabel,
  SelectStyled,
  ColumnGrid,
  StyledTextField,
} from './AddRule.style';
import { Button } from '../../components';
import { useCallback } from 'react';
import { getErrorsArrayfromFormikErrors } from '../../utils';
import { useSnackbar } from 'notistack';
import { avatarIcons } from '../../constants';
import { useLocalization } from '../../hooks';

export const AddRuleForm = React.memo(
  ({ values, errors, handleChange, handleSubmit }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useLocalization();
    const submit = useCallback(() => {
      getErrorsArrayfromFormikErrors(errors).forEach(error => {
        enqueueSnackbar(error, { variant: 'error' });
      });
      handleSubmit();
    }, [enqueueSnackbar, errors, handleSubmit]);
    return (
      <>
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: 'center',
            paddingTop: '40px',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <ColumnGrid item xs={12}>
            <FieldLabel>{t.container.addRuleForm.ruleType}</FieldLabel>
            <SelectStyled
              fullWidth
              value={values.ruleType}
              onChange={handleChange}
              name="ruleType"
            >
              <MenuItem disabled value="choose">
                {t.container.addRuleForm.chooseRule}
              </MenuItem>
              <MenuItem value={'reply'}>
                {t.container.addRuleForm.replayRule}
              </MenuItem>
              <MenuItem value={'avatar'}>
                {t.container.addRuleForm.assignAvatar}
              </MenuItem>
            </SelectStyled>
          </ColumnGrid>
          {values.ruleType !== 'choose' && (
            <ColumnGrid item lg={6} xl={6} sm={12} md={12} xs={12}>
              <FieldLabel>{t.container.addRuleForm.domain}</FieldLabel>
              <StyledTextField
                value={values.domain}
                onChange={handleChange}
                type="text"
                name="domain"
              />
            </ColumnGrid>
          )}
          {values.ruleType === 'reply' && (
            <ColumnGrid item lg={6} xl={6} sm={12} md={12} xs={12}>
              <FieldLabel>{t.container.addRuleForm.hours}</FieldLabel>
              <SelectStyled
                fullWidth
                value={values.hours}
                onChange={handleChange}
                name="hours"
              >
                <MenuItem value="2">
                  {t.container.addRuleForm.forTwoHours}
                </MenuItem>
                <MenuItem value="4">
                  {t.container.addRuleForm.forFourHours}
                </MenuItem>
                <MenuItem value="6">
                  {t.container.addRuleForm.forSixHours}
                </MenuItem>
                <MenuItem value="12">
                  {t.container.addRuleForm.forTwelveHours}
                </MenuItem>
                <MenuItem value="24">
                  {t.container.addRuleForm.forTwentyFourHours}
                </MenuItem>
              </SelectStyled>
            </ColumnGrid>
          )}
          {values.ruleType === 'avatar' && (
            <>
              <ColumnGrid item lg={6} xl={6} sm={12} md={12} xs={12}>
                <FieldLabel>{t.container.addRuleForm.avatarLabel}</FieldLabel>
                <SelectStyled
                  fullWidth
                  value={values.avatar}
                  onChange={handleChange}
                  name="avatar"
                >
                  <MenuItem value="1">{avatarIcons[1]}</MenuItem>
                  <MenuItem value="2">{avatarIcons[2]}</MenuItem>
                  <MenuItem value="3">{avatarIcons[3]}</MenuItem>
                  <MenuItem value="4">{avatarIcons[4]}</MenuItem>
                  <MenuItem value="5">{avatarIcons[5]}</MenuItem>
                  <MenuItem value="6">{avatarIcons[6]}</MenuItem>
                  <MenuItem value="7">{avatarIcons[7]}</MenuItem>
                  <MenuItem value="8">{avatarIcons[8]}</MenuItem>
                </SelectStyled>
              </ColumnGrid>
              <ColumnGrid item xs={12}>
                <FieldLabel>{t.container.addRuleForm.colorLabel}</FieldLabel>
                <SelectStyled
                  fullWidth
                  value={values.color}
                  onChange={handleChange}
                  name="color"
                >
                  <MenuItem value="default">
                    {t.container.addRuleForm.defaultAvatar}
                  </MenuItem>
                  <MenuItem value="red">
                    {t.container.addRuleForm.redAvatar}
                  </MenuItem>
                  <MenuItem value="orange">
                    {t.container.addRuleForm.orangeAvatar}
                  </MenuItem>
                  <MenuItem value="blue">
                    {t.container.addRuleForm.blueAvatar}
                  </MenuItem>
                  <MenuItem value="yellow">
                    {t.container.addRuleForm.yellowAvatar}
                  </MenuItem>
                  <MenuItem value="green">
                    {t.container.addRuleForm.greenAvatar}
                  </MenuItem>
                </SelectStyled>
              </ColumnGrid>
            </>
          )}
        </Grid>
        <Box mt={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={submit}
            variant="primaryLight"
            sx={{ width: '110px', lineHeight: 0 }}
          >
            {values.update ? 'Update' : 'Save'}
          </Button>
        </Box>
      </>
    );
  }
);
