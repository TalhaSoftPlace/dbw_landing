import * as Yup from 'yup';
export const feedBackSchema = Yup.object().shape({
  username: Yup.string()
    .email('Email is not valid')
    .required('Please enter the email'),
  feedbacknote: Yup.string()
    .required('Please write a feedback note.')
    .min(20,'Please write atleast 20 characters of feedbace note.'),
});
