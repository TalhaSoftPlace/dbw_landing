import { useQuery } from 'react-query'; 
import { useDebounce } from '../hooks';
import { service } from '../services';
import { queryKeys } from './../constants/index';

const checkDomainExists = async ({ domain , setFieldValue  }) => {
  const response = await service.get(`/v1/admin/domains/${domain}/exists`);
  setFieldValue('registrarName' , response?.data?.provider);
  return response?.data;
  
};

export const useCheckDomainExsist = ({ domain , setFieldValue  }) => {
  const debouncedDomain = useDebounce(domain, 1000);
  return useQuery(  
    [queryKeys.DomainExists, debouncedDomain],
    () => checkDomainExists({ domain: debouncedDomain , setFieldValue }),
    {
      enabled: debouncedDomain?.length > 2,
    }
  );
};
