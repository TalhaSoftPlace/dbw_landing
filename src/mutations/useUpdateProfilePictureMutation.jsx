import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';

export const useUpdateProfilePictureMutation = () => {
  const queryClient = useQueryClient();
  const { user: { userName } = {} } = useAuth();
  return useMutation(
    async ({ picture }) => {
      if (!userName) {
        Promise.reject('Invalid Request');
      }
      var formData = new FormData();
      formData.append('userName', userName);
      formData.append('picture', picture);

      const response = await service.put(`v1/user/profilepic`, formData, {
        headers: {
          accept: '*/*',
          'Content-Type': `multipart/form-data`,
        },
      });

      return response?.data;
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries([queryKeys.ProfilePicture]);
      },
    }
  );
};
