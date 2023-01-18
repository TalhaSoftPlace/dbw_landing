import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';

export const useUpdateOrgNode = ({ id }) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async ({ name }) => {
      if (!id) {
        Promise.reject('Invalid Request');
      }
      const response = await service.put(
        `v1/admin/users/organizationTreeNode/${id}`,
        {
          name,
        }
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Node Updated!', { variant: 'success' });
        queryClient.refetchQueries([queryKeys.OrgSchema]);
        queryClient.invalidateQueries([queryKeys.OrgSchema]);
      },
    }
  );
};
