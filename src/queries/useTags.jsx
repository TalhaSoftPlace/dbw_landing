import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';

const getTags = async () => {
  const response = await service.get(`/v1/user/calendar/events/tag`);
  return response?.data?.map(tag => tag.name);
};

export const useTags = () => {
  return useQuery([queryKeys.Tags], () => getTags());
};
