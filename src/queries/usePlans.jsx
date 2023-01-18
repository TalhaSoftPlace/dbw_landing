import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import { parsePlansdata } from '../utils';

const getPlans = async () => {
  const { data } = await service.get(`/v1/checkout/prices`);
  return data && parsePlansdata(data);
};

export const usePlans = () => {
  return useQuery([queryKeys.Plans], () => getPlans());
};
