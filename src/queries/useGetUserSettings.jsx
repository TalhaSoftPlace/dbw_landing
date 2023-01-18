import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import { useAuth } from '../hooks';

const getUserSettings = async userName => {
  const { data } = await service.get(`/v1/user/${userName}`, {
    params: { userName },
  });
  return data[0];
};

export const useGetUserSettings = () => {
  const { user } = useAuth();
  return useQuery(
    [queryKeys.UserSettings, user?.userName],
    () => getUserSettings(user?.userName),
    {
      enabled: !!user?.userName,
    }
  );
};
