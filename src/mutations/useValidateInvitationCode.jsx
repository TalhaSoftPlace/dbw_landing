import { useMutation } from 'react-query';
import { service } from '../services';
import { useSnackbar } from 'notistack';
export const useValidateInvitationCode = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async ({ inviteCode }) => {
      const response = await service.post(
        `/v1/admin/users/invitation-code/verify`,
        {
          inviteCode,
        }
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Code Matched Successfully!', { variant: 'success' });
      },
    }
  );
};
