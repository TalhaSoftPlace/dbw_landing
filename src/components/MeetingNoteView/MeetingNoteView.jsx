import {
  DialogContent,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { Formik } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import { useLocalization, useToggle } from '../../hooks';
import { MeetingAttendees } from '../MeetingAttendees';
import { NoteItem } from '../NoteItem';
import { isEqual } from 'underscore';
import {
  BoxStyled,
  DialogTitleStyled,
  NoteItemsWrapper,
  AddIconStyled,
  IconButtonStyled,
  CloseIconStyled,
  FieldGrid,
  FieldLabel,
  DialogStyled,
} from './MeetingNoteView.styles';
import moment from 'moment';
import {
  useAttendeesByEventId,
  useCalendarEvent,
  useEventNote,
} from '../../queries';
import {
  useCreateEventNote,
  useShareMeetingNoteMutation,
  useUpdateAttendee,
  useUpdateEventNote,
} from '../../mutations';
import { Button } from '../Button';
import { Loading } from '../Loading';
import { noteSchema } from './validation.schema';
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import { getErrorsArrayfromFormikErrors } from '../../utils';
import { forEach } from 'p-iteration';
import { useRecoilState } from 'recoil';
import { noteEventAtom } from '../../atoms';
import { useParams } from 'react-router-dom';

export const NoteForm = React.memo(
  ({
    values,
    eventNote,
    onBack,
    errors,
    setFieldValue,
    handleSubmit,
    isSaving,
    isReadOnly,
    children,
  }) => {
    const { enqueueSnackbar } = useSnackbar();
    const {
      mutateAsync: shareNotes,
      isLoading,
    } = useShareMeetingNoteMutation();
    const [selectedAttendees, setSelectedAttendees] = useState([]);
    const [, setCalenderState] = useRecoilState(noteEventAtom);
    const [showShare, toggleShare] = useToggle();
    const addNewNote = React.useCallback(() => {
      setFieldValue('meetingItems', [
        ...values.meetingItems,
        {
          id: uuidv4(),
          note: '',
          user: '',
          date: moment(),
          attachment: null,
        },
      ]);
    }, [values, setFieldValue]);

    const notesItems = useMemo(
      () =>
        values?.meetingItems?.map((note, index) => (
          <NoteItem
            note={note}
            onBack={onBack}
            key={note.id + index}
            index={index}
            values={values}
            setFieldValue={setFieldValue}
            handleSubmit={handleSubmit}
            isReadOnly={isReadOnly}
          />
        )),
      [handleSubmit, isReadOnly, onBack, setFieldValue, values]
    );

    const submit = useCallback(() => {
      getErrorsArrayfromFormikErrors(errors).forEach(error => {
        enqueueSnackbar(error, { variant: 'error' });
      });
      handleSubmit();
      setCalenderState(state => ({
        ...state,
        date: undefined,
        tagName: undefined,
      }));
    }, [enqueueSnackbar, errors, handleSubmit, setCalenderState]);

    const handleShare = useCallback(() => {
      !isLoading &&
        shareNotes({
          calendarEventId: eventNote?.calendarEventId,
          notifyees: selectedAttendees.map(x => x.name),
        }).then(() => {
          toggleShare();
        });
    }, [
      selectedAttendees,
      eventNote?.calendarEventId,
      isLoading,
      shareNotes,
      toggleShare,
    ]);

    const selectAttendees = useMemo(
      () => (
        <>
          {values?.attendees?.map((attendee, idx) => {
            const checked = !!selectedAttendees?.find(
              x => x.id === attendee.id
            );

            const handleCheck = () => {
              if (checked) {
                setSelectedAttendees(state =>
                  state.filter(x => x.id !== attendee.id)
                );
              } else {
                setSelectedAttendees(state => [...state, attendee]);
              }
            };
            return (
              <Box key={idx} sx={{ color: 'text.primaryText' }}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={handleCheck}
                />
                <label>{attendee.name}</label>
              </Box>
            );
          })}
        </>
      ),
      [values?.attendees, selectedAttendees]
    );

    return (
      <>
        <NoteItemsWrapper>
          {children}
          {notesItems}
          <IconButtonStyled onClick={addNewNote}>
            <AddIconStyled />
          </IconButtonStyled>
        </NoteItemsWrapper>
        <Box sx={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
          <Button
            variant="primaryGrey"
            onClick={onBack}
            sx={{ width: '110px', pointerEvents: 'all' }}
          >
            Cancel
          </Button>
          {!!eventNote && (
            <Button
              onClick={toggleShare}
              variant="primaryLight"
              sx={{ width: '110px' }}
            >
              Share
            </Button>
          )}
          {showShare && (
            <DialogStyled
              open={showShare}
              keepMounted
              aria-describedby="alert-dialog-slide-description"
              fullWidth
            >
              <Box
                sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography variant="h5" sx={{ color: 'text.primaryText' }}>Share Notes</Typography>
                <CloseIconStyled onClick={toggleShare} />
              </Box>
              {showShare && (
                <DialogContent>
                  <Grid container sx={{ pt: 2 }}>
                    <Grid item xs={12}>
                      <FieldLabel sx={{ color: 'text.primaryText' }}>Enter email/s:</FieldLabel>
                    </Grid>
                    <Grid item xs={12} >
                      {selectAttendees}
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}></Grid>
                    <FieldGrid item xs={8}></FieldGrid>
                    <FieldGrid item xs={4}>
                      <Button
                        onClick={handleShare}
                        fullWidth
                        size="small"
                        variant="primary"
                      >
                        Share
                      </Button>
                    </FieldGrid>
                  </Grid>
                </DialogContent>
              )}
            </DialogStyled>
          )}
          <Button
            onClick={submit}
            variant="primaryLight"
            sx={{ width: '110px' }}
            disabled={isSaving || isReadOnly}
          >
            {isSaving ? (
              <>
                <CircularProgress size={26} color="inherit" />
              </>
            ) : (
              <>Save</>
            )}
          </Button>
        </Box>
      </>
    );
  }
);

export const MeetingNoteView = React.memo(({ onBack }) => {
  const { t } = useLocalization();
  const { calendarEventId } = useParams();
  const { data: eventNote, isLoading } = useEventNote({ calendarEventId });
  const { data: event } = useCalendarEvent({ calendarEventId });
  const { data: attendees = [] } = useAttendeesByEventId({
    eventId: event?.eventId,
  });

  const isReadOnly = useMemo(() => !event?.organizer, [event?.organizer]);
  const {
    mutateAsync: createEventNode,
    isLoading: saveLoading,
  } = useCreateEventNote({
    calendarEventId,
  });

  const {
    mutateAsync: updateEventNode,
    isLoading: updateLoading,
  } = useUpdateEventNote({
    calendarEventId,
  });
  const { mutateAsync: updateAttendee } = useUpdateAttendee({
    eventId: event?.eventId,
  });

  const initialValues = useMemo(
    () => ({
      attendees: attendees?.map(attendee => ({
        id: attendee.id,
        name: attendee.attendeeName ?? '',
        department: attendee.attendeeDepartment ?? '',
        jobTitle: attendee.attendeeJobTitle ?? '',
      })),
      meetingItems: eventNote?.meetingItemsList?.map(item => ({
        id: item.id ?? uuidv4(),
        note: item.itemDescription,
        user: item.responsible,
        date: moment(item.dueDate),
        attachment: null,
      })) || [
          {
            note: '',
            user: '',
            date: moment(),
            attachment: null,
          },
        ],
    }),
    [attendees, eventNote?.meetingItemsList]
  );

  const handleSubmit = useCallback(
    async values => {
      if (!isEqual(initialValues.attendees, values.attendees)) {
        await forEach(values.attendees, async attendee => {
          await updateAttendee({
            attendeeId: attendee.id,
            attendeeName: attendee.name,
            attendeeDepartment: attendee.department,
            attendeeJobTitle: attendee.jobTitle,
          });
        });
      }
      const notePayload = {
        title: event?.title,
        meetingItems: values?.meetingItems?.map(noteValue => ({
          itemDescription: noteValue.note,
          responsible: noteValue.user,
          dueDate: moment(noteValue.date)
            .utc()
            .format(),
        })),
      };
      if (!eventNote) {
        createEventNode(notePayload);
      } else {
        updateEventNode(notePayload);
      }
    },
    [
      createEventNode,
      event?.title,
      eventNote,
      initialValues.attendees,
      updateAttendee,
      updateEventNode,
    ]
  );

  const header = useMemo(() => {
    const formatedStart = `${moment(event?.start).format('dddd')}, ${moment(
      event?.start
    ).format('MMM DD, h:mm a')} `;

    const formatedEnd =
      Math.abs(
        moment(moment(event?.end).format('YYYY-MM-DD')).diff(
          moment(moment(event?.start).format('YYYY-MM-DD')),
          'days'
        )
      ) > 0
        ? `${moment(event?.end).format('dddd')}, ${moment(event?.end).format(
          'MMM DD, h:mm a'
        )}`
        : `${moment(event?.end).format('h:mm a')}`;

    return (
      <>
        <Typography className="descHeading">Event Title:</Typography>
        <Typography className="descValues">{event?.title}</Typography>
        <br />
        <Typography className="eventTimeHeading">
          {t.notesDialog.eventTime}:
        </Typography>
        <Typography className="eventTime">
          {formatedStart} - {formatedEnd}
        </Typography>
      </>
    );
  }, [event, t]);

  return (
    <BoxStyled>
      <CloseIconStyled sx={{ flexGrow: 0 }} onClick={onBack} />
      <DialogTitleStyled
        sx={{ pb: 0, pt: 0, pl: 3, pr: 3 }}
        className={isReadOnly ? 'readonly' : ''}
      >
        {header}
      </DialogTitleStyled>
      <DialogContent sx={{ paddingBlock: '0px' }}>
        {isLoading ? (
          <Box mt={10}>
            <Loading />
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Formik
              initialValues={initialValues}
              validateOnMount
              validationSchema={noteSchema}
              onSubmit={handleSubmit}
              enableReinitialize
              >
              {props => (

                  <Grid item sm={12} sx={{ paddingTop: '0px', width: '100%' }}>
                    <NoteForm
                      {...props}
                      onBack={onBack}
                      eventNote={eventNote}
                      isSaving={saveLoading || updateLoading}
                      isReadOnly={isReadOnly}
                    >
                      <MeetingAttendees {...props} isReadOnly={isReadOnly} />
                    </NoteForm>
                  </Grid>

              )}
            </Formik>
          </Grid>
        )}
      </DialogContent>
    </BoxStyled>
  );
});
