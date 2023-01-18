import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import { useAuth } from '../hooks';

const getSubscription = async userName => {
  const { data } = await service.get(`/v1/checkout/subscription`, {
    params: { userName },
  });
  return data;
};

export const useSubscription = () => {
  const { user: { userName } = {} } = useAuth();
  return useQuery(
    [queryKeys.Subscription, userName],
    () => getSubscription(userName),
    {
      enabled: !!userName,
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
      refetchOnMount: false,
    }
  );
};
