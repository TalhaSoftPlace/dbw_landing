import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';
import { useSnackbar } from 'notistack';

export const useSetDefaultCardMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user: { userName } = {} } = useAuth();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ cardId }) => {
      if (!userName) {
        Promise.reject('Invalid Request');
      }
      const response = await service.put(`/v1/checkout/card/setAsDefault`, {
        cardId,
        userName,
      });
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Set as Default successfully', { variant: 'success' });
        queryClient.refetchQueries([queryKeys.Cards, userName]);
      },
    }
  );
};
