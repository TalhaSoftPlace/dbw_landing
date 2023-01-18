import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';

export const useReactivateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ userName }) => {
      if (!userName) {
        Promise.reject('Invalid Request');
      }
      const response = await service.put(
        `/v1/admin/users/reactivate/${userName}`
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries({
          predicate: query => query.queryKey[0] === queryKeys.Users,
        });
      },
    }
  );
};
