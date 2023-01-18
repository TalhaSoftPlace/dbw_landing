import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';
import { eventFormAtom } from '../atoms';
import { useRecoilValue } from 'recoil';

export const useAddAttendee = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user: { userName } = {} } = useAuth();
  const queryClient = useQueryClient();
  const { event } = useRecoilValue(eventFormAtom);
  return useMutation(
    async payload => {
      if (!userName) {
        Promise.reject('Invalid Request');
      }
      const response = await service.post(
        `/v1/user/calendar/events/attendees/add-attendee/${event?.eventId}`,

        payload
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('New Attendee added!', { variant: 'success' });
        queryClient.invalidateQueries([queryKeys.Attendees, event?.eventId]);
      },
    }
  );
};
