import { Box, DialogContent, Grid, Typography } from '@mui/material';
import { Formik } from 'formik';
import moment from 'moment';
import React, { useCallback, useMemo } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { calenderAtom, eventFormAtom } from '../../atoms';
import { AddEventForm, Button } from '../../components';
import { useLocalization } from '../../hooks';
import {
  useCreateCalendarEvent,
  useCreateTag,
  useUpdateCalendarEvent,
  useUpdateCalendarEventByCalendarEventId,
} from '../../mutations';
import { useEventTags, useTags, useAttendeesByEventId } from '../../queries';
import { getCurrentTImeWithInterval, getMeetingLink } from '../../utils';
import { CloseIconStyled, DialogStyled } from './AddEvent.styles';
import { addCalendarEventSchema } from './validation.schema';
import { forEach } from 'p-iteration';
 
export const AddEvent = React.memo(() => {
  const [{ open, startDate, event }, setNewEventDialog] = useRecoilState(
    eventFormAtom
  );

  const notifcationMins = useMemo(() => {
    const mins = event?.alertDateTime
      ? moment(event?.start)?.diff(moment.utc(event?.alertDateTime), 'm')
      : 0;
    return (!!event && mins.toString()) || undefined;
  }, [event]);
  const { mutateAsync: createEvent, isLoading } = useCreateCalendarEvent();
  const {
    mutateAsync: updateEvent,
    isLoading: isUpdating,
  } = useUpdateCalendarEvent({
    eventId: event?.eventId,
  });
  const {
    mutateAsync: updateByClalendarEventId,
    isLoading: isUpdatingByCalendarEventId
  } = useUpdateCalendarEventByCalendarEventId({
    calendarEventId: event?.calendarEventId,
  });
  const { t } = useLocalization();
  const { data: allTags = [] } = useTags();
  const { data: eventTags = [] } = useEventTags({ eventId: event?.eventId });
  const { data: eventAttendees = [] } = useAttendeesByEventId({
    eventId: event?.eventId,
  });

  const filtered = useMemo(
    () => eventAttendees?.filter(eventAttendee => !eventAttendee?.organizer),
    [eventAttendees]
  );
  const { mutateAsync: createTag, isLoading: isCreatingTags } = useCreateTag();

  const resetEventDialog = useResetRecoilState(eventFormAtom);
  const setCalenderState = useSetRecoilState(calenderAtom);

  const handleClose = React.useCallback(() => {
    setNewEventDialog({
      open: false,
      startDate: getCurrentTImeWithInterval(30),
    });
  }, [setNewEventDialog]);

  const handleOpen = React.useCallback(() => {
    setNewEventDialog({
      open: true,
      startDate: getCurrentTImeWithInterval(30),
    });
  }, [setNewEventDialog]);

  const initialValues = useMemo(
    () => ({
      title: event?.title ?? '',
      startDateTime: event?.start
        ? moment(event?.start)
        : startDate.hours()
        ? startDate
        : startDate.add(9, 'h'),
      endDateTime: event?.end
        ? moment(event?.end)
        : moment(startDate.hours() ? startDate : startDate.add(9, 'h')).add(
            30,
            'm'
          ),
      location:
        event?.location ?? !!event?.meetingId
          ? getMeetingLink({
              meetingId: event?.meetingId,
            })
          : '',
      description: event?.desc ?? '',
      notification: notifcationMins ?? '15',
      repeat: event?.recurrencePeriod?.toLowerCase() ?? '0',
      disableRepeatChange: !!event?.recurrencePeriod && event?.recurrencePeriod?.toLowerCase() !== "0",
      repeatEvery: event?.repeatEvery ?? 1,
      meetingId: event?.meetingId ?? undefined,
      weekDays: event?.weekIntervalBitmap?.split('') || [
        '1',
        '1',
        '1',
        '1',
        '1',
        '0',
        '0',
      ],
      recurrenceEndDate:
        event?.recurrenceEndDate ?? moment(startDate).add(2, 'months'),
      meetingMinutes: event?.meetingMinutes ?? true,
      attendees:
        filtered?.map(attendee => ({
          email: attendee.attendeeName,
          role: attendee.attendeeRole,
        })) ?? [],
      tags: !!event ? eventTags?.map(tag => tag.name) : [],
      updateAll: false,
      showConfrimation: false,
    }),
    [event, startDate, notifcationMins, filtered, eventTags]
  );

  const handleSubmit = useCallback(
    async (
      {
        title,
        startDateTime,
        endDateTime,
        location,
        description,
        tags,
        attendees,
        weekDays,
        repeat,
        recurrenceEndDate,
        notification,
        repeatEvery,
        meetingId,
        updateAll
      },
      { resetForm }
    ) => {
      const notificationMins = moment(startDateTime)
        .subtract(notification, 'm')
        .diff(moment(), 'm');
      const newTags = tags.filter(name => !allTags.find(t => t === name));
      const payload = {
        meetingId,
        isOrganizer: true,
        title,
        eventStartDateTime: moment(startDateTime).toDate(),
        eventEndDateTime: moment(endDateTime).toDate(),
        attendees: attendees.map(attendee => ({
          attendeeName: attendee.email,
          attendeeRole: attendee.role,
        })),
        location,
        description,
        repeatEvery,
        isRecurrent: repeat !== '0' ? true : false,
        ...(notificationMins > 0
          ? {
              alertDateTime:
                notification !== '0'
                  ? moment(startDateTime)
                      .subtract(notification, 'm')
                      .toDate()
                  : undefined,
              alertDate:
                notification !== '0'
                  ? moment(startDateTime)
                      .subtract(notification, 'm')
                      .toDate()
                  : undefined,
            }
          : {}),

        recurrencePeriod: repeat !== '0' ? repeat.toUpperCase() : undefined,
        weekIntervalBitmap: repeat === 'w' ? weekDays.join('') : undefined,
        recurrenceEndDate: new Date(recurrenceEndDate.toString()),
        tags: tags.map(name => ({ name })),
      };

      if (newTags.length) {
        await forEach(newTags, async name => {
          await createTag({ name });
        });
      } else {
      }
      if (!!event) {
        const { attendees, alertDate, ...rest } = payload;
        if (updateAll) {
          updateEvent(rest).then(() => {
            resetForm(initialValues);
            resetEventDialog();
            setCalenderState(state => ({ ...state, tag: 'all' }));
          });
        } else {
          updateByClalendarEventId(rest).then(() => {
            resetForm(initialValues);
            resetEventDialog();
            setCalenderState(state => ({ ...state, tag: 'all' }));
          });
        }
      } else {
        createEvent(payload).then(() => {
          resetForm(initialValues);
          resetEventDialog();
          setCalenderState(state => ({ ...state, tag: 'all' }));
        });
      }
    },
    [allTags, createEvent, createTag, event, initialValues, resetEventDialog, setCalenderState, updateByClalendarEventId, updateEvent]
  );



  return (
    <>
      <Button
        onClick={handleOpen}
        className="new_event"
        texttransform="none"
        fullWidth
        variant="primary"
        size="large"
      >
        {t.calender.newEvent}
      </Button>

      <DialogStyled
        open={open}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <Box sx={{ p: 1, pl: 3, display: 'flex ', pt: 2 }}>
          <Typography
            sx={{ flexGrow: 1, color: 'text.primaryText' }}
            variant="h6"
          >
            {!!event ? 'Update The Event' : 'Create New Event'}
          </Typography>
          <CloseIconStyled sx={{ flexGrow: 0 }} onClick={handleClose} />
        </Box>
        <DialogContent sx={{ pt: 2 }}>
          {open && (
            <Grid container spacing={2}>
              <Formik
                initialValues={initialValues}
                validateOnMount
                validationSchema={addCalendarEventSchema}
                enableReinitialize={!event}
                onSubmit={handleSubmit}
              >
                {props => {
                  return (
                    <AddEventForm
                      {...props}
                      initialValues={initialValues}
                      isUpdate={!!event}
                      isSaving={isLoading || isCreatingTags || isUpdating || isUpdatingByCalendarEventId}
                    />
                  );
                }}
              </Formik>
            </Grid>
          )}
        </DialogContent>
      </DialogStyled>
    </>
  );
});
