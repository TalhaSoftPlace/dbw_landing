import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import { useAuth } from '../hooks';
import { useDomain } from './useDomain';
import { useMemo } from 'react';

const getDNSStatus = async (domainName, recordType, isNotVerified) => {
  const response =
    isNotVerified &&
    (await service.post(`/v1/admin/domains/${domainName}/checkdnsrecords`, {
      recordType,
    }));
  return response && response.data;
};

export const useCheckDNSStatus = ({ recordType }) => {
  const { user } = useAuth();

  const { data: domainInfo, isLoading } = useDomain();
  const isNotActive = useMemo(
    () => !isLoading && !(domainInfo?.status === 'ACTIVE'),
    [domainInfo?.status, isLoading]
  );
  return useQuery(
    [queryKeys.DNSStatus, user?.domainModel?.domainName, recordType],
    () => getDNSStatus(user?.domainModel?.domainName, recordType, isNotActive),
    {
      enabled: !!user && isNotActive,
    }
  );
};
