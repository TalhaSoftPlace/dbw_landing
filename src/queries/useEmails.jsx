import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import { useAuth } from '../hooks';
import { useRecoilState } from 'recoil';
import { emailPaginationAtom } from '../atoms';



const getEmails = async ({
  userName,
  pageNumber,
  pageSize,
  mailBoxFolder,
  flag,
  fromUid, setPaginationState 
}) => {
  const { data } = await service.get(`/v1/user/mailbox/emails`, {
    params: {
      pageNumber,
      pageSize,
      userName,
      mailBoxFolder: `${mailBoxFolder}`,
      flag,
    },
    headers: { 'content-type': 'application/json' },
  });
  if (mailBoxFolder=== "INBOX" && (!fromUid || (data?.emails?.[0]?.uid > fromUid) )) {
    setPaginationState((state)=>({...state, fromUid: data?.emails?.[0]?.uid }))
  }
  
  return data;
};

export const useEmails = ({mailBoxFolder, pageSize, pageNumber, flag}) => {
  const { user: { userName } = {} } = useAuth();
  const [{ fromUid }, setPaginationState] = useRecoilState(emailPaginationAtom);
  return useQuery(
    [queryKeys.Emails, mailBoxFolder, pageSize, pageNumber, flag],
    () => getEmails({ userName, pageNumber, pageSize, mailBoxFolder, flag, fromUid, setPaginationState }),
    {
      enabled: !!userName,
    }
  );
};
