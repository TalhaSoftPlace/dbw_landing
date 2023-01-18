import * as Yup from 'yup';
export const updatePasswordSchema = Yup.object().shape({
  oldpassword: Yup.string()
    .required('Please enter a old password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character!'
    ),
  newpassword: Yup.string()
    .required('Please enter a new password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character!'
    ),
    confirmPassword: Yup.string()
    .required('Pelase repeat your password')
    .oneOf([Yup.ref('newpassword'), null], 'Passwords must match!'),
  
});
