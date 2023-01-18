import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import moment from 'moment-timezone';

const getEvents = async ({ fromDate, toDate, tagName, eventId }) => {
  const { data } = await service.get(`/v1/user/calendar/events`, {
    params: {
      eventId,
      fromDate: fromDate?.toDate(),
      toDate: toDate?.toDate(),
      tagName,
    },
  });
  return data;
};

export const useCalendarEvents = ({ fromDate, toDate, tagName, eventId }) => {
  return useQuery(
    [queryKeys.CalendarEvents, fromDate, toDate, tagName, eventId],
    () => getEvents({ fromDate, toDate, tagName, eventId }),
    {
      select: data =>
        data?.content?.map(
          ({
            id,
            eventStartDateTime,
            eventEndDateTime,
            title,
            description,
            ...rest
          }) => {
            return {
              id,
              start: moment
                .utc(eventStartDateTime)
                .local()
                .toDate(),
              end: moment
                .utc(eventEndDateTime)
                .local()
                .toDate(),
              title,
              desc: description,
              ...rest,
            };
          }
        ),
    }
  );
};
