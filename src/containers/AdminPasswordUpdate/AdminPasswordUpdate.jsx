import React from 'react';
import { Formik } from 'formik';
import { Wrapper } from './AdminPasswordUpdate.styles';
import { AdminPasswordUpdateSchema } from './validation.schema';
import { useAdminChangePassword } from '../../mutations';
import { CreateNewPassword } from './CreateNewPassword';
const initialValues = {
  adminPassword: '',
  newPassword: '',
  confirmPassword: '',
  showPassword: false,
};

export const AdminPasswordUpdate = React.memo(({ userName, onClose }) => {
  const { mutateAsync: adminChangePassword } = useAdminChangePassword();
  const handleSubmit = (values) => {
     adminChangePassword({

      
      userName,
      adminPassword: values?.adminPassword,
      newPassword: values?.newPassword,
    }).then(() => {
      onClose();
    });
  };

  return (
    <Wrapper>
      <Formik
        validateOnMount
        validationSchema={AdminPasswordUpdateSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {(props) => {
          return <CreateNewPassword {...props} />;
        }}
      </Formik>
    </Wrapper>
  );
});
