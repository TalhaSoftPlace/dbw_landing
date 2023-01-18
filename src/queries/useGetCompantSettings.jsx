import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import { useAuth } from '../hooks';

const getCompantSettings = async domainName => {
  const { data } = await service.get(
    `/v1/admin/users/companyProfile/${domainName}`,
    {
      params: { domainName },
    }
  );
  return data;
};

export const useGetCompantSettings = () => {
  const {
    user: { domainModel: { domainName } } = { domainModel: {} },
  } = useAuth();
  return useQuery(
    [queryKeys.CompanySettings, domainName],
    () => getCompantSettings(domainName),
    {
      enabled: !!domainName,
    }
  );
};
