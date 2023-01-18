import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';
export const useMoveEmailToFolderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ crrFolderName, newFolderName, uids }) => {
      const response = await service.put(
        `/v1/user/mailbox/emails/changeFolder`,
        {
          crrFolderName,
          uids,
          newFolderName,
        }
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === queryKeys.Emails,
        });
      },
    }
  );
};
