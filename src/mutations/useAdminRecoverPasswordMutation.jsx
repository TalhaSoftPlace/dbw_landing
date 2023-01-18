import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';
import { useSnackbar } from 'notistack';
export const useAdminRecoverPasswordMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async ({ userEmail, password, recoveryCode }) => {
      const { data: response } = await service.post(
        `/v1/admin/users/recover-password`,
        {
          userEmail,
          password,
          recoveryCode,
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
