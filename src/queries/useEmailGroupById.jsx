import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';

const getEmailGroupById = async ({ id }) => {
  if (!id) {
    return {};
  }
  const { data } = await service.get(`/v1/user/emailGroup/${id}`);
  data.userIds = data?.userModelList?.map(user => user.id.toString()) ?? [];
  return data;
};

export const useEmailGroupById = ({ id }) => {
  return useQuery([queryKeys.EmailGroupById, id], () =>
    getEmailGroupById({ id })
  );
};
