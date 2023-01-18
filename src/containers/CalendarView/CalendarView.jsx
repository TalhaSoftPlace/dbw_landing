import React, { useCallback, useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment-timezone';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { StyledBox, StyledLoadingWrapp } from './CalendarView.styles';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { calenderAtom, eventFormAtom } from '../../atoms';
import { useCalendarEvents } from '../../queries';
import { Loading } from '../../components';
import { EventDialog } from '../EventDialog';
import { useMemo } from 'react';
import { useWindowResize } from '../../hooks';
import { useTheme } from '@emotion/react';
import { useLocalization } from '../../hooks';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const Customtoolbar = React.memo(({ onNavigate, label, onView }) => {
  const [{ view }] = useRecoilState(calenderAtom);
  const { t } = useLocalization();

  const onPrevious = useCallback(() => {
    onNavigate('PREV');
  }, [onNavigate]);

  const onNext = useCallback(() => {
    onNavigate('NEXT');
  }, [onNavigate]);

  const onToday = useCallback(() => {
    onNavigate('TODAY');
  }, [onNavigate]);

  const onDay = useCallback(() => {
    onView('day');
  }, [onView]);

  const onWeek = useCallback(() => {
    onView('week');
  }, [onView]);

  const onMonth = useCallback(() => {
    onView('month');
  }, [onView]);

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={onPrevious}>
          {'<'}
        </button>
        <button type="button" onClick={onToday}>
          {t.container.calendarView.todayBtn}
        </button>
        <button type="button" onClick={onNext}>
          {'>'}
        </button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>
      <span className="rbc-btn-group view-btns">
        <button
          type="button"
          onClick={onDay}
          className={view === 'day' ? 'active' : ''}
        >
          {t.container.calendarView.dayBtn}
        </button>
        <button
          type="button"
          onClick={onWeek}
          className={view === 'week' ? 'active' : ''}
        >
          {t.container.calendarView.weekBtn}
        </button>
        <button
          type="button"
          onClick={onMonth}
          className={view === 'month' ? 'active' : ''}
        >
          {t.container.calendarView.monthBtn}
        </button>
      </span>
    </div>
  );
});

export const CalendarView = React.memo(() => {
  const winSize = useWindowResize();
  const muiTheme = useTheme();
  const [{ view, date, tag }, setCalenderState] = useRecoilState(calenderAtom);
  const [selectedEvent, setSelectedEvent] = useState();
  const setEventForm = useSetRecoilState(eventFormAtom);
  const [dialogPosition, setDialogPosition] = useState();
  const { data: events, isLoading } = useCalendarEvents({
    fromDate: moment(date)
      .startOf('month')
      .startOf('week'),
    toDate: moment(date)
      .endOf('month')
      .endOf('week'),
    tagName: tag !== 'all' ? tag : undefined,
  });

  useEffect(() => {
    if (winSize.width < muiTheme.breakpoints.values.md) {
      setCalenderState(state => ({ ...state, view: 'day' }));
    }
  }, [muiTheme.breakpoints.values.md, setCalenderState, winSize.width]);

  const handleNavigate = useCallback(
    date => {
      setCalenderState(state => ({ ...state, date }));
    },
    [setCalenderState]
  );

  const handleViewChange = useCallback(
    view => {
      setCalenderState(state => ({ ...state, view }));
    },
    [setCalenderState]
  );

  const handleSlotSelect = useCallback(
    slot => {
      setEventForm(state => ({
        ...state,
        open: true,
        startDate: moment(slot.start),
        event: undefined,
      }));
    },
    [setEventForm]
  );

  const handleEventSelect = useCallback(e => {
    setSelectedEvent(e);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedEvent(undefined);
  }, []);

  const handleClick = useCallback(
    e => {
      !selectedEvent &&
        setDialogPosition({
          x: e.clientX,
          y: e.clientY,
        });
      if (winSize.width < muiTheme.breakpoints.values.sm) {
        setDialogPosition({
          x: 437,
          y: 630,
        });
      }
    },
    [muiTheme.breakpoints.values.sm, selectedEvent, winSize.width]
  );

  const components = useMemo(() => ({ toolbar: Customtoolbar }), []);
  const formates = useMemo(
    () => ({
      dayFormat: date =>
        winSize.width >= muiTheme.breakpoints.values.md
          ? `${moment(date).format('DD')}\n${moment(date).format('ddd')}`
          : moment(date).format('dd')?.[0],
    }),
    [muiTheme.breakpoints.values.md, winSize.width]
  );
  return (
    <>
      <StyledBox onClick={handleClick} variant={view}>
        {isLoading && (
          <StyledLoadingWrapp>
            <Loading />
          </StyledLoadingWrapp>
        )}
        <EventDialog
          event={selectedEvent}
          position={dialogPosition}
          onClose={handleClose}
        />
        <DnDCalendar
          views={['day', 'week', 'month']}
          date={date}
          view={view}
          onNavigate={handleNavigate}
          onView={handleViewChange}
          components={components}
          selectable
          events={events}
          localizer={localizer}
          onEventDrop={() => {}}
          onEventResize={() => {}}
          resizable
          formats={formates}
          style={{ height: '100%' }}
          onSelectSlot={handleSlotSelect}
          onSelectEvent={handleEventSelect}
          dayLayoutAlgorithm="no-overlap"
          popup
        />
      </StyledBox>
    </>
  );
});
