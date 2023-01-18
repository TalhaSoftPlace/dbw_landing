import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';

const getEmail = async ({ flag, mailBoxFolder }) => {
  const { data } = await service.get(
    `/v1/user/mailbox/getEmailsByFlag/${mailBoxFolder}/${flag}`
  );
  return data;
};

export const useFlagEmail = ({ flag, mailBoxFolder }) => {
  return useQuery([queryKeys.FlagEmail, mailBoxFolder, flag], () =>
    getEmail({ flag, mailBoxFolder })
  );
};
