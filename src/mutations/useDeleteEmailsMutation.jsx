import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { emailPaginationAtom } from '../atoms';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';

export const useDeleteEmailsMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { pageNumber, pageSize, folder: mailBoxFolder, flag } = useRecoilValue(
    emailPaginationAtom
  );
  const { user: { userName } = {} } = useAuth();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ uids }) => {
      if (!userName) {
        Promise.reject('Invalid Request');
      }
      await service.delete(`/v1/user/mailbox/emails`, {
        params: {
          uid: uids.join(),
          mailBoxFolder,
        },
      });
      return { deletedUids: uids };
    },
    {
      onSuccess: ({ deletedUids }) => {
        enqueueSnackbar('Email/s Deleted', {
          variant: 'info',
        });
        queryClient.setQueryData(
          [queryKeys.Emails, mailBoxFolder, pageSize, pageNumber, flag],
          data => {
            const filtered = data?.emails.filter(
              i => !deletedUids.includes(i.uid)
            );
            if (filtered?.length < 10) {
              queryClient.invalidateQueries({
                predicate: query => query.queryKey[0] === queryKeys.Emails,
              });
            }
            return {
              ...data,
              emails: filtered,
              size: data.size - deletedUids.length,
            };
          }
        );
      },
    }
  );
};
