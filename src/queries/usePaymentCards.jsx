import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import { useAuth } from '../hooks';

const getCards = async userName => {
  const { data } = await service.get(`/v1/checkout/card`, {
    params: { userName },
  });
  return data;
};

export const usePaymentCards = (enabled = true) => {
  const { user: { userName } = {} } = useAuth();
  return useQuery([queryKeys.Cards, userName], () => getCards(userName), {
    enabled: enabled && !!userName,
  });
};
