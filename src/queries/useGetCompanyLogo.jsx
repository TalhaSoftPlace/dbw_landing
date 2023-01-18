import { useQuery } from 'react-query';
import { fileService } from '../services';
import { queryKeys } from '../constants/index';
import { useAuth } from '../hooks';
import {
  arrayBufferToBase64,
  arrayBufferToString,
  validImageBase64,
} from '../utils';

const getCompanyLogo = async domainName => {
  const { data: logoData } = await fileService.get(
    `/v1/admin/users/companyProfile/logo/${domainName}`,
    {
      params: { domainName },
    }
  );
  if (
    arrayBufferToString(logoData) ===
    'You can upload your company logo in Company Settings '
  )
    return undefined;
  const base64string = arrayBufferToBase64(logoData);
  if (!validImageBase64(base64string)) {
    return `data:image/png;base64,${base64string}`;
  }
  return base64string;
};

export const useGetCompanyLogo = () => {
  const {
    user: { domainModel: { domainName } } = { domainModel: {} },
  } = useAuth();

  return useQuery(
    [queryKeys.CompanyLogo, domainName],
    () => getCompanyLogo(domainName),
    {
      enabled: !!domainName,
    }
  );
};
