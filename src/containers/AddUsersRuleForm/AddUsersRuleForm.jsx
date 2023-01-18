import React, { useMemo } from 'react';
import { ContentSection, LoadingOverlay } from '../../components';
import { Grid } from '@mui/material';
import { Formik } from 'formik';
import { CreateUserRuleForm } from '../CreateUserRuleForm/CreateUserRuleForm';
import { useLocalization } from '../../hooks';
import {useAddUserRule , useEditUserRuleMutation} from '../../mutations';
import {useNavigate , useParams} from 'react-router-dom';
import {useUserRules} from '../../queries';
export const AddUsersRuleForm = React.memo(() => {

  const { t } = useLocalization();
  const { data: userRules = [] } = useUserRules();
  const navigate = useNavigate();
  const { ruleId } = useParams();
  const { mutateAsync: addUserRule , isLoading} = useAddUserRule();
  const {mutateAsync : editUserRule , isLoading: isUpdating } = useEditUserRuleMutation();
  const ruleData = userRules.find(e => e.id === +ruleId);
  console.log(ruleData);
  const initialValues = useMemo(
    () => ({
      ruleType: ruleData?.ruleType ?? 'choose',
      ruleEntity:ruleData?.ruleEntity ?? '',
      foldername: ruleData?.rule?.map?.targetfolder ?? '',
      enable: ruleData?.enable ?? false,
    }),
    [ruleData?.enable, ruleData?.rule?.map?.targetfolder, ruleData?.ruleEntity, ruleData?.ruleType]
  );
  const handleSubmit = React.useCallback(
    ({ruleType , ruleEntity , foldername , enable }) => {
      if(!ruleId){
        addUserRule(
          {
            ruleType ,
            ruleEntity,
            rule: {
              targetfolder: foldername,
              replyTime: ""
            },
            enable,
          }
        ).then(()=>{
          navigate('/user-dashboard/rules');
        })
      }else{
        editUserRule(
          {
            id:ruleId,
            ruleType ,
            ruleEntity,
            rule: {
              targetfolder: foldername,
              replyTime: ""
            },
            enable,
          }
        ).then(()=>{
          navigate('/user-dashboard/rules');
        })
      }
    },
    [addUserRule, editUserRule, navigate, ruleId]
  );

  return (
    <div>
      {(isLoading || isUpdating ) && <LoadingOverlay />}
      <ContentSection
        heading={'Update User'}
        subHeading={t.addNewUser.subHeading}
      >
        <>
          <Formik
            initialValues={initialValues}
            validateOnMount
            enableReinitialize
            onSubmit={handleSubmit}
          > 
            {props => {
              return <CreateUserRuleForm {...props}  />;
            }}
          </Formik>
          <Grid item lg={6} xl={6} sm={12}></Grid>
        </>
      </ContentSection>
    </div>
  );
});
