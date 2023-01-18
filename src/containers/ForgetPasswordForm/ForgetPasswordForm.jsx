import React from 'react';
import { Formik } from 'formik';
import { Wrapper } from './ForgetPasswordForm.styles';
import { forgetPasswordSchema } from './validation.schema';
import { PasswordRecoveryEmail } from './PasswordRecoveryEmail';
import { RecoveryCode } from './RecoveryCode';
import { CreateNewPassword } from './CreateNewPassword';
import { RecoveryDnsForm } from './RecoveryDnsForm';

const initialValues = {
  username: '',
  domain: '',
  password: '',
  recoveryCode: '',
  confirmPassword: '',
  step: 'enter-email',
};

export const ForgetPasswordForm = React.memo(() => {
  return (
    <Wrapper>
      <Formik
        validateOnMount
        validationSchema={forgetPasswordSchema}
        initialValues={initialValues}
      >
        {(props) => {
          switch (props.values.step) {
            case 'enter-email':
              return <PasswordRecoveryEmail {...props} />;
            case 'add-recovery':
              return <RecoveryCode {...props} />;
            case 'reset-password':
              return <CreateNewPassword {...props} />;
            case 'RecoveryDnsForm':
              return <RecoveryDnsForm {...props} />;
            default:
              return;
          }
        }}
      </Formik>
    </Wrapper>
  );
});
