import * as Yup from 'yup';
export const createAdminUserSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z]+[a-zA-Z0-9]*$/, 'Username is not valid')
    .min(2, 'Username too short!')
    .max(50, 'Username too  long!')
    .required('Username is required!'),
  domain: Yup.string()
    .min(2, 'Domain too short!')
    .max(50, 'Domain too long!')
    .matches(
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/,
      'Domain must be a valid domain name!'
    )
    .required('Domain is required!'),
  isDomainExsist: Yup.boolean()
    .required('The domain does not exist!')
    .oneOf([true], 'The domain does not exist!'),
  password: Yup.string()
    .required('Please enter a password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character!'
    ),
  confirmPassword: Yup.string()
    .required('Pelase repeat your password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match!'),
  recoveryMail: Yup.string()
    .email('Invalid Email')
    .min(2, 'Email too short!')
    .max(50, 'Email too Long!')
    .required('Email is required!'),
});
