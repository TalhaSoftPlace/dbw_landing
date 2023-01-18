import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';

export const useAddRule = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  const queryClient = useQueryClient();
  return useMutation(
    async ({ ruleType, rule }) => {
      if (!user?.domainModel?.domainName) {
        Promise.reject('Invalid Request');
      }
      const response = await service.post(
        `/v1/admin/domains/rule`,

        {
          ruleType,
          domain: user?.domainModel?.domainName,
          rule,
          ruleDomain: rule?.domain,
          enable: true,
        }
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('New Rule added!', { variant: 'success' });
        queryClient.refetchQueries([queryKeys.Rules]);
      },
    }
  );
};
