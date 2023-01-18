import React from 'react';
import { SendNewEmail, SingleEmailView } from '../../containers';
import { LoadingOverlay } from '../../components';
import { useAuth } from '../../hooks';
import { useParams } from 'react-router-dom';
import { EmailWrapper } from './SingleEmail.styles';

export const SingleEmail = React.memo(() => {
  const { user } = useAuth();
  let { uId, folder } = useParams();

  return (
    <EmailWrapper>
      {!user && uId && folder ? (
        <LoadingOverlay />
      ) : (
        <SingleEmailView
          hideClose
          selectedEmailId={uId}
          mailBoxFolder={folder}
        />
      )}
      <SendNewEmail />
    </EmailWrapper>
  );
});
