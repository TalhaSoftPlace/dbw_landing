import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';

export const useAddCompanySettings = () => {
  const queryClient = useQueryClient();
  const { user: { domainModel: { domainName } } = {} } = useAuth();
  return useMutation(
    async ({
      logo,
      companyName,
      facebook,
      linkedin,
      twitter,
      instagram,
      disclaimer,
    }) => {
      if (!domainName) {
        Promise.reject('Invalid Request');
      }
      var formData = new FormData();
      logo && formData.append('logo', logo);
      formData.append(
        'companyInfo',
        JSON.stringify({
          companyName,
          domain: domainName,
          linkedin,
          facebook,
          twitter,
          instagram,
          disclaimer,
        })
      );

      const response = await service.post(
        `/v1/admin/users/companyProfile`,
        formData,
        {
          headers: {
            accept: '*/*',
            'Content-Type': `multipart/form-data`,
          },
        }
      );

      return response?.data;
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries([queryKeys.CompanySettings, domainName]);
        queryClient.refetchQueries([queryKeys.CompanyLogo, domainName]);
      },
    }
  );
};
