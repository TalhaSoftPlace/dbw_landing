import * as yup from 'yup';

export const basicSchema = yup.object().shape({
  groupName: yup.string().required('Required'),
  groupDesc: yup.string().required('Required'),
});
