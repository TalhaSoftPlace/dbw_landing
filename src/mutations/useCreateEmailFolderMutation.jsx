import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';
import { useSnackbar } from 'notistack';
export const useCreateEmailFolderMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ folderName }) => {
      const response = await service.post(`/v1/user/mailbox/createFolder`, {
        folderName,
      });
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Folder created successfully', { variant: 'success' });
        queryClient.refetchQueries([queryKeys.FolderList]);
      },
    }
  );
};
