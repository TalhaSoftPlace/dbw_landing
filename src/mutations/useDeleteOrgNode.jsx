import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';

export const useDeleteOrgNode = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async ({ id }) => {
      if (!id) {
        Promise.reject('Invalid Request');
      }
      const response = await service.delete(
        `v1/admin/users/organizationTreeNode/${id}`
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Node deleted!', { variant: 'success' });
        queryClient.refetchQueries([queryKeys.OrgSchema]);
        queryClient.invalidateQueries([queryKeys.OrgSchema]);
      },
    }
  );
};
