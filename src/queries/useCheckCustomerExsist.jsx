import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import { useAuth } from '../hooks';

const getCustomer = async userName => {
  const { data } = await service.get(`/v1/checkout/customer`, {
    params: { userName },
  });
  return data;
};

export const useCheckCustomerExsist = () => {
  const { user } = useAuth();
  return useQuery(
    [queryKeys.CustomerExists, user?.userName],
    () => getCustomer(user?.userName),
    {
      enabled: !!user?.userName,
    }
  );
};
