import * as Yup from 'yup';
export const AdminPasswordUpdateSchema = Yup.object().shape({
  adminPassword: Yup.string()
    .required('Please enter a password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character!'
    ),
  newPassword: Yup.string()
    .required('Please enter a password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character!'
    ),
  confirmPassword: Yup.string()
    .required('Pelase repeat your password')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match!'),
  
});
