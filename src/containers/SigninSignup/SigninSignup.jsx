import React from 'react';
import { LoginButton, SignupButton, Wrapper } from './SigninSignup.styles';
import { useLocalization } from '../../hooks';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export const SigninSignup = React.memo(() => {

  const { t } = useLocalization();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = React.useState(true);
  const [showSignUp, setShowSignUp] = React.useState(true);
  const location = useLocation();
  const hadleOpen = React.useCallback(() => {
    navigate('/sign-up');
  }, [navigate]);

  React.useEffect(() => {
    if (location.pathname.includes('sign-up')) {
      setShowSignUp(false);
    }
    if (location.pathname.includes('sign-in')) {
      setShowLogin(false);
    }
  }, [location, setShowLogin, setShowSignUp]);

  return (
    <Wrapper>
        <>
          {showLogin ? (
            <LoginButton>
            <a href={process.env.REACT_APP_FRONTEND_URL} alt="url">{t.SignInsignup.signin}</a>
            </LoginButton>
          ) : (
            <></>
          )}
          {showSignUp ? (
            <SignupButton
              onClick={hadleOpen}
              sx={{ color: 'text.light', cursor: 'pointer' }}
            >
              {t.SignInsignup.signup}
            </SignupButton>
          ) : (
            <></>
          )}
      </>
    </Wrapper>
  );
});
