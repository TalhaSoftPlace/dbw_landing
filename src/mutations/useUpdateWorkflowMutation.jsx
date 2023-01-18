import { useMutation, useQueryClient } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { useSnackbar } from 'notistack';

export const useUpdateWorkflowMutation = () => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      workflowId,
      formDesignJson,
      workFlowUsers,
      workFlowApprovals,
      approvalLevels,
      workFlowViews,
      description,
      status,
    }) => {
      if (!user) {
        Promise.reject('Invalid Request');
      }
      const response = await service.put(`/v1/admin/workflow`, {
        id: workflowId,
        formDesignJson:
          typeof formDesignJson === 'string'
            ? formDesignJson
            : JSON.stringify(formDesignJson),
        userName: user.userName,
        domainName: user.domainModel.domainName,
        description: formDesignJson?.schema?.title ?? description,
        workFlowUsers,
        workFlowApprovals,
        approvalLevels,
        workFlowViews,
        status,
      });
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Workflow updated successfully!', {
          variant: 'success',
        });
        queryClient.refetchQueries({
          predicate: query => query.queryKey[0] === queryKeys.Workflows,
        });
      },
    }
  );
};
