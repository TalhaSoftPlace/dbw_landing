import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';

export const useUpdateRule = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, rule, ruleDomain }) => {
      const response = await service.put(
        `/v1/admin/domains/rule/${id}`,

        {
          ...rule,
          ruleDomain,
          domain: user?.domainModel?.domainName,
        }
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Rule updated!', { variant: 'success' });
        queryClient.refetchQueries([queryKeys.Rules]);
      },
    }
  );
};
