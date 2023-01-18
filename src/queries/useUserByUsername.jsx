import { useQuery } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';

const getUser = async ({ username }) => {
  const response = await service.get(`/v1/admin/users/${username}`);
  return response?.data;
};

export const useUserByUsername = ({ username }) => {
  return useQuery([queryKeys.User, username], () => getUser({ username }), {
    enabled: !!username,
  });
};
