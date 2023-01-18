import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import moment from 'moment';

const getNote = async ({ fromDate, toDate, tagName, searchTerm, page, size }) => {
  const { data } = await service.get(`/v1/user/calendar/events/meetingnote`, {
    params: {
      searchTerm,
      tagName,
      fromDate: !!fromDate ? moment(fromDate).format('YYYY-MM-DD') : undefined,
      toDate: !!toDate ? moment(toDate).format('YYYY-MM-DD') : undefined,
      page,
      size,
      // sort: 'createdAt,desc',
    },
  });
  return data;
};

export const useEventNotes = ({
  fromDate,
  toDate,
  tagName,
  page,
  size,
  sort,
  searchTerm,
}) => {
  const tag = tagName === 'all' ? undefined : tagName;
  return useQuery(
    [queryKeys.EventNotes, fromDate, toDate, tag, searchTerm, page, size, sort],
    () => getNote({ fromDate, toDate, tagName: tag, searchTerm, page, size, sort })
  );
};
