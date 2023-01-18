import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';
import { useSnackbar } from 'notistack';
export const useUpdateEventNote = ({ calendarEventId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ meetingItems, title }) => {
      const response = await service.put(
        `/v1/user/calendar/events/meetingnote/${calendarEventId}`,
        {
          title,
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
