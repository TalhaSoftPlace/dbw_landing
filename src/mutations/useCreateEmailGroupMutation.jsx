import { useMutation, useQueryClient } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { useSnackbar } from 'notistack';

export const useCreateEmailGroupMutation = () => {
  const { user: { userName } = {} } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ groupName, userIds, groupDescription }) => {
      if (!userName) {
        Promise.reject('Invalid Request');
      }
      const response = await service.post(`/v1/user/emailGroup`, {
        groupName,
        userIds,
        groupDescription,
        userName: userName,
      });
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Group added successfully!', { variant: 'success' });
        queryClient.invalidateQueries([queryKeys.CreateEmailGroups]);
        queryClient.refetchQueries([queryKeys.UserEmailGroups]);
      },
    }
  );
};
