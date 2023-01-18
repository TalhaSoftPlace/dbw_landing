import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';

import { service } from '../services';

export const useUpdateSubscriptionMutation = () => {
  const queryClient = useQueryClient();
  const { user: { userName } = {} } = useAuth();

  return useMutation(
    async ({ payload }) => {
      if (!payload) {
        Promise.reject('Invalid Request');
      }
      const response = await service.put(`/v1/checkout/subscription`, payload);
      return response?.data;
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries([queryKeys.User]);
        queryClient.refetchQueries([queryKeys.Subscription, userName]);
      },
    }
  );
};
