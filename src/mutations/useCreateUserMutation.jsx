import { useMutation, useQueryClient } from 'react-query';
import useGeoLocation from 'react-ipgeolocation';
import moment from 'moment-timezone';
import { service } from '../services';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { useSnackbar } from 'notistack';

export const useCreateUserMutation = () => {
  const location = useGeoLocation();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      username,
      firstName,
      password,
      orgUnitId,
      orgUnitManager,
      manager,
    }) => {
      if (!user) {
        Promise.reject('Invalid Request');
      }
      const response = await service.post(`/v1/admin/users`, {
        recoveryMail: '',
        userName: `${username}@${user?.domainModel?.domainName}`,
        surname: '',
        password,
        firstName,
        timeZone: moment.tz?.guess() ?? '',
        lang: navigator.language || navigator.userLanguage,
        country: location?.country ?? '',
        orgUnitId,
        manager,
        orgUnitManager,
      });
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('User added successfully!', { variant: 'success' });
        queryClient.refetchQueries({
          predicate: query => query.queryKey[0] === queryKeys.Users,
        });
      },
    }
  );
};
