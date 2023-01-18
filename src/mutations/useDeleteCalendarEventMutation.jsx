import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';
import { useSnackbar } from 'notistack';
export const useDeleteCalendarEventMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async ({ calendarEventId }) => {
      if (!calendarEventId) {
        Promise.reject('Invalid Request');
      }
      const response = await service.delete(
        `/v1/user/calendar/events/delete-by-calendar-event-id/${calendarEventId}`
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Event deleted! Successfully', { variant: 'success' });
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === queryKeys.CalendarEvents,
        });
      },
    }
  );
};
