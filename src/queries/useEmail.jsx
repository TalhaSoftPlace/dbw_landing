import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';

const getEmail = async ({ uId, mailBoxFolder }) => {
  const { data } = await service.get(
    `/v1/user/mailbox/email/${mailBoxFolder}/${uId}`
  );
  return data;
};

export const useEmail = ({ uId, mailBoxFolder, disabled = false } ) => { 
  return useQuery(
    [queryKeys.Email, mailBoxFolder, uId],
    () => getEmail({ uId, mailBoxFolder }),
    {
      enabled: !!uId && !disabled,
      staleTime: 1000 * 60 * 60,
      refetchOnMount: false,
    }
  );
};
