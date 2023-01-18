import { Box, Divider, Grid } from '@mui/material';
import { Formik } from 'formik';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { addRuleAtom } from '../../atoms';
import { ContentSection } from '../../components';
import { useLocalization } from '../../hooks';
import { useAddRule, useUpdateRule } from '../../mutations';
import { AddRuleForm } from './AddRuleForm';
import { addRuleSchema } from './validation.schema';

export const AddRule = React.memo(() => {
  const { rule } = useRecoilValue(addRuleAtom);
  const { t } = useLocalization();
  const navigate = useNavigate();
  const { mutateAsync: addRule } = useAddRule();
  const { mutateAsync: updateRule } = useUpdateRule();
  const initialValues = {
    update: !!rule,
    ruleType: rule?.ruleType ?? 'choose',
    domain: rule?.ruleDomain ?? '',
    hours: rule?.rule?.map?.hours ?? '6',
    color: rule?.rule?.map?.color ?? 'default',
    avatar: rule?.rule?.map?.avatar ?? '1',
  };

  const handleSubmit = useCallback(
    values => {
      const replyRule = {
        hours: values.hours,
        domain: values.domain,
      };
      const avatarRule = {
        avatar: values.avatar,
        color: values.color,
        domain: values.domain,
      };
      !!rule
        ? updateRule({
            id: rule?.id,
            rule: {
              ruleType: values.ruleType,
              rule: values.ruleType === 'reply' ? replyRule : avatarRule,
              enable: rule.enable,
            },
            ruleDomain: values.domain,
          }).then(() => {
            navigate('/admin/rules');
          })
        : addRule({
            ruleType: values.ruleType,
            rule: values.ruleType === 'reply' ? replyRule : avatarRule,
          }).then(() => {
            navigate('/admin/rules');
          });
    },
    [addRule, navigate, rule, updateRule]
  );

  return (
    <ContentSection
      heading={t.addBusinessRules.heading}
      subHeading={t.addBusinessRules.subHeading}
      headerAction={''}
    >
      <Grid container>
        <Grid item sm={12} lg={12}>
          <Divider sx={{ borderColor: 'text.primary' }} />
        </Grid>
      </Grid>
      <Box sx={{ mb: 1, minHeight: 100 }}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={addRuleSchema}
          validateOnMount
          enableReinitialize
        >
          {props => <AddRuleForm {...props} />}
        </Formik>
      </Box>
    </ContentSection>
  );
});
