import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';
import { useRecoilState } from 'recoil';
import { emailPaginationAtom } from '../atoms';

export const useEmailsAfterUId = () => {
  const queryClient = useQueryClient();
  const { user: { userName } = {} } = useAuth();
  const [{ pageSize, fromUid }, setPaginationState] = useRecoilState(emailPaginationAtom);
  return useMutation(
    async ({ pageNumber,  mailBoxFolder, flag }) => {
      if (!userName) {
        Promise.reject('Invalid Request');
      }
      const { data } = await service.get(`/v1/user/mailbox/emails`, {
        params: {
          pageNumber,
          pageSize,
          userName,
          mailBoxFolder: `${mailBoxFolder}`,
          flag,
          fromUid
        },
        headers: { 'content-type': 'application/json' },
      });
      if (mailBoxFolder=== "INBOX" && (!fromUid || (data?.emails?.[0]?.uid > fromUid) )) {
        setPaginationState((state)=>({...state, fromUid: data?.emails?.[0]?.uid }))
      }
      return { data, mailBoxFolder, pageSize, pageNumber, flag };
    },
    {
      onSuccess: ({ data, mailBoxFolder, pageSize, pageNumber, flag }) => {
        queryClient.setQueryData(
          [queryKeys.Emails, mailBoxFolder, pageSize, pageNumber, flag],
          dt => ({
            ...dt,
            emails: [...(data?.emails ?? []), ...dt.emails].filter(
              (value, index, self) => self.indexOf(value) === index
            ),
          })
        );
      },
    }
  );
};
