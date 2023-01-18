import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';

export const useDeleteUserGroupMutation = () => {
  const { user: { userName } = {} } = useAuth();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ groupId }) => {
      if (!userName) {
        Promise.reject('Invalid Request');
      }
      const response = await service.delete(
        `/v1/admin/users/userGroup/${groupId}`
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries([queryKeys.UserGroups]);
      },
    }
  );
};
