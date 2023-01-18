import React, { useMemo } from 'react';
import { ContentSection, LoadingOverlay } from '../../components';
import { Grid } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { AddUserForm } from '../AddUserForm/AddUserForm';
import { useLocalization } from '../../hooks';
import { useCreateUserMutation, useUpdateUserMutation } from '../../mutations';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserByUsername } from '../../queries';

export const AddUser = React.memo(() => {
  const { username } = useParams();
  const { data: user, isLoading: isGettingUser } = useUserByUsername({
    username,
  });

  const { t } = useLocalization();
  const {
    mutateAsync: createUser,
    isLoading: isCreating,
  } = useCreateUserMutation();
  const {
    mutateAsync: updateUser,
    isLoading: isUpdating,
  } = useUpdateUserMutation({ username });
  const navigate = useNavigate();

  const initialValues = useMemo(
    () => ({
      username: user?.userName ?? '',
      fullname: user?.firstName ?? '',
      organizationalUnit: user?.orgUnitId,
      position: user?.orgUnitManager ? 'Manager' : 'Member',
      password: '',
      groups: [],
      alias: [],
    }),
    [user]
  );

  const validations = useMemo(() => {
    if (!user) {
      return {
        username: yup
          .string()
          .matches(/^[a-zA-Z]+[a-zA-Z0-9]*$/, 'Username is not valid')
          .min(2, 'Username too short!')
          .max(50, 'Username too  long!')
          .required('Username is required!'),
        password: yup
          .string()
          .required('Please enter a password')
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character!'
          ),
      };
    } else {
      return {};
    }
  }, [user]);

  let validationSchema = yup.object({
    ...validations,
    fullname: yup
      .string()
      .trim()
      .required('Please enter fullname'),
    organizationalUnit: yup
      .string()
      .required('Please select the Organizational Unit'),
  });

  const handleSubmit = React.useCallback(
    (
      { username, password, fullname, organizationalUnit, position },
      { resetForm }
    ) => {
      !user
        ? createUser({
            username,
            firstName: fullname,
            password,
            orgUnitId: organizationalUnit,
            manager: position === 'Manager',
            orgUnitManager: position === 'Manager',
          }).then(() => {
            resetForm(initialValues);
            navigate('/admin/users-and-groups/users');
          })
        : updateUser({
            user,
            firstName: fullname,
            orgUnitId: organizationalUnit,
            manager: position === 'Manager',
            orgUnitManager: position === 'Manager',
          }).then(() => {
            resetForm(initialValues);
            navigate('/admin/users-and-groups/users');
          });
    },
    [createUser, initialValues, navigate, updateUser, user]
  );

  return (
    <div>
      {(isCreating || isUpdating || isGettingUser) && <LoadingOverlay />}
      <ContentSection
        heading={!!username ? 'Update User' : t.addNewUser.heading}
        subHeading={t.addNewUser.subHeading}
      >
        <>
          <Formik
            initialValues={initialValues}
            validateOnMount
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {props => {
              return <AddUserForm {...props} user={user} />;
            }}
          </Formik>
          <Grid item lg={6} xl={6} sm={12}></Grid>
        </>
      </ContentSection>
    </div>
  );
});
