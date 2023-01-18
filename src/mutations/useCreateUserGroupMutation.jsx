import { useMutation, useQueryClient } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { useSnackbar } from 'notistack';

export const useCreateUserGroupMutation = () => {
  const { user: { domainModel: { domainName } } = {} } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ groupName, userIds, groupDescription }) => {
      if (!domainName) {
        Promise.reject('Invalid Request');
      }
      const response = await service.post(`/v1/admin/users/userGroup`, {
        groupName,
        userIds,
        groupDescription,
        domain: domainName,
      });
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Group added successfully!', { variant: 'success' });
        queryClient.invalidateQueries([queryKeys.UserGroups]);
        queryClient.refetchQueries([queryKeys.UserGroups]);
      },
    }
  );
};
