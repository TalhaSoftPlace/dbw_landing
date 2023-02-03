import React from 'react';
import { LoginButton, SignupButton, Wrapper } from './SigninSignup.styles';
import { useLocalization } from '../../hooks';
import { useLocation } from 'react-router-dom';
import { InvitationDialog } from '../../components';
export const SigninSignup = React.memo(() => {

  const { t } = useLocalization();
  const [showLogin, setShowLogin] = React.useState(true);
  const [showSignUp, setShowSignUp] = React.useState(true);
  const location = useLocation();
  const [openDialog, setOpenDialog] = React.useState(false);
  const hadleOpen = React.useCallback(() => {
    setOpenDialog(true);
  }, []);
  const handleClose = React.useCallback(() => {
    setOpenDialog(false);
  }, []);

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
      <InvitationDialog open={openDialog} handleClose={handleClose} />
    </Wrapper>
  );
});
