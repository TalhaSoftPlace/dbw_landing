import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';
import { useSnackbar } from 'notistack';
export const useDeleteAttendeeMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async ({ eventId, attendeeName }) => {
      if (!eventId) {
        Promise.reject('Invalid Request');
      }
      await service.delete(
        `v1/user/calendar/events/attendees/remove-attendee/${eventId}/${attendeeName}`
      );
      return eventId;
    },
    {
      onSuccess: eventId => {
        enqueueSnackbar('Attendee deleted! Successfully', {
          variant: 'success',
        });
        queryClient.invalidateQueries([queryKeys.Attendees, eventId]);
      },
    }
  );
};
