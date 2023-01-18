import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';
import { useSnackbar } from 'notistack';

export const useUpdateAttendee = ({ eventId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      attendeeId,
      attendeeName,
      attendeeDepartment,
      attendeeJobTitle,
    }) => {
      if (
        !eventId ||
        !attendeeId ||
        !attendeeName ||
        !attendeeDepartment ||
        !attendeeJobTitle
      ) {
        Promise.reject('Invalid Request');
      }
      const response = await service.put(
        `/v1/user/calendar/events/attendees/${attendeeId}`,
        {
          attendeeName,
          attendeeDepartment,
          attendeeJobTitle,
        }
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Attendee updated!', { variant: 'success' });
        queryClient.invalidateQueries([queryKeys.Attendees, eventId]);
        queryClient.refetchQueries([queryKeys.Attendees, eventId]);
      },
    }
  );
};
