import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import { useAuth } from '../hooks';

const getOrginazationSchema = async ({ domain }) => {
  const response = await service.get(
    `/v1/admin/users/organizationTreeNode/${domain}`
  );
  return response?.data;
};

export const useOrginazationSchema = () => {
  const { user } = useAuth();
  return useQuery(
    [queryKeys.OrgSchema, user?.domainModel?.domainName],
    () => getOrginazationSchema({ domain: user?.domainModel?.domainName }),
    {
      enabled: !!user?.domainModel?.domainName,
    }
  );
};
