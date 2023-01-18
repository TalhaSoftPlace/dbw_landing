import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';
import { useSnackbar } from 'notistack';
import { useAuth } from '../hooks';
export const useUpdateUserSettings = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  return useMutation(
    async ({
      firstName,
      surname,
      timezone,
      lang,
      country,
      skin,
      signature,
      autoReply,
      autoReplyText,
      autoReplyStartDate,
      autoReplyEndDate,
    }) => {
      const { data: response } = await service.put(
        `/v1/user/${user.userName}`,
        {
          firstName,
          surname,
          timezone,
          lang,
          country,
          skin,
          autoReply: !!autoReply ? 1 : 0,
          autoReplyText,
          autoReplyStartDate,
          autoReplyEndDate,
          signature,
          recoveryMail: 'string',
          phoneNumber: 'string',
          orgUnitId: 1,
          orgUnitManager: false,
          lastLoginDate: '2022-06-06T10:25:30',
          lastLoginIP: '192.168.0.1',
          lastLoginChannel: 'M',
          userPhotoLink: 'link_updated',
        }
      );
      return response;
    },
    {
      onSuccess: response => {
        enqueueSnackbar('user updated successfully!', { variant: 'success' });
        queryClient.invalidateQueries([queryKeys.UserSettings]);
        queryClient.invalidateQueries([queryKeys.User]);
      },
    }
  );
};
