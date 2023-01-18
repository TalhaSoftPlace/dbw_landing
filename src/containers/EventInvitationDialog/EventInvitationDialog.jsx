import { Typography, Box, ButtonGroup, Button } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { calenderAtom, emailPaginationAtom } from '../../atoms';
import { Loading } from '../../components';
import { useAttachement, useAttendeesByEventId } from '../../queries';
import { arrayBufferToString, openMeeingFromMeetingId } from '../../utils';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import { useCalendarEvents } from '../../queries';
import {
  AttendeeBox,
  CancelAttendee,
  NoResponseAttendee,
  StyledTable,
  VerifiedAttendee,
  Wrapper,
} from './EventInvitationDialog.styles';
import moment from 'moment';
import {
  useCreateCalendarEvent,
  useDeleteEventMutation,
  useUpdateAttendeeResponse,
} from '../../mutations';
import { useAuth, useLocalization } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import Linkify from 'react-linkify';
import { timeZonelist } from '../../constants';
import { Button as Btn } from '../../components';
import { useEffect } from 'react';
var ICAL = require('ical.js');

export const EventInvitationDialog = React.memo(
  ({ eventAttachment, email, icsContent }) => {
    const { t } = useLocalization();
    const { user: { userName } = {} } = useAuth();
    const navigate = useNavigate();
    const { folder } = useRecoilValue(emailPaginationAtom);
    const setCalendarAtom = useSetRecoilState(calenderAtom);
    const { mutateAsync: deleteEvent, isLoading } = useDeleteEventMutation();
    const {
      mutateAsync: createEvent,
      isLoading: isCreating,
      isSuccess,
    } = useCreateCalendarEvent();
    const { data: attachment } = useAttachement({
      load: !icsContent,
      uid: email?.uid,
      fileName: eventAttachment?.fileName,
      mailBoxFolder: folder,
    });

    const icsString = useMemo(
      () => (attachment && arrayBufferToString(attachment)) || icsContent,
      [attachment, icsContent]
    );

    const event = useMemo(() => {
      if (icsString) {
        var jCalData = ICAL.parse(icsString);
        var comp = new ICAL.Component(jCalData);
        var vevent = comp.getFirstSubcomponent('vevent');
        const ee = new ICAL.Event(vevent);
        const iTimeStart = vevent.getFirstPropertyValue('dtstart');
        const iTimeEnd = vevent.getFirstPropertyValue('dtend');
        const startTime = `${iTimeStart.year}-${iTimeStart.month}-${iTimeStart.day} ${iTimeStart.hour}:${iTimeStart.minute}:${iTimeStart.second}`;
        const endTime = `${iTimeEnd.year}-${iTimeEnd.month}-${iTimeEnd.day} ${iTimeEnd.hour}:${iTimeEnd.minute}:${iTimeEnd.second}`;

        const off =
          (timeZonelist.find(
            tz =>
              tz.value === vevent.getFirstPropertyValue('dtstart').timezone ||
              tz.timezone === vevent.getFirstPropertyValue('dtstart').timezone
          )?.offset || 0) * 60;
        const offset = !!off
          ? moment().utcOffset() - off
          : moment().utcOffset();

        return {
          uid: ee.uid,
          description: ee.description,
          summary: ee.summary,
          attendees: ee.attendees?.map(a => a.jCal?.[1]),
          viewAbleAttendees: ee.attendees
            ?.map(a => a.jCal?.[1])
            ?.filter(a => !!a.cn),
          dtstart: moment.utc(
            moment(startTime)
              .utcOffset(offset)
              .format('YYYY-MM-DD HH:mm:ss')
          ),
          dtend: moment.utc(
            moment(endTime)
              .utcOffset(offset)
              .format('YYYY-MM-DD HH:mm:ss')
          ),
          location: ee.location,
          organizer: ee.organizer?.substring(ee.organizer.indexOf(':') + 1),
          created: vevent.getFirstPropertyValue('created')?.toJSDate(),
          lastModified: vevent
            .getFirstPropertyValue('last-modified')
            ?.toJSDate(),
        };
      }
      return undefined;
    }, [icsString]);
    const { data } = useCalendarEvents({
      eventId: event?.uid,
    });
    const dbwEvent = useMemo(() => data?.[0], [data]);

    const cale = useMemo(() => {
      if (icsString) {
        var jCalData = ICAL.parse(icsString);
        var comp = new ICAL.Component(jCalData);
        var method = comp.getFirstPropertyValue('method');
        const sender =
          email.sender?.indexOf('<') > -1 && email.sender?.lastIndexOf('>') > -1
            ? email.sender?.slice(
                email.sender?.indexOf('<') + 1,
                email.sender?.indexOf('>')
              )
            : email.sender;
        const senderName = email.sender?.split('<')?.[0]?.trim();

        const { partstat } =
          (method === 'REPLY' &&
            (event?.attendees?.find(
              ({ cn }) => cn === sender || cn === senderName
            ) || event?.attendees?.length === 1
              ? event?.attendees[0]
              : {})) ||
          {};

        const status = {
          sender,
          isCanceled: method === 'CANCEL',
          isResponse: method === 'REPLY',
          response: partstat && {
            from: email.sender,
            response:
              partstat.toLowerCase() === 'tentative'
                ? 'tentatively accepted '
                : partstat.toLowerCase(),
          },
          isReminder: method === 'PUBLISH',
          isUpdate:
            method !== 'REPLY' &&
            method !== 'CANCEL' &&
            event?.lastModified &&
            event?.created?.toLocaleTimeString() !==
              event?.lastModified?.toLocaleTimeString(),
        };
        return status;
      } else {
        return undefined;
      }
    }, [email.sender, event, icsString]);
    const startDt = useMemo(() => moment(event?.dtstart), [event?.dtstart]);
    const endDt = useMemo(() => moment(event?.dtend), [event?.dtend]);

    const formatedStart = useMemo(
      () =>
        `${startDt.local().format('dddd')}, ${startDt
          .local()
          .format('MMM DD, h:mm a')} `,
      [startDt]
    );

    const minutesRemaning = useMemo(() => startDt.diff(moment(), 'm'), [
      startDt,
    ]);

    const formatedEnd = useMemo(() => {
      return Math.abs(
        moment(endDt.local().format('YYYY-MM-DD')).diff(
          moment(startDt.local().format('YYYY-MM-DD')),
          'days'
        )
      ) > 0
        ? `${endDt.local().format('dddd')}, ${endDt
            .local()
            .format('MMM DD, h:mm a')}`
        : `${endDt.local().format('h:mm a')}`;
    }, [endDt, startDt]);

    const {
      mutateAsync: updateResponse,
      isLoading: isUpdateing,
    } = useUpdateAttendeeResponse({
      calendarEventId: dbwEvent?.calendarEventId,
    });

    const {
      data: attendees,
      isLoading: isAttendeesLoading,
      refetch
    } = useAttendeesByEventId({
      eventId: event?.uid,
    });

    useEffect(() => { refetch() }, [refetch, event]);

    const handleAdd = useCallback(() => {
      const payload = {
        externalEventId: event?.uid,
        title: event?.summary,
        eventStartDateTime: startDt.toDate(),
        eventEndDateTime: endDt.toDate(),
        attendees: event?.viewAbleAttendees
          ?.filter(at => at.cn !== event?.organizer)
          ?.map(att => ({
            attendeeName: att.cn,
          })),
        externalOrganizer: event?.organizer,
        location: event?.location,
        description: event?.description,
        repeatEvery: 0,
        isRecurrent: false,
        alertDateTime: startDt.subtract(30, 'm').toDate(),
        recurrencePeriod: undefined,
        weekIntervalBitmap: undefined,
        tags: [{ name: 'external' }],
      };
      createEvent(payload);
    }, [
      event?.uid,
      event?.summary,
      event?.viewAbleAttendees,
      event?.organizer,
      event?.location,
      event?.description,
      startDt,
      endDt,
      createEvent,
    ]);

    const handleJoinClick = React.useCallback(() => {
      dbwEvent?.meetingId &&
        openMeeingFromMeetingId({
          userName,
          name: userName,
          meetingId: dbwEvent?.meetingId,
        });
    }, [dbwEvent?.meetingId, userName]);

    const content = useMemo(
      () => (
        <tbody>
          <tr>
            <th>{t.container.eventInvitationDialog.summary} </th>
            <td>{event?.summary}</td>
          </tr>
          <tr>
            <th>{t.container.eventInvitationDialog.when} </th>
            <td>
              {formatedStart} - {formatedEnd} ({moment.tz?.guess()})
            </td>
          </tr>
          {!!dbwEvent?.meetingId && (
            <tr>
              <td colSpan={2}>
                <Btn onClick={handleJoinClick} size="large" variant="primary">
                  <VideoChatIcon /> &nbsp;&nbsp; Join Meeting
                </Btn>
              </td>
            </tr>
          )}
          {event?.location && (
            <tr>
              <th>{t.container.eventInvitationDialog.where} </th>
              <td>
                <Linkify
                  componentDecorator={(decoratedHref, decoratedText, key) => (
                    <a target="blank" href={decoratedHref} key={key}>
                      {decoratedText}
                    </a>
                  )}
                >
                  {event?.location}
                </Linkify>
              </td>
            </tr>
          )}
          {event?.description && (
            <tr>
              <th>Description: </th>
              <td>
                <Linkify
                  componentDecorator={(decoratedHref, decoratedText, key) => (
                    <a target="blank" href={decoratedHref} key={key}>
                      {decoratedText}
                    </a>
                  )}
                >
                  <span>{event?.description}</span>
                </Linkify>
              </td>
            </tr>
          )}
          {event?.organizer && (
            <tr>
              <th>{t.container.eventInvitationDialog.organizer} </th>
              <td>{event?.organizer}</td>
            </tr>
          )}
          {!!event?.viewAbleAttendees?.length && (
            <tr>
              <th>{t.container.eventInvitationDialog.byWho} </th>
              <td>{event?.viewAbleAttendees?.map(att => `${att.cn}, `)}</td>
            </tr>
          )}
        </tbody>
      ),
      [dbwEvent?.meetingId, event?.description, event?.location, event?.organizer, event?.summary, event?.viewAbleAttendees, formatedEnd, formatedStart, handleJoinClick, t.container.eventInvitationDialog.byWho, t.container.eventInvitationDialog.organizer, t.container.eventInvitationDialog.summary, t.container.eventInvitationDialog.when, t.container.eventInvitationDialog.where]
    );

    const handleYes = useCallback(() => {
      updateResponse({ res: 'Y', note: '' });
    }, [updateResponse]);

    const handleNo = useCallback(() => {
      updateResponse({ res: 'N', note: '' });
    }, [updateResponse]);

    const handleMaybe = useCallback(() => {
      updateResponse({ res: 'M', note: '' });
    }, [updateResponse]);

    const gotoCalendar = useCallback(() => {
      setCalendarAtom(state => ({
        ...state,
        view: 'day',
        date: startDt.toDate(),
      }));
      navigate('/workspace/calendar');
    }, [navigate, setCalendarAtom, startDt]);

    const handleEventDelete = useCallback(async () => {
      event?.uid && !isLoading && (await deleteEvent({ eventId: event?.uid }));
    }, [deleteEvent, event?.uid, isLoading]);

    return (
      <Wrapper sx={{ p: 0 }}>
        {!attachment && !icsContent ? (
          <Loading />
        ) : (
          <Box>
            <Box
              sx={{
                textAlign: 'center',
                display: 'block',
                margin: '30px',
                fontSize: '16px',
                color: 'email.text.greyText',
              }}
            >
              {!!cale?.response && (
                <>
                  <b>{cale?.sender} </b> has <b>{cale?.response?.response} </b>
                  the invitation for the event:{' '}
                  <b>
                    {event?.summary.substring(event?.summary.indexOf(':') + 1)}
                  </b>
                </>
              )}
              {!!cale?.isReminder && (
                <>
                  The event:{' '}
                  <b>
                    {event?.summary.substring(event?.summary.indexOf(':') + 1)}
                  </b>
                  {minutesRemaning > 0 ? ' will start ' : ' has started '}
                  {startDt?.fromNow()}
                </>
              )}
              {!!cale?.isUpdate && <>This event has been updated.</>}
              {!!cale?.isCanceled && (
                <>
                  This event has been canceled.
                  {!!attendees && (
                    <b className="delete-event" onClick={handleEventDelete}>
                      Remove from Calendar?
                    </b>
                  )}
                </>
              )}
            </Box>
            <Box className="invitationbox">
              <Box className="calendarbox" onClick={gotoCalendar}>
                <Typography className="IconHeading">
                  {startDt.local().format('MMM')}
                </Typography>
                <Typography className="IconContent">
                  {startDt.local().format('DD')}
                </Typography>
                <Typography className="IconFooter">
                  {startDt.local().format('ddd')}
                </Typography>
              </Box>

              <Box className="invitecontent">
                <StyledTable sx={{ p: 1 }}>{content}</StyledTable>
                {!isAttendeesLoading &&
                  (!!attendees ? (
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <Box sx={{ flexGrow: 1, pr: 2 }} className="attendeBox">
                          {attendees?.map((attendee, index) => (
                            <Box className="attendeebox" key={index}>
                              <Box sx={{ flexGrow: 0 }}>
                                <PersonOutlineIcon color="inherit" />
                              </Box>
                              <AttendeeBox>{attendee.attendeeName}</AttendeeBox>
                              <span>
                                {attendee.response === 'Y' ? (
                                  <VerifiedAttendee />
                                ) : attendee.response === 'N' ? (
                                  <CancelAttendee />
                                ) : attendee.response === 'M' ? (
                                  <NoResponseAttendee />
                                ) : (
                                  <NoResponseAttendee />
                                )}
                              </span>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                      {!cale?.isResponse &&
                        !cale?.isCanceled &&
                        minutesRemaning > -1 && !dbwEvent?.organizer && (
                          <Box
                            sx={{
                              marginTop: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <Box
                              sx={{ flexGrow: 1, color: 'email.text.greyText' }}
                            >
                              Attending?
                            </Box>
                            <Box sx={{ flexGrow: 0 }}>
                              <ButtonGroup
                                size="small"
                                aria-label="small button group"
                              >
                                <Button
                                  disabled={isUpdateing}
                                  key="yes"
                                  onClick={handleYes}
                                >
                                  {t.container.eventInvitationDialog.optionYes}
                                </Button>
                                <Button
                                  disabled={isUpdateing}
                                  key="maybe"
                                  onClick={handleMaybe}
                                >
                                  {
                                    t.container.eventInvitationDialog
                                      .optionMaybe
                                  }
                                </Button>
                                <Button
                                  disabled={isUpdateing}
                                  key="no"
                                  onClick={handleNo}
                                >
                                  {t.container.eventInvitationDialog.optionNo}
                                </Button>
                              </ButtonGroup>
                            </Box>
                          </Box>
                        )}
                    </>
                  ) : (
                    !cale?.isResponse &&
                    !cale?.isCanceled && (
                      <Box
                        sx={{
                          marginTop: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <Box sx={{ flexGrow: 1 }}>Add to Calendar?</Box>
                        <Box sx={{ flexGrow: 0 }}>
                          <ButtonGroup
                            size="small"
                            aria-label="small button group"
                          >
                            <Button
                              disabled={isCreating || isSuccess}
                              key="yes"
                              onClick={handleAdd}
                            >
                              {t.container.eventInvitationDialog.optionAdd}
                            </Button>
                          </ButtonGroup>
                        </Box>
                      </Box>
                    )
                  ))}
              </Box>
            </Box>
          </Box>
        )}
      </Wrapper>
    );
  }
);
