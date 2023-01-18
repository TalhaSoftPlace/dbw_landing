import { useQuery } from 'react-query';
import { useDebounce } from '../hooks';
import { service } from '../services';
import { queryKeys } from '../constants/index';

const getDomainVerificationCode = async ({ domain }) => {
  const response = await service.get(
    `/v1/admin/domains/${domain}/verificationcode`
  );
  return response?.data;
};

export const useDomainVerificationCode = ({ domain }) => {
  const debouncedDomain = useDebounce(domain, 1000);
  return useQuery(
    [queryKeys.DomainVerificationCode, debouncedDomain],
    () => getDomainVerificationCode({ domain: debouncedDomain }),
    {
      enabled: debouncedDomain?.length > 2,
    }
  );
};
