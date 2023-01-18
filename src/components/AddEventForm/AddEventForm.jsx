import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Switch,
} from '@mui/material';
import React, { useCallback, useRef } from 'react';
import { DialogWithButtons, EventTagInput } from '../../containers';
import { useLocalization } from '../../hooks';
import { DatePicker } from '../DatePicker';
import { TimePicker } from '../TimePicker';
import { isEqual } from 'underscore';
import {
  FieldGrid,
  FieldLabel,
  HelpText,
  TextFieldStyled,
  SelectStyled,
  StyledDay,
} from './AddEventForm.styles';
import { Button } from '../Button';
import { AttendeesBox } from '../AttendeesBox';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import { getErrorsArrayfromFormikErrors, getMeetingLink } from '../../utils';
import { useEffect, useMemo } from 'react';
import { useCreateNewMeeting } from '../../mutations';

export const AddEventForm = React.memo(
  ({
    initialValues,
    handleChange,
    values,
    setFieldValue,
    handleSubmit,
    errors,
    isSaving,
    isUpdate,
    submitForm,
  }) => {
    const { mutateAsync: createMeeting, isLoading } = useCreateNewMeeting();
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useLocalization();
    const inputRef = useRef();
    const [checked, setChecked] = React.useState(false);
    const submit = useCallback(() => {
      getErrorsArrayfromFormikErrors(errors).forEach(error => {
        enqueueSnackbar(error, { variant: 'error' });
      });
      if (values?.disableRepeatChange) {
        !errors && setFieldValue("showConfrimation", true);
      } else {
        handleSubmit();
      }
    }, [enqueueSnackbar, errors, handleSubmit, setFieldValue, values?.disableRepeatChange]);

    const isSaveDisabled = useMemo(() => isUpdate && isEqual(initialValues, values), [initialValues, isUpdate, values]);

    useEffect(() => {
      if (inputRef.current) {
        setTimeout(() => inputRef.current.focus(), 0);
      }
    }, [inputRef]);

    const handleStartDateChange = useCallback(
      e => {
        setFieldValue('startDateTime', e);
        if (moment(e).diff(moment(values.endDateTime), 'm') > 0) {
          setFieldValue('endDateTime', moment(e).add(30, 'm'));
        }
      },
      [setFieldValue, values]
    );

    const handleEndDateChange = useCallback(
      e => {
        setFieldValue('endDateTime', e);
      },
      [setFieldValue]
    );
    const handleRepeatEndDateChange = useCallback(
      e => {
        setFieldValue('recurrenceEndDate', e);
      },
      [setFieldValue]
    );
    const handleDaySelect = useCallback(
      day => {
        let days = values.weekDays;
        days[day] = days[day] === '1' ? '0' : '1';
        setFieldValue('weekDays', [...days]);
      },
      [setFieldValue, values.weekDays]
    );
    const handleToggleChange = useCallback(
      event => {
        if (!isLoading) {
          if (event.target.checked) {
            createMeeting().then((meetingId) => {
              setFieldValue("meetingId", meetingId);
              const link = getMeetingLink({
                meetingId,
              });
              setFieldValue('location', link);
              setChecked(true);
            });
          } else {
            setFieldValue('location', '');
            setChecked(false);
          }
        }
      },
      [createMeeting, isLoading, setFieldValue]
    );

    const handleHideConfirmation = useCallback(() => {
      setFieldValue("showConfrimation", false);
      setFieldValue("updateAll", false);
    }, [setFieldValue]);

    const handleCheckboxChange = useCallback((e) => {
      setFieldValue("updateAll", e.target.checked);
    }, [setFieldValue])
    return (
      <>
        <FieldGrid item xs={12}>
          <FieldLabel>{t.addEvent.title}:</FieldLabel>
          <FormControl size="small" fullWidth>
            <TextFieldStyled
              inputRef={inputRef}
              autoFocus
              error={!!errors.title}
              value={values.title}
              name="title"
              onChange={handleChange}
              placeholder={t.addEvent.enterTitle}
              fullWidth
            />
          </FormControl>
        </FieldGrid>

        <FieldGrid item xs={12}>
          <FieldLabel>{t.addEvent.eventTag}:</FieldLabel>
          <EventTagInput
            name="tags"
            {...{
              values,
              handleChange,
              setFieldValue,
            }}
            placeholder={t.addEvent.tagName}
          />
          <HelpText>{t.addEvent.tagHelpText}</HelpText>
        </FieldGrid>
        <FieldGrid item xs={12} md={6}>
          <FieldLabel>{t.components?.addEventForm.startDate}</FieldLabel>
          <DatePicker
            name="startDateTime"
            value={values.startDateTime}
            onChange={handleStartDateChange}
          />
        </FieldGrid>

        <FieldGrid item xs={12} md={6}>
          <FieldLabel>{t.components?.addEventForm.endDate}</FieldLabel>
          <DatePicker
            name="endDateTime"
            value={values.endDateTime}
            onChange={handleEndDateChange}
          />
        </FieldGrid>
        <FieldGrid item xs={12} md={6}>
          <FieldLabel>Start Time:</FieldLabel>
          <TimePicker
            placeholder="hh:mm am/pm"
            value={values.startDateTime}
            onChange={handleStartDateChange}
          />
        </FieldGrid>
        <FieldGrid item xs={12} md={6}>
          <FieldLabel>{t.components?.addEventForm.endTime}</FieldLabel>
          <TimePicker
            placeholder="hh:mm am/pm"
            value={values.endDateTime}
            onChange={handleEndDateChange}
          />
        </FieldGrid>
        <FieldGrid mt={1} item xs={12}>
          <SelectStyled
            disabled={values?.disableRepeatChange}
            fullWidth
            value={values.repeat}
            name="repeat"
            onChange={handleChange}
          >
            <MenuItem value="0">
              {t.components?.addEventForm.doesnotRepeat}
            </MenuItem>
            <MenuItem value="d">{t.components?.addEventForm.everyDay}</MenuItem>
            <MenuItem value="w">
              {t.components?.addEventForm.everyWeek}
            </MenuItem>
            <MenuItem value="m">
              {t.components?.addEventForm.everyMonth}
            </MenuItem>
            <MenuItem value="y">
              {t.components?.addEventForm.everyYear}
            </MenuItem>
          </SelectStyled>
        </FieldGrid>
        {values.repeat === 'd' && (
          <Grid item container xs={12}>
            <FieldGrid item md={12} lg={6}>
              <FieldLabel>{t.components?.addEventForm.afterDays}</FieldLabel>
              <Grid item xs={12}>
                <TextFieldStyled
                  error={!!errors.repeatEvery}
                  value={values.repeatEvery}
                  name="repeatEvery"
                  onChange={handleChange}
                  placeholder={'After days'}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    min: 1,
                  }}
                  fullWidth
                />
              </Grid>
            </FieldGrid>
            <FieldGrid item md={12} lg={6}>
              <FieldLabel>
                {t.components?.addEventForm.periodEndDate}
              </FieldLabel>
              <Grid item xs={12}>
                <DatePicker
                  name="recurrenceEndDate"
                  value={values.recurrenceEndDate}
                  onChange={handleRepeatEndDateChange}
                />
              </Grid>
            </FieldGrid>
          </Grid>
        )}
        {values.repeat === 'm' && (
          <Grid item container xs={12}>
            <FieldGrid item md={12} lg={6}>
              <FieldLabel> {t.components?.addEventForm.afterMonths}</FieldLabel>
              <Grid item xs={12}>
                <TextFieldStyled
                  error={!!errors.repeatEvery}
                  value={values.repeatEvery}
                  name="repeatEvery"
                  onChange={handleChange}
                  placeholder={'After months'}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    min: 1,
                  }}
                  fullWidth
                />
              </Grid>
            </FieldGrid>
            <FieldGrid item md={12} lg={6}>
              <FieldLabel>
                {t.components?.addEventForm.periodEndDate}
              </FieldLabel>
              <Grid item xs={12}>
                <DatePicker
                  name="recurrenceEndDate"
                  value={values.recurrenceEndDate}
                  onChange={handleRepeatEndDateChange}
                />
              </Grid>
            </FieldGrid>
          </Grid>
        )}
        {values.repeat === 'y' && (
          <Grid item container xs={12}>
            <FieldGrid item md={12} lg={6}>
              <FieldLabel>{t.components?.addEventForm.afteryears}</FieldLabel>
              <Grid item xs={12}>
                <TextFieldStyled
                  error={!!errors.repeatEvery}
                  value={values.repeatEvery}
                  name="repeatEvery"
                  onChange={handleChange}
                  placeholder={'After years'}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    min: 1,
                  }}
                  fullWidth
                />
              </Grid>
            </FieldGrid>
            <FieldGrid item md={12} lg={6}>
              <FieldLabel>
                {t.components?.addEventForm.periodEndDate}
              </FieldLabel>
              <Grid item xs={12}>
                <DatePicker
                  name="recurrenceEndDate"
                  value={values.recurrenceEndDate}
                  onChange={handleRepeatEndDateChange}
                />
              </Grid>
            </FieldGrid>
          </Grid>
        )}
        {values.repeat === 'w' && (
          <Grid item container xs={12}>
            <FieldGrid item md={12} lg={6}>
              <FieldLabel>{t.components?.addEventForm.weekDays}</FieldLabel>
              <Grid item xs={12}>
                <Box
                  sx={{ display: 'flex', gap: '4px', height: '50px' }}
                  alignItems="center"
                >
                  <StyledDay
                    onClick={() => handleDaySelect(0)}
                    className={values.weekDays?.[0] === '1' ? 'selected' : ''}
                  >
                    M
                  </StyledDay>
                  <StyledDay
                    onClick={() => handleDaySelect(1)}
                    className={values.weekDays?.[1] === '1' ? 'selected' : ''}
                  >
                    T
                  </StyledDay>
                  <StyledDay
                    onClick={() => handleDaySelect(2)}
                    className={values.weekDays?.[2] === '1' ? 'selected' : ''}
                  >
                    W
                  </StyledDay>
                  <StyledDay
                    onClick={() => handleDaySelect(3)}
                    className={values.weekDays?.[3] === '1' ? 'selected' : ''}
                  >
                    T
                  </StyledDay>
                  <StyledDay
                    onClick={() => handleDaySelect(4)}
                    className={values.weekDays?.[4] === '1' ? 'selected' : ''}
                  >
                    F
                  </StyledDay>
                  <StyledDay
                    onClick={() => handleDaySelect(5)}
                    className={values.weekDays?.[5] === '1' ? 'selected' : ''}
                  >
                    S
                  </StyledDay>
                  <StyledDay
                    onClick={() => handleDaySelect(6)}
                    className={values.weekDays?.[6] === '1' ? 'selected' : ''}
                  >
                    S
                  </StyledDay>
                </Box>
              </Grid>
            </FieldGrid>
            <FieldGrid item md={12} lg={6}>
              <FieldLabel>
                {t.components?.addEventForm.periodEndDate}
              </FieldLabel>
              <Grid item xs={12}>
                <DatePicker
                  name="recurrenceEndDate"
                  value={values.recurrenceEndDate}
                  onChange={handleRepeatEndDateChange}
                />
              </Grid>
            </FieldGrid>
          </Grid>
        )}

        <Grid item xs={12}>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <FieldLabel>{t.addEvent.attendees}:</FieldLabel>
              <AttendeesBox
                {...{
                  values,
                  setFieldValue,
                  handleChange,
                }}
                makeRequest={isUpdate}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={7}>
              <Grid item xs={12}>
                <FieldLabel>
                  {t.addEvent.location}:
                  <Switch
                    checked={checked}
                    value={checked}
                    onChange={handleToggleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </FieldLabel>
              </Grid>
              <FieldGrid item xs={12}>
                <TextFieldStyled
                  value={values.location}
                  name="location"
                  onChange={handleChange}
                  placeholder={t.addEvent.remote}
                  fullWidth
                />
              </FieldGrid>

              <Grid item xs={12}>
                <FieldLabel>{t.addEvent.notification}:</FieldLabel>
              </Grid>
              <FieldGrid item xs={12}>
                <SelectStyled
                  fullWidth
                  value={values.notification}
                  name="notification"
                  onChange={handleChange}
                >
                  <MenuItem value="15">
                    {t.components?.addEventForm.fifteenMinutes}
                  </MenuItem>
                  <MenuItem value="30">
                    {t.components?.addEventForm.thirtyMinutes}
                  </MenuItem>
                  <MenuItem value="60">
                    {t.components?.addEventForm.oneHour}
                  </MenuItem>
                  <MenuItem value="0">
                    {t.components?.addEventForm.noNotification}
                  </MenuItem>
                </SelectStyled>
              </FieldGrid>

              <Grid item xs={12}>
                <FieldLabel>{t.addEvent.description}:</FieldLabel>
              </Grid>
              <FieldGrid item xs={12}>
                <TextFieldStyled
                  value={values.description}
                  name="description"
                  onChange={handleChange}
                  placeholder={t.addEvent.descplaceholder}
                  multiline
                  rows={3}
                  fullWidth
                />
              </FieldGrid>
            </Grid>
          </Grid>
        </Grid>
        <FieldGrid item xs={12}>
          <FormControlLabel
            sx={{ color: 'text.primaryText' }}
            control={
              <Checkbox
                checked={values.meetingMinutes}
                name="meetingMinutes"
                onChange={handleChange}
              />
            }
            label={t.addEvent.meetingMinutes}
          />
        </FieldGrid>
        <FieldGrid item xs={8}></FieldGrid>
        <FieldGrid item xs={4}>
          <Button
            onClick={submit}
            fullWidth
            size="small"
            variant="primary"
            disabled={isSaving || isSaveDisabled}
          >
            {isSaving ? (
              <>
                <CircularProgress size={26} color="inherit" />
              </>
            ) : (
              <>{t.components?.addEventForm.saveTxt}</>
            )}
          </Button>
        </FieldGrid>
        {!!values?.showConfrimation && (
          <DialogWithButtons
            open={values?.showConfrimation}
            onClose={handleHideConfirmation}
            handleDanger={submitForm}
            dangerText="Update"
            onChange={handleCheckboxChange}
            occrance
            checkboxValue={values?.updateAll}
          >
            <p>
              Do you want to update all occurrences or just this event?
            </p>
          </DialogWithButtons>
        )}
      </>
    );
  }
);
