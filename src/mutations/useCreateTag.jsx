import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';

export const useCreateTag = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ name }) => {
      const response = await service.post(`/v1/user/calendar/events/tag`, {
        name,
      });
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('New Tag added!', { variant: 'success' });
        queryClient.invalidateQueries([queryKeys.Tags]);
      },
    }
  );
};
