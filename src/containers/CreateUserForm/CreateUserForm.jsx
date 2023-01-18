import React from 'react';
import { Formik } from 'formik';
import { FormFooter, InfoText, Wrapper , StyledLink } from './CreateUserForm.styles';
import { createAdminUserSchema } from './validation.schema';
import { RecoveryCode } from './RecoveryCode';
import { CreateUsernameStep } from './CreateUsernameStep';
import { useLocalization } from '../../hooks';

const initialValues = {
  username: '',
  domain: '',
  isDomainExsist: false,
  recaptchaToken: '0',
  recoveryMail: '',
  step: 'create-username',
  showPassword: false,
  registrarName : '',
};

export const CreateUserForm = React.memo(() => {
  const { t } = useLocalization();

  return (
    <Wrapper>
      <Formik
        validateOnMount
        validationSchema={createAdminUserSchema}
        initialValues={initialValues}
      >
        {(props) => {
          switch (props.values.step) {
            case 'create-username':
              return <CreateUsernameStep {...props} />;
            case 'add-recovery':
              return <RecoveryCode {...props} />;
            default:
              return;
          }
        }}
      </Formik>
      <FormFooter>
        <InfoText>{t.createAdminForm?.terms} <StyledLink to="/terms"><u>terms of services</u></StyledLink> </InfoText>
      </FormFooter>
    </Wrapper>
  );
});
