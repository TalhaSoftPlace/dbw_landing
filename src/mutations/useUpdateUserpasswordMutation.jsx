import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';
import { useSnackbar } from 'notistack';
import { useAuth } from '../hooks';
export const useUpdateUserpassword = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  return useMutation(
    async ({ oldPassword, newPassword }) => {
      const { data: response } = await service.put(
        `/v1/user/changepassword/${user.userName}`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        }
      );
      return response;
    },
    {
      onSuccess: response => {
        enqueueSnackbar('Password updated successfully!', {
          variant: 'success',
        });
        queryClient.invalidateQueries([queryKeys.updateUserPassword]);
      },
    }
  );
};
