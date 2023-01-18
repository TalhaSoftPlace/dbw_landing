import { useMutation, useQueryClient } from 'react-query';
import { service } from '../services';
import { useAuth } from '../hooks';
import { useSnackbar } from 'notistack';
import { queryKeys } from '../constants';

export const useApproveWorkflowDocumentMutation = () => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ level, status, notes, documentId }) => {
      if (!user) {
        Promise.reject('Invalid Request');
      }
      const response = await service.post(
        `/v1/users/workflow/document/approval`,
        {
          userName: user?.userName,
          domainName: user?.domainModel?.domainName,
          documentId,
          level,
          status,
          notes,
        }
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Form submitted successfully!', { variant: 'success' });
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === queryKeys.WorkflowDocuments,
        });
      },
    }
  );
};
