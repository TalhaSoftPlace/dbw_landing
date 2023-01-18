import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services'; 

export const useDeleteUserRuleMutation = () => {
  const { user: { userName } = {} } = useAuth();
  const queryClient = useQueryClient(); 
  return useMutation(
    async ({ id }) => {
      if (!userName) {
        Promise.reject('Invalid Request');
      }
      const response = await service.delete(
        `/v1/user/custom/rule/${id}/${userName}`
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries([queryKeys.UserRules]);
      },
    }
  );
};
