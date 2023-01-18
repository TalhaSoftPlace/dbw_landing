import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import moment from 'moment';

const getEvent = async ({ id }) => {
  const { data } = await service.get(`/v1/user/calendar/events/${id}`);
  return data;
};

export const useCalendarEvent = ({ calendarEventId }) => {
  return useQuery(
    [queryKeys.CalendarEvent, calendarEventId],
    () => getEvent({ id: calendarEventId }),
    {
      enabled: !!calendarEventId,
      select: ({
        eventStartDateTime,
        eventEndDateTime,
        description,
        ...rest
      }) => ({
        start: moment
          .utc(eventStartDateTime)
          .local()
          .toDate(),
        end: moment
          .utc(eventEndDateTime)
          .local()
          .toDate(),
        desc: description,
        ...rest,
      }),
    }
  );
};
