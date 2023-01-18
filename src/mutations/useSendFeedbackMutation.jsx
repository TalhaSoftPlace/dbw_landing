import { useMutation } from 'react-query';
import { service } from '../services';
import { useSnackbar } from 'notistack';
export const useSendFeedbackMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async ({ category, feedback, userEmail }) => {
      const response = await service.post(`/v1/admin/users/feedback`, {
        category,
        feedback,
        userEmail,
      });
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Feedback Send successfully', { variant: 'success' });
      },
    }
  );
};
