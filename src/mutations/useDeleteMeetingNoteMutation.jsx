import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';
import { useSnackbar } from 'notistack';
export const useDeleteMeetingNoteMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ eventId }) => {
      if (!eventId) {
        Promise.reject('Invalid Request');
      }
      const response = await service.delete(
        `v1/user/calendar/events/meetingnote/deleteByEventId/${eventId}`
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Note deleted! Successfully', { variant: 'success' });
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === queryKeys.EventNotes,
        });
        queryClient.refetchQueries([queryKeys.EventNote]);
      },
    }
  );
};
