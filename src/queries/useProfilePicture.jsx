import { useQuery } from 'react-query';
import { fileService } from '../services';
import { queryKeys } from '../constants/index';
import { useAuth } from '../hooks';
import { arrayBufferToBase64, arrayBufferToString } from '../utils';

const getProfilePicture = async ({ userName }) => {
  const { data } = await fileService.get(`/v1/user/profilepic/${userName}`, {});
  if (
    arrayBufferToString(data) ===
    'Profile picture not found ! You can upload your picture from user settings '
  )
    return undefined;

  return data ? arrayBufferToBase64(data) : undefined;
};

export const useProfilePicture = () => {
  const { user = {} } = useAuth();
  return useQuery(
    [queryKeys.ProfilePicture],
    () => getProfilePicture({ userName: user?.userName }),
    {
      enabled: !!user?.userName,
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
      refetchOnMount: false,
    }
  );
};
