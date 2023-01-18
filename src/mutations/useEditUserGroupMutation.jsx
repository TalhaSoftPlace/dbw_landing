import { useMutation, useQueryClient } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { useSnackbar } from 'notistack';

export const useEditUserGroupMutation = () => {
  const { user: { domainModel: { domainName } } = {} } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, groupName, userIds, groupDescription }) => {
      if (!domainName) {
        Promise.reject('Invalid Request');
      }
      const response = await service.put(`/v1/admin/users/userGroup/${id}`, {
        groupName,
        userIds,
        groupDescription,
        domain: domainName,
      });
      return { data: response?.data, deletedGroupId: id };
    },
    {
      onSuccess: ({ deletedGroupId }) => {
        enqueueSnackbar('Group updated successfully!', { variant: 'success' });
        queryClient.invalidateQueries([
          queryKeys.UserGroupById,
          deletedGroupId,
          domainName,
        ]);
        queryClient.invalidateQueries([queryKeys.UserGroups]);
        queryClient.refetchQueries([queryKeys.UserGroups]);
      },
    }
  );
};