import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import { useAuth } from '../hooks';

const getUsers = async ({ domainId, domainName, page, size }) => {
  const { data } = await service.get(`/v1/admin/users/domains/${domainName}`, {
    params: { domainId, page, size },
  });
  return typeof data === 'string' ? [] : data;
};

const getSuspendedUsers = async ({ domainId, domainName, page, size }) => {
  const { data } = await service.get(`/v1/admin/users/suspended/domains/${domainName}`, {
    params: { domainId, page, size },
  });
  return typeof data === 'string' ? [] : data;
};

export const useUsers = ({ page = 0, size = 50, suspened = false } = {}) => {
  const { user } = useAuth();
  return useQuery(
    [queryKeys.Users, user?.domainModel?.domainName, suspened, page, size],
    () =>
      suspened ? getSuspendedUsers({
        domainId: user?.domainModel?.id,
        domainName: user?.domainModel?.domainName,
        page,
        size,
      }) :
      getUsers({
        domainId: user?.domainModel?.id,
        domainName: user?.domainModel?.domainName,
        page,
        size,
      }),
    {
      enabled: !!user?.domainModel?.id,
    }
  );
};
