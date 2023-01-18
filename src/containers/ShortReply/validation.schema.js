import * as Yup from 'yup';
export const sendEmailValidationSchema = Yup.object().shape({
  to: Yup.array()
    .of(Yup.string().email('Invalid Recipient'))
    .min(1, 'Please add at least 1 Recipient'),
});
