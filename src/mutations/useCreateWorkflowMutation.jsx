import { useMutation, useQueryClient } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { useSnackbar } from 'notistack';

export const useCreateWorkflowMutation = () => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      formDesignJson,
      workFlowUsers,
      workFlowApprovals,
      workFlowViews,
      approvalLevels,
    }) => {
      if (!user) {
        Promise.reject('Invalid Request');
      }
      const response = await service.post(`/v1/admin/workflow`, {
        formDesignJson: JSON.stringify(formDesignJson),
        userName: user.userName,
        domainName: user.domainModel.domainName,
        description: formDesignJson?.schema?.title ?? '',
        status: 'U',
        approvalLevels,
        workFlowUsers,
        workFlowApprovals,
        workFlowViews,
      });
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Workflow added successfully!', { variant: 'success' });
        queryClient.refetchQueries({
          predicate: query => query.queryKey[0] === queryKeys.Workflows,
        });
      },
    }
  );
};
