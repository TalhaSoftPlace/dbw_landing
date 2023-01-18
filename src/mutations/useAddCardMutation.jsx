import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';

export const useAddCardMutation = () => {
  const { user: { userName } = {} } = useAuth();
  const queryClient = useQueryClient();

  return useMutation(
    async ({ cardToken, defaultMethod }) => {
      if (!userName) {
        Promise.reject('Invalid Request');
      }
      const response = await service.post(`/v1/checkout/card`, {
        cardToken,
        userName,
        defaultMethod,
      });
      return response?.data;
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries([queryKeys.Cards, userName]);
      },
    }
  );
};
