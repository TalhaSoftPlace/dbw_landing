import { useMutation, useQueryClient } from 'react-query';

import { service } from '../services';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { useSnackbar } from 'notistack';

export const useUpdateUserMutation = ({ username }) => {
  const { user: { domainModel: { domainName } } = {} } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ firstName, user, orgUnitId, manager, orgUnitManager }) => {
      if (!domainName) {
        Promise.reject('Invalid Request');
      }
      const {
        autoReplyText,
        autoReplyStartDate,
        autoReplyEndDate,
        lastLoginDate,
        lastLoginIP,
        lastLoginChannel,
        userPhotoLink,
        autoReply,
        recoveryMail,
        phoneNumber,
      } = user;
      const response = await service.put(`/v1/admin/users/${username}`, {
        firstName,
        orgUnitId,
        manager,
        orgUnitManager,
        autoReply,
        recoveryMail,
        phoneNumber,
        autoReplyText,
        autoReplyStartDate,
        autoReplyEndDate,
        lastLoginDate,
        lastLoginIP,
        lastLoginChannel,
        userPhotoLink,
      });
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('User updated successfully!', { variant: 'success' });
        queryClient.refetchQueries({
          predicate: query => query.queryKey[0] === queryKeys.Users,
        });
        queryClient.refetchQueries([queryKeys.User, username]);
      },
    }
  );
};
