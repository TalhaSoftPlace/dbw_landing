import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';

export const useDeleteRule = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  return useMutation(
    async ({ id }) => {
      const response = await service.delete(`/v1/admin/domains/rule/${id}`);
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Rule deleted!', { variant: 'success' });
        queryClient.refetchQueries([queryKeys.Rules]);
      },
    }
  );
};
