import { useQuerys } from 'react-query';
import { fileService } from '../services';
import { queryKeys } from '../constants/index';

const getAttachement = async ({ uid, fileName, mailBoxFolder }) => {
  const { data } = await fileService.get(`/v1/user/mailbox/emails/attachment`, {
    params: { uid, fileName, mailBoxFolder },
  });
  return data;
};

export const useAttachements = (attachementsProps, load = true) => {
  return useQuerys(
    attachementsProps.map(({ uid, fileName, mailBoxFolder }) => ({
      queryKey: [queryKeys.Attachment, uid, fileName, mailBoxFolder],
      queryFn: () => getAttachement({ uid, fileName, mailBoxFolder }),
    })),
    {
      enabled: !!load,
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
      refetchOnMount: false,
    }
  );
};
