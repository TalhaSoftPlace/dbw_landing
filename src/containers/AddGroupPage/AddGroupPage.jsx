import React, { useMemo } from 'react';
import { ContentSection, LoadingOverlay } from '../../components';
import { Grid } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { AddGroupForm } from '../AddGroupForm/AddGroupForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateUserGroupMutation, useEditUserGroupMutation } from '../../mutations';
import { useUserGroupById } from '../../queries';

export const AddGroupPage = React.memo(() => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { mutateAsync: createUserGroup, isLoading: isCreating } = useCreateUserGroupMutation();
  const { mutateAsync: editUserGroup, isLoading: isUpdating } = useEditUserGroupMutation();
  var { data: group = {}, isLoading: isGettingGroup } = useUserGroupById({id : groupId});
  const initialValues = useMemo(
    () => ({
      groupName: group?.groupName ?? '',
      groupDescription: group.groupDescription ?? '',
      userIds: group.userIds ?? [],
    }),
    [group]
  );

  let validationSchema = yup.object({
    groupName: yup
      .string('Enter Group Name.')
      .trim()
      .required('Group Name is required.'),
      groupDescription: yup
      .string('Enter Group Description.')
      .trim()
      .required('Group Description is required.'),
  });

  const resetFormAndNavigate = React.useCallback(({resetForm})=>{
    resetForm(initialValues);
    navigate('/admin/users-and-groups/groups');
  }, [initialValues, navigate]) ;

  const handleSubmit = React.useCallback(
    ({ groupName, groupDescription, userIds }, { resetForm }) => {

      if(!groupId){
        createUserGroup({
          groupName,
          groupDescription,
          userIds
        }).then(()=>{
          resetFormAndNavigate({resetForm});
        })
      }else{
        editUserGroup({id : groupId, 
                    groupName,
                    groupDescription,
                    userIds}).then(()=>{
                      resetFormAndNavigate({resetForm});
                    })
      }
    },
    [resetFormAndNavigate, createUserGroup, editUserGroup, groupId]
  );

  return (
    <div>
      {(isCreating || isUpdating || isGettingGroup) && <LoadingOverlay />}
      <ContentSection
        heading="Add Group"
        subHeading="You can fill group details"
      >
        <>
          <Formik
            initialValues={initialValues}
            validateOnMount
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(props) => {
              return <AddGroupForm {...props} />
            }}
          </Formik>
          <Grid item lg={6} xl={6} sm={12}></Grid>
        </>
      </ContentSection>
    </div>
  );
});
