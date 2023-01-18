import { useMutation, useQueryClient } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { useSnackbar } from 'notistack'; 

export const useEditUserRuleMutation = () => {
  const { user: { userName } = {} } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id , ruleType ,ruleEntity,rule,enable}) => {
      if (!userName) {
        Promise.reject('Invalid Request');
      }
      const response = await service.put(`/v1/user/custom/rule/${id}`, {
        ruleType,
        ruleEntity,
        rule,
        enable,
        userName,
      });
      return { data: response?.data};
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Rule updated successfully!', { variant: 'success' });
        queryClient.refetchQueries([queryKeys.UserRules]);
      },
    }
  );
};