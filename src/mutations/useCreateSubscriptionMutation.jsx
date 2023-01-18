import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';

export const useCreateSubscriptionMutation = () => {
  const { user: { userName } = {} } = useAuth();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ priceList }) => {
      if (!userName) {
        Promise.reject('Invalid Request');
      }
      const response = await service.post(`/v1/checkout/subscription`, {
        userName,
        priceList,
      });
      return response?.data;
    },
    {
      onSettled: () => {
        queryClient.refetchQueries([queryKeys.Subscription, userName]);
      },
    }
  );
};
