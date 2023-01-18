import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ userName }) => {
      if (!userName) {
        Promise.reject('Invalid Request');
      }
      const response = await service.delete(`/v1/admin/users/${userName}`);
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
