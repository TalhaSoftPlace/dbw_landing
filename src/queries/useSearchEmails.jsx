import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import { useDebounce } from '../hooks';
const getSearchedEmails = async ({ keyword, searchType }) => {
  const { data } = await service.get(`/v1/user/mailbox/emailBySolar`, {
    params: {
      keyword,
      searchType,
    },
  });
  return data;
};

export const useSearchEmails = ({ keyword, searchType }) => {
  const debouncedSearch = useDebounce(keyword, 1000);
  return useQuery(
    [queryKeys.SearchEmails, debouncedSearch, searchType],
    () => getSearchedEmails({ keyword: debouncedSearch, searchType }),
    {
      enabled: !!debouncedSearch?.length,
    }
  );
};
