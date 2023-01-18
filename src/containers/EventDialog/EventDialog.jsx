import {
  Box,
  Button,
  ButtonGroup,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Linkify from 'react-linkify';
import React, { useCallback, useMemo } from 'react';
import moment from 'moment-timezone';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { ReactComponent as DescriptionIcon } from '../../images/Desc.svg';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import {
  CloseIconStyled,
  DeleteIconStyled,
  DialogStyled,
  EditIconStyled,
  StyledBox,
  // StyledDays,
  StyledHeading,
  StyledTime,
  AttendeeBox,
  Response,
  VerifiedAttendee,
  CancelAttendee,
  NoResponseAttendee,
  AttendeeBoxWrapper,
} from './EventDialog.styles';
import {
  useDeleteCalendarEventMutation,
  useDeleteEventMutation,
} from '../../mutations';
import { useSetRecoilState } from 'recoil';
import { eventFormAtom } from '../../atoms';
import { useUpdateAttendeeResponse } from '../../mutations';
import { useAttendeesByEventId } from '../../queries';
import { useState } from 'react';
import { useEffect } from 'react';
import { DialogWithButtons } from '../DialogWithButtons';
import { openMeeingFromMeetingId } from '../../utils';
import { useAuth } from '../../hooks';
import { Button as Btn } from '../../components';

export const EventDialog = React.memo(({ event, onClose, position }) => {
  const [showConfrimation, setShowConfirmation] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const { user: { userName } = {} } = useAuth();
  useEffect(() => setShowConfirmation(false), [event]);
  const { mutateAsync: deleteEvent, isLoading } = useDeleteEventMutation();
  const {
    mutateAsync: deleteCalendarEvent,
    isLoading: isDeleting,
  } = useDeleteCalendarEventMutation();
  const {
    mutateAsync: updateResponse,
    isLoading: isUpdateing,
  } = useUpdateAttendeeResponse({
    calendarEventId: event?.calendarEventId,
  });

  const { data: attendees } = useAttendeesByEventId({
    eventId: event?.eventId,
  });
  const setEventDialog = useSetRecoilState(eventFormAtom);

  const formatedStart = useMemo(
    () =>
      `${moment(event?.start).format('dddd')}, ${moment(event?.start).format(
        'MMM DD, h:mm a'
      )} `,
    [event?.start]
  );

  const formatedEnd = useMemo(() => {
    return Math.abs(
      moment(moment(event?.end).format('YYYY-MM-DD')).diff(
        moment(moment(event?.start).format('YYYY-MM-DD')),
        'days'
      )
    ) > 0
      ? `${moment(event?.end).format('dddd')}, ${moment(event?.end).format(
          'MMM DD, h:mm a'
        )}`
      : `${moment(event?.end).format('h:mm a')}`;
  }, [event?.end, event?.start]);

  const handleShowConfirm = useCallback(() => {
    setShowConfirmation(true);
  }, []);

  const handleHideConfirmation = useCallback(() => {
    setShowConfirmation(false);
    setChecked(false);
  }, []);

  const handleDeleteAll = useCallback(() => {
    !isLoading &&
      deleteEvent({ eventId: event?.eventId }).then(() => {
        onClose();
      });
  }, [deleteEvent, event?.eventId, isLoading, onClose]);

  const handleDeleteOne = useCallback(() => {
    !isDeleting &&
      deleteCalendarEvent({
        calendarEventId: event?.calendarEventId,
      }).then(() => {
        onClose();
      });
  }, [deleteCalendarEvent, event?.calendarEventId, isDeleting, onClose]);

  const handleDelete = useCallback(() => {
    if (checked && event?.recurrent) {
      handleDeleteAll();
    } else {
      handleDeleteOne();
    }
  }, [checked, event?.recurrent, handleDeleteAll, handleDeleteOne]);

  const handleEdit = useCallback(() => {
    setEventDialog({ open: true, event });
    onClose();
  }, [event, onClose, setEventDialog]);

  const handleYes = useCallback(() => {
    updateResponse({ res: 'Y', note: '' });
  }, [updateResponse]);

  const handleNo = useCallback(() => {
    updateResponse({ res: 'N', note: '' });
  }, [updateResponse]);

  const handleMaybe = useCallback(() => {
    updateResponse({ res: 'M', note: '' });
  }, [updateResponse]);
  const disableSavebtn = useMemo(() => {
    if (event?.end) {
      return moment().diff(event?.end, 'minutes') >= 0;
    }
  }, [event?.end]);

  const onChange = React.useCallback(e => {
    setChecked(e.target.checked);
  }, []);

  const handleJoinClick = React.useCallback(() => {
    event?.meetingId &&
      openMeeingFromMeetingId({
        userName,
        name: userName,
        meetingId: event.meetingId,
      });
  }, [event?.meetingId, userName]);
  return (
    <>
      <DialogStyled
        open={!!event}
        position={position}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <DialogTitle sx={{ pb: 0 }}>
          <CloseIconStyled onClick={onClose} />
          {(!!event?.organizer || event?.external) && (
            <DeleteIconStyled
              deleting={isLoading.toString()}
              onClick={handleShowConfirm}
            />
          )}
          {!!event?.organizer && !event?.external && !disableSavebtn && (
            <EditIconStyled onClick={handleEdit} />
          )}
        </DialogTitle>
        <DialogContent>
          <StyledHeading>{event?.title}</StyledHeading>
          <StyledTime>
            {formatedStart} - {formatedEnd}
          </StyledTime>
          {/* {!!event?.recurrencePeriod  &&
            <StyledDays>Weekly</StyledDays>
          } */}
          {!!event?.meetingId && (
            <>
              <Btn onClick={handleJoinClick} size="large" variant="primary">
                <VideoChatIcon /> &nbsp;&nbsp; Join Meeting
              </Btn>
              <br />
            </>
          )}
          <StyledBox>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'inherit',
              }}
            >
              <Box sx={{ flexGrow: 0, mt: '6px' }} className="iconspace">
                <LocationOnOutlinedIcon color="inherit" />
              </Box>
              <Box sx={{ flexGrow: 1 }} >
                {event?.location && (
                  <Linkify
                    componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a target="blank" href={decoratedHref} key={key}>
                        {decoratedText}
                      </a>
                    )}
                  >
                    {event?.location}
                  </Linkify>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'inherit',
              }}
            >
              {event?.desc && (
                <>
                  <Box sx={{ flexGrow: 0, pl: '4px', pt: '4px' }} className="iconspace2">
                    <DescriptionIcon color="inherit" />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Linkify
                      componentDecorator={(
                        decoratedHref,
                        decoratedText,
                        key
                      ) => (
                        <a target="blank" href={decoratedHref} key={key}>
                          {decoratedText}
                        </a>
                      )}
                    >
                      {event?.desc}
                    </Linkify>
                  </Box>
                </>
              )}
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <AttendeeBoxWrapper sx={{ flexGrow: 1 }}>
                {attendees?.map((attendee, index) => (
                  <Box className="attendeebox" key={attendee + index}>
                    <Box sx={{ flexGrow: 0, pt: '4px' }}>
                      <PersonOutlineIcon color="inherit" />
                    </Box>
                    <AttendeeBox>{attendee.attendeeName}</AttendeeBox>
                    <Response>
                      {attendee.response === 'Y' ? (
                        <VerifiedAttendee />
                      ) : attendee.response === 'N' ? (
                        <CancelAttendee />
                      ) : attendee.response === 'M' ? (
                        <NoResponseAttendee />
                      ) : (
                        <NoResponseAttendee />
                      )}
                    </Response>
                  </Box>
                ))}
              </AttendeeBoxWrapper>
            </Box>
            {!event?.organizer && (
              <Box
                sx={{
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Box sx={{ flexGrow: 1 }}>Attending?</Box>
                <Box sx={{ flexGrow: 0 }}>
                  <ButtonGroup size="small" aria-label="small button group">
                    <Button
                      disabled={isUpdateing}
                      key="yes"
                      onClick={handleYes}
                    >
                      Yes
                    </Button>
                    <Button
                      disabled={isUpdateing}
                      key="maybe"
                      onClick={handleMaybe}
                    >
                      Maybe
                    </Button>
                    <Button disabled={isUpdateing} key="no" onClick={handleNo}>
                      No
                    </Button>
                  </ButtonGroup>
                </Box>
              </Box>
            )}
          </StyledBox>
        </DialogContent>
      </DialogStyled>
      {showConfrimation && (
        <DialogWithButtons
          open={showConfrimation}
          onClose={handleHideConfirmation}
          handleDanger={handleDelete}
          dangerText="Delete"
          onChange={onChange}
          occrance={event?.recurrent}
          checkboxValue={checked}
        >
          <p>
            {event?.recurrent
              ? 'Do you want to delete all occurrences or just this event?'
              : 'Do you want to delete this event?'}
          </p>
        </DialogWithButtons>
      )}
    </>
  );
});
