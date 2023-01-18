import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';
import { useSnackbar } from 'notistack';
export const useAdminChangePassword = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async ({ adminPassword, newPassword, userName }) => {
      const { data: response } = await service.put(
        `/v1/admin/users/changepassword/${userName}`,
        {
          adminPassword: adminPassword,
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
