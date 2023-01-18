import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import { useAuth } from '../hooks';

const getRules = async ({ domainName }) => {
  const { data } = await service.get(
    `/v1/admin/domains/rule/${domainName}`,
    {}
  );
  return data;
};

export const useRules = () => {
  const { user = {} } = useAuth();
  return useQuery(
    [queryKeys.Rules],
    () => getRules({ domainName: user?.domainModel?.domainName }),
    { enabled: !!user?.domainModel?.domainName }
  );
};
