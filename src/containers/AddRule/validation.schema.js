import * as Yup from 'yup';
export const addRuleSchema = Yup.object().shape({
  ruleType: Yup.string().oneOf(['reply', 'avatar'], 'Please select rule type'),
  domain: Yup.string()
    .min(2, 'Domain too short!')
    .max(50, 'Domain too long!')
    .matches(
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/,
      'Domain must be a valid domain name!'
    )
    .required('Domain is required'),
});
