import React from 'react';
import { ProfileChangePasswordForm } from '../../components';
import { Formik } from 'formik';
import { useUpdateUserpassword } from '../../mutations';
import {updatePasswordSchema} from './validation.schema';
export const ProfileChangePassword = React.memo(() => {
  const { mutateAsync: updateUserPassword } = useUpdateUserpassword();
  const initialValues = {
      oldpassword:'',
      newpassword:'',
      confirmPassword:'',
      showPassword:false,
  };

  const handleSubmit = (values) => {
    updateUserPassword({
      oldPassword:values?.oldpassword,
      newPassword:values?.newpassword,
    }).then(() => {
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validateOnMount
        enableReinitialize
        validationSchema={updatePasswordSchema}
        onSubmit={handleSubmit}
      >
        {(props) => {
          return <ProfileChangePasswordForm {...props} />;
        }}
      </Formik>
    </>
  );
});
 