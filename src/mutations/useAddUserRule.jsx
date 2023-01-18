import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';

export const useAddUserRule = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user: { userName } = {}} = useAuth();

  const queryClient = useQueryClient();
  return useMutation(
    async ({ruleType ,ruleEntity,rule,enable}) => {
      if (!userName) {
        Promise.reject('Invalid Request'); 
      }
      const response = await service.post(
        `/v1/user/custom/rule`,
        {
          ruleType,
          ruleEntity,
          rule,
          enable,
          userName,
        }
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('New Rule added!', { variant: 'success' });
        queryClient.refetchQueries([queryKeys.UserRules]);
      },
    }
  );
};
