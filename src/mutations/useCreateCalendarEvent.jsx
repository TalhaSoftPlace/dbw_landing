import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';

export const useCreateCalendarEvent = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user: { userName } = {} } = useAuth();
  const queryClient = useQueryClient();
  return useMutation(
    async payload => {
      if (!userName) {
        Promise.reject('Invalid Request');
      }
      const response = await service.post(`/v1/user/calendar/events`, {
        ...payload,
        timeZone: 'UTC',
      });
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('New event added!', { variant: 'success' });
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === queryKeys.CalendarEvents,
        });
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === queryKeys.Attendees,
        });
      },
    }
  );
};
