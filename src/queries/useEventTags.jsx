import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';

const getTags = async ({ eventId }) => {
  const response = await service.get(
    `/v1/user/calendar/events/eventTags/${eventId}`
  );
  return response?.data;
};

export const useEventTags = ({ eventId }) => {
  return useQuery([queryKeys.EventTags, eventId], () => getTags({ eventId }), {
    enabled: !!eventId,
  });
};
