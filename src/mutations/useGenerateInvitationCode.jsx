import { useMutation } from 'react-query';
import { service } from '../services';

export const useGenerateInvitationCode = () => {
  return useMutation(async ({ userEmail }) => {
    const response = await service.post(`/v1/admin/users/invitation-code`, {
      userEmail,
    });
    return response?.data;
  });
};
