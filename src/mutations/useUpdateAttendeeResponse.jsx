import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';

export const useUpdateAttendeeResponse = ({ calendarEventId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { user: { userName } = {} } = useAuth();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ res, note }) => {
      if (!userName || !calendarEventId) {
        Promise.reject('Invalid Request');
      }
      const response = await service.put(
        `/v1/user/calendar/events/attendees/response/${calendarEventId}`,
        {
          response: res,
          note,
        }
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Response Updated!', { variant: 'success' });
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === queryKeys.Attendees,
        });
      },
    }
  );
};
