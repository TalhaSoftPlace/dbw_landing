import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';

const getUserGroupById = async ({ id }) => {
  if (!id) {
    return {};
  }
  const { data } = await service.get(`/v1/admin/users/userGroup/${id}`);
  data.userIds = data?.userModelList?.map(user => user.id.toString()) ?? [];
  return data;
};

export const useUserGroupById = ({ id }) => {
  return useQuery([queryKeys.UserGroupById, id], () =>
    getUserGroupById({ id })
  );
};
