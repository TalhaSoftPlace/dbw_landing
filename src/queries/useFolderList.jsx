import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';

const getFolders = async () => {
  const { data } = await service.get(`/v1/user/mailbox/getAllFolders`);
  return data;
};

export const useFolderList = () => {
  return useQuery([queryKeys.FolderList], () => getFolders(), {
    staleTime: 1000 * 60 * 60,
    refetchOnMount: false,
  });
};
