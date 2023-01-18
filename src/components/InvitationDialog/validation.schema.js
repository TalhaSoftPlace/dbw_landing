import * as Yup from 'yup';
export const inviteemailSchema = Yup.object().shape({
  username: Yup.string()
  .email('Email is not valid')
  .required('Please enter the email'),
});
