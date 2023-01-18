import * as Yup from 'yup';
export const invitecodeSchema = Yup.object().shape({
  inviteCode: Yup.string()
    .required('Please enter Invitation Code.')
    .min(3, 'Please enter valid Invitation Code'),
});
