import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import { parseDNSdata } from '../utils';

const getDomainDNS = async ({ domain }) => {
  const response = await service.get(`/v1/admin/domains/${domain}/dns`);
  return parseDNSdata(response);
};

export const useDomainDNS = ({ domain }) => {
  return useQuery(
    [queryKeys.DomainDNS, domain],
    () => getDomainDNS({ domain }),
    {
      enabled: !!domain,
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
      refetchOnMount: false,
    }
  );
};
