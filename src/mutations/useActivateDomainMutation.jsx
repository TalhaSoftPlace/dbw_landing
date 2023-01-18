import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';

export const useActivateDomainMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation(
    async () => {
      if (!user?.domainModel?.domainName) {
        Promise.reject('Invalid Request');
      }
      const response = await service.post(
        `/v1/admin/domains/${user?.domainModel?.domainName}/activation`
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries([
          queryKeys.Domain,
          user?.domainModel?.domainName,
        ]);

        queryClient.refetchQueries([queryKeys.User]);
      },
    }
  );
};
