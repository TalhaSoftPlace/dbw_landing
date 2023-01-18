import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';

export const useDeleteCardMutation = () => {
  const { user: { userName } = {} } = useAuth();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ cardId }) => {
      if (!userName) {
        Promise.reject('Invalid Request');
      }
      const response = await service.delete(`/v1/checkout/card`, {
        params: { cardId, userName },
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
