import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';

export const useReplyEmailMutation = () => {
  const queryClient = useQueryClient();
  const { user: { userName } = {} } = useAuth();
  return useMutation(
    async ({
      uid,
      folder,
      subject,
      body,
      toEmails,
      ccEmails,
      bccEmails,
      attachments,
      isForward = false,
      attachmentNames,
    }) => {
      if (!userName || !uid || !body) {
        Promise.reject('Invalid Request');
      }
      var formData = new FormData();
      attachments?.forEach(file => formData.append('attachments', file));
      formData.append(
        'dto',
        JSON.stringify({
          subject,
          body: body.replaceAll("<p","<div").replaceAll("</p>","</div>"),
          toEmails,
          ccEmails,
          bccEmails,
          uid,
          folder,
          forward: isForward,
          attachmentNames
        })
      );

      const response = await service.post(
        `v1/user/mailbox/emails/reply`,
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
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === queryKeys.Emails,
        });
      },
    }
  );
};
