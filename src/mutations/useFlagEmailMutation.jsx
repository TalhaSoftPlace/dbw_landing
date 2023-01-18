import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { emailPaginationAtom } from '../atoms';
import { queryKeys, seen } from '../constants';
import { useAuth } from '../hooks';
import { service } from '../services';
import { filterText } from './../constants/emailFlags';

const updateFlag = ({ email, activationStatus = true, updatedFlag }) => {
  if (activationStatus) {
    return {
      ...email,
      systemFlags: [...(email?.systemFlags ?? []), filterText[updatedFlag]],
      userFlags: [...(email?.userFlags ?? []), filterText[updatedFlag]],
    };
  } else {
    return {
      ...email,
      systemFlags: email?.systemFlags?.filter(
        i => i !== filterText[updatedFlag]
      ),
      userFlags: email?.userFlags?.filter(i => i !== filterText[updatedFlag]),
    };
  }
};

const childEmailUpdate = ({
  email,
  uids,
  activationStatus = true,
  updatedFlag,
}) => {
  let flagedEmail = email,
    updatedReferencedThreads = email.referencedThreads;
  if (uids.includes(email.uid)) {
    flagedEmail = updateFlag({ email, activationStatus, updatedFlag });
  }
  if (!!email.referencedThreads) {
    updatedReferencedThreads = email.referencedThreads.map(i => {
      return childEmailUpdate({
        email: i,
        uids,
        activationStatus,
        updatedFlag,
      });
    });
  }
  return { ...flagedEmail, referencedThreads: updatedReferencedThreads };
};
export const useFlagEmailMutation = () => {
  const { pageNumber, pageSize, folder: mailBoxFolder, flag } = useRecoilValue(
    emailPaginationAtom
  );
  const { user: { userName } = {} } = useAuth();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ uids, flag = seen, activationStatus }) => {
      if (!userName) {
        Promise.reject('Invalid Request');
      }
      const response = await service.put(`/v1/user/mailbox/flag/email`, {
        uid: uids,
        mailBoxFolder,
        flag,
        activationStatus: activationStatus ?? 'true',
      });
      return {
        data: response?.data,
        uids,
        updatedFlag: flag,
        activationStatus,
      };
    },
    {
      onSuccess: ({ uids, activationStatus = true, updatedFlag }) => {
        queryClient.setQueryData(
          [queryKeys.Emails, mailBoxFolder, pageSize, pageNumber, flag],
          data => {
            const modifiedEmails = data?.emails?.map(email => {
              return childEmailUpdate({
                email,
                uids,
                activationStatus,
                updatedFlag,
              });
            });
            const modifiedStaredEmails = mailBoxFolder==="Starred" ? modifiedEmails.filter(email =>!uids.includes(email.uid)):modifiedEmails; 
            if (modifiedStaredEmails) return { ...data, emails: modifiedStaredEmails };
            return data;
          }
        );
      },
    }
  );
};
