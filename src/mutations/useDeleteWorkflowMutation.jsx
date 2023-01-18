import { useMutation, useQueryClient } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants';
import { useSnackbar } from 'notistack';

export const useDeleteWorkflowMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id }) => {
      if (!id) {
        Promise.reject('Invalid Request');
      }
      const response = await service.delete(`/v1/admin/workflow`, {
        params: { id },
      });
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Workflow deleted successfully!', {
          variant: 'success',
        });
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === queryKeys.Workflows,
        });
      },
    }
  );
};
