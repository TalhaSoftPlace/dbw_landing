import { useMutation, useQueryClient } from 'react-query';
import { service } from '../services';
import { useAuth } from '../hooks';
import { useSnackbar } from 'notistack';
import { queryKeys } from '../constants';

export const useCreateWorkflowDocumentMutation = () => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ workFlowId, formDataJSON, formDesignJson, description }) => {
      if (!user) {
        Promise.reject('Invalid Request');
      }
      const response = await service.post(`/v1/users/workflow/document`, {
        userName: user?.userName,
        domainName: user?.domainModel?.domainName,
        workFlowId,
        workFlowDocName: description,
        formDataJSON,
        description: description,
        formDesignJson,
        lastStatus: 'C',
      });
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
