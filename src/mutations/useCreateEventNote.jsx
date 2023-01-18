import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';

export const useCreateEventNote = ({ calendarEventId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ title, meetingItems }) => {
      const response = await service.post(
        `/v1/user/calendar/events/meetingnote`,
        {
          title,
          calendarEventId,
          meetingItems,
        }
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Note saved!', { variant: 'success' });
        queryClient.refetchQueries([queryKeys.EventNote, calendarEventId]);
        queryClient.refetchQueries([queryKeys.EventNotes]);
      },
    }
  );
};
