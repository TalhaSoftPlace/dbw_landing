import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';

export const useAddOrgNode = () => {
  const {
    user: { userName, domainModel: { domainName } = {} } = {},
  } = useAuth();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async ({ parentId, name, level }) => {
      if (!userName || !domainName) {
        Promise.reject('Invalid Request');
      }
      const response = await service.post(
        `v1/admin/users/organizationTreeNode`,
        {
          parentId,
          name,
          level,
          domain: domainName,
        }
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('New node added!', { variant: 'success' });
        queryClient.refetchQueries([queryKeys.OrgSchema]);
        queryClient.invalidateQueries([queryKeys.OrgSchema]);
      },
    }
  );
};
