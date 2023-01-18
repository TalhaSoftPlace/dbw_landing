import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';

const getNote = async ({ calendarEventId }) => {
  const { data } = await service.get(
    `/v1/user/calendar/events/meetingnote/${calendarEventId}`,
    {
      params: { calendarEventId },
    }
  );
  return typeof data !== 'string' ? data : undefined;
};

export const useEventNote = ({ calendarEventId }) => {
  return useQuery(
    [queryKeys.EventNote, calendarEventId],
    () => getNote({ calendarEventId }),
    {
      enabled: !!calendarEventId,
    }
  );
};
