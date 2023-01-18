import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';

const getUserEmailGroups = async () => {
  const { data } = await service.get(`/v1/user/emailGroup`);
  return data;
};

export const useUserEmailGroups = () => {
  return useQuery(
    [queryKeys.UserEmailGroups],
    () => getUserEmailGroups());
};