import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';
import { useSnackbar } from 'notistack';
export const useDeleteEventMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async ({ eventId }) => {
      if (!eventId) {
        Promise.reject('Invalid Request');
      }
      const response = await service.delete(
        `v1/user/calendar/events/${eventId}`
      );
      return { eventId, ...response?.data };
    },
    {
      onSuccess: ({ eventId }) => {
        enqueueSnackbar('Event deleted! Successfully', { variant: 'success' });
        queryClient.refetchQueries([queryKeys.Attendees, eventId]);
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === queryKeys.CalendarEvents,
        });
      },
    }
  );
};
