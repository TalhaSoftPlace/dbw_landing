import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import { useAuth } from '../hooks';

const getInvoices = async ({ userName, endingBefore, startingAfter }) => {
  const { data } = await service.get(`/v1/checkout/invoices`, {
    params: { userName, endingBefore, startingAfter },
  });
  return data;
};

export const useInvoices = ({ endingBefore = '', startingAfter = '' }) => {
  const { user: { userName } = {} } = useAuth();
  return useQuery(
    [queryKeys.Invoices, userName, endingBefore, startingAfter],
    () => getInvoices({ userName, endingBefore, startingAfter }),
    {
      enabled: !!userName,
    }
  );
};
