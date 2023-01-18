import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';

const getGroups = async () => {
  const { data } = await service.get(`/v1/admin/users/userGroup`);
  return typeof data === 'string' ? [] : data;
};

export const useUserGroups = () => {
  return useQuery([queryKeys.UserGroups], () => getGroups());
};
