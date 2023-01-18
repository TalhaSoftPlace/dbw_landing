import { useMutation, useQueryClient } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { useSnackbar } from 'notistack';

export const useEditEmailGroupMutation = () => {
  const { user: { userName } = {} } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, groupName, userIds, groupDescription }) => {
      if (!userName) {
        Promise.reject('Invalid Request');
      }
      const response = await service.put(`/v1/user/emailGroup/${id}`, {
        groupName,
        userIds,
        groupDescription,
        userName,
      });
      return { data: response?.data, deletedGroupId: id };
    },
    {
      onSuccess: ({ deletedGroupId }) => {
        enqueueSnackbar('Group updated successfully!', { variant: 'success' });
        queryClient.invalidateQueries([
          queryKeys.EmailGroupById,
          deletedGroupId,
          userName,
        ]);
        queryClient.invalidateQueries([queryKeys.UserEmailGroups]);
        queryClient.refetchQueries([queryKeys.UserEmailGroups,]);
      },
    }
  );
};