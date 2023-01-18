import React, { useMemo } from 'react';
import { ContentSection , LoadingOverlay } from '../../components';
import { Grid } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { AddGroupForm } from './AddGroupForm';
import { useNavigate , useParams} from 'react-router-dom';
import {useCreateEmailGroupMutation , useEditEmailGroupMutation} from '../../mutations';
import {useEmailGroupById} from '../../queries';
export const UserEmailGroupPage = React.memo(() => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { mutateAsync: createEmailGroup, isLoading: isCreating } = useCreateEmailGroupMutation();
  const { mutateAsync: editEmailGroup, isLoading: isUpdating } = useEditEmailGroupMutation();
  var { data: group = {}, isLoading: isGettingGroup } = useEmailGroupById({id: groupId});
  const initialValues = useMemo(
    () => ({
      groupName: group?.groupName ?? '',
      groupDescription: group.groupDescription ?? '',
      userIds: group.userNamesList ?? [],
    }),
    [group.groupDescription, group?.groupName, group.userNamesList]
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

  const resetFormAndNavigate = React.useCallback(()=>{
    // resetForm(initialValues);
    navigate('/user-dashboard/email-group');
  }, [navigate]) ;

  const handleSubmit = React.useCallback(
    ({groupName,
      groupDescription,
      userIds} ) => {
      resetFormAndNavigate();
      if(!groupId){
        createEmailGroup({
          groupName,
          groupDescription,
          userIds
        }).then(()=>{
          resetFormAndNavigate();
        })
      }else{
        editEmailGroup({id : groupId, 
                    groupName,
                    groupDescription,
                    userIds}).then(()=>{
                      resetFormAndNavigate();
                    })
      }
    },
    [createEmailGroup, editEmailGroup, groupId, resetFormAndNavigate]
  );

  return (
    <div>
      {(isCreating || isUpdating || isGettingGroup) && <LoadingOverlay />}
      <ContentSection
        heading="Add Email Group"
        subHeading="You can fill  email group details"
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
              return <AddGroupForm {...props} />;
            }}
          </Formik>
          <Grid item lg={6} xl={6} sm={12}></Grid>
        </>
      </ContentSection>
    </div>
  );
});
