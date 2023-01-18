import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import { useAuth } from '../hooks';
const getUserRules = async (userName) => {
  const { data } = await service.get(`/v1/user/custom/rule/${userName}`);
  return data;
};

export const useUserRules = () => {
  const { user: { userName } = {} } = useAuth();
  return useQuery(
    [queryKeys.UserRules , userName],
    () => getUserRules(userName));
};
