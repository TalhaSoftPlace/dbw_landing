import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';

export const useSendEmailMutation = () => {
  const queryClient = useQueryClient();
  const { user: { userName } = {} } = useAuth();
  return useMutation(
    async ({ subject, body, toEmails, ccEmails, bccEmails, attachments }) => {
      if (!userName) {
        Promise.reject('Invalid Request');
      }
      var formData = new FormData();
      attachments?.forEach(file => formData.append('attachments', file));
      formData.append(
        'dto',
        JSON.stringify({
          subject,
          body: body.replaceAll("<p","<div").replaceAll("</p>","</div>"),
          fromEmail: userName,
          toEmails,
          ccEmails,
          bccEmails,
        })
      );

      const response = await service.post(`v1/user/mailbox/emails`, formData, {
        headers: {
          accept: '*/*',
          'Content-Type': `multipart/form-data`,
        },
      });

      return response?.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === queryKeys.Emails,
        });
      },
    }
  );
};
