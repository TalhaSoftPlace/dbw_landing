import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { FooterInfoText, FormFooter, Wrapper , StyledLink } from './Login.styles';
import { LoginForm } from './LoginForm';
import { useGuest, useLocalization } from '../../hooks';
import { useLoginMutation } from '../../mutations';
export const Login = React.memo(() => {
  const { t } = useLocalization();

  const { isLoading: loading } = useGuest({ redirect: 'auto' });
  const { mutate: login, isLoading } = useLoginMutation();

  const initialValues = {
    username: '',
    password: '',
    showPassword: false,
  };
  const handleLogin = useCallback(
    (values) => {
      login({ username: values.username, password: values.password });
    },
    [login]
  );

  return (
    <Wrapper>
      <Formik initialValues={initialValues} onSubmit={handleLogin}>
        {(props) => <LoginForm {...props} isLoading={isLoading || loading} />}
      </Formik>
      <FormFooter>
        <FooterInfoText>{t.loginForm?.terms} <StyledLink to="/terms"><u>terms of services</u></StyledLink></FooterInfoText>
      </FormFooter>
    </Wrapper>
  );
});
