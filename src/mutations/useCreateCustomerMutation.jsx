import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';

export const useCreateCustomerMutation = () => {
  const { user: { userName } = {} } = useAuth();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ name, userName, country, postal_code }) => {
      if (!userName) {
        Promise.reject('Invalid Request');
      }
      const response = await service.post(`/v1/checkout/customer`, {
        name,
        userName,
        email: userName,
        address: {
          country,
          postal_code,
        },
      });
      return response?.data;
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries([queryKeys.CustomerExists, userName]);
      },
    }
  );
};
