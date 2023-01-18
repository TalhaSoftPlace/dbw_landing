import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';

export const useDeleteSubscriptionMutation = () => {
  const { user: { userName } = {} } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ subscriptionId }) => {
      if (!userName) {
        Promise.reject('Invalid Request');
      }
      const response = await service.delete(
        `/v1/checkout/subscription/${subscriptionId}`
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Subscription deleted!', { variant: 'success' });
        queryClient.refetchQueries([queryKeys.User]);
        queryClient.refetchQueries([queryKeys.Subscription,userName]);
        queryClient.refetchQueries([queryKeys.CustomerExists, userName]);
        queryClient.refetchQueries([queryKeys.Cards, userName]);
      },
    }
  );
};
