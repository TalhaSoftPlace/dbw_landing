import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
const getEmailHeader = async ({ uId, mailBoxFolder }) => {
  const { data } = await service.get(
    `/v1/user/mailbox/emailHeaderByUID/${mailBoxFolder}/${uId}`
  );
  return data;
};

export const useEmailHeader = ({ uId, mailBoxFolder }) => {
  return useQuery(
    [queryKeys.EmailHeader, mailBoxFolder, uId],
    () => getEmailHeader({ uId, mailBoxFolder }),
    {
      enabled: !!uId,
    }
  );
};
