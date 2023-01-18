import { useMutation } from 'react-query';
import { service } from '../services';

export const useShareMeetingNoteMutation = () => {
  return useMutation(async ({ calendarEventId, notifyees }) => {
    const response = await service.post(
      `/v1/user/calendar/events/meetingnote/share-note/${calendarEventId}`,
      {
        notifyees,
      }
    );
    return response?.data;
  });
};
