import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';

export const useUpdateCalendarEventByCalendarEventId = ({ calendarEventId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { user: { userName } = {} } = useAuth();
  const queryClient = useQueryClient();
  return useMutation(
    async payload => {
      if (!userName || !calendarEventId) {
        Promise.reject('Invalid Request');
      }
      const response = await service.put(
        `/v1/user/calendar/events/update-by-calendar-event-id/${calendarEventId}`,
        {
          ...payload,
          timeZone: 'UTC',
        }
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Event Updated!', { variant: 'success' });
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === queryKeys.CalendarEvents,
        });
      },
    }
  );
};
