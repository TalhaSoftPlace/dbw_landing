import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { Form } from './Form';
import { useValidateInvitationCode } from '../../mutations';
import { invitecodeSchema } from './validation.schema';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { invitationCodeAtom } from '../../atoms';
export const InvitationCode = React.memo(({ open, handleClose }) => {

  const setinvitationCode = useSetRecoilState(invitationCodeAtom);
  const initialValues = {
    inviteCode: '',
  };
  const navigate = useNavigate();
  const { mutateAsync: validateCode, isLoading } = useValidateInvitationCode();
  const handleLogin = useCallback(
    values => {
      validateCode({
        inviteCode: values.inviteCode,
      }).then(()=>{
        setinvitationCode({ invitationcode: true });
        navigate('/sign-up');
      })
    },
    [navigate, setinvitationCode, validateCode]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleLogin}
      validationSchema={invitecodeSchema}
      validateOnMount
    >
      {props => (
        <Form
          {...props}
          isLoading={isLoading}
          open={open}
          handleClose={handleClose}
        />
      )}
    </Formik>
  );
});
