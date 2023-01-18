import { useQuery } from 'react-query';
import { useDebounce } from '../hooks';
import { service } from '../services';
import { queryKeys } from '../constants/index';

const getContacts = async ({ keyword }) => {
  const response = await service.get(`v1/user/mailbox/contacts/${keyword}`);
  return response?.data;
};

export const useContacts = ({ search }) => {
  const debouncedKeyword = useDebounce(search, 800);
  return useQuery(
    [queryKeys.Contacts, debouncedKeyword],
    () => getContacts({ keyword: debouncedKeyword }),
    {
      enabled: !!debouncedKeyword?.length,
    }
  );
};
