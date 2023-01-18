import { useQuery } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';

const getAttendees = async ({ eventId }) => {
  const response = await service.get(
    `/v1/user/calendar/events/attendees/${eventId}`
  );
  return response?.data;
};

export const useAttendeesByEventId = ({ eventId }) => {
  return useQuery(
    [queryKeys.Attendees, eventId],
    () => getAttendees({ eventId }),
    {
      enabled: !!eventId,
    }
  );
};
