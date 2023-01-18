import { useMutation } from 'react-query';
import useGeoLocation from 'react-ipgeolocation';
import moment from 'moment-timezone';
import { service } from '../services';

export const useCreateAdminMutation = () => {
  const location = useGeoLocation(); 
  return useMutation(
    async ({ username, domainName, phoneNumber, recoveryMail, password , registrarName }) => {
      const response = await service.post(`/v1/admin/users/create-admin`, {
        recoveryMail,
        userName: `${username}@${domainName}`,
        phoneNumber,
        domainName,
        password, 
        firstName: username,
        timeZone: moment.tz?.guess() ?? '',
        lang: navigator.language || navigator.userLanguage,
        country: location?.country ?? '',
        registrarName,
      });
      return response?.data;
    }
  );
};
