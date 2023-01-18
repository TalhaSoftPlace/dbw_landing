import { useMutation, useQueryClient } from 'react-query';
import { service } from '../services';
import { useSnackbar } from 'notistack';
import { queryKeys } from '../constants';

export const useDeleteWorkflowDocumentMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ documentId }) => {
      const response = await service.delete(`/v1/users/workflow/document`, {
        params: {
          id: documentId,
        },
      });
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Document delete successfully!', {
          variant: 'success',
        });
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === queryKeys.WorkflowDocuments,
        });
      },
    }
  );
};
