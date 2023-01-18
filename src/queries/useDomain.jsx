import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import { useAuth } from '../hooks';

const getDomain = async ({ domain }) => {
  const response = await service.get(`/v1/admin/domains/${domain}`);
  return response?.data;
};

export const useDomain = () => {
  const { user } = useAuth();
  return useQuery(
    [queryKeys.Domain, user?.domainModel?.domainName],
    () => getDomain({ domain: user?.domainModel?.domainName }),
    {
      enabled: !!user?.domainModel?.domainName,
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
      refetchOnMount: false,
    }
  );
};
