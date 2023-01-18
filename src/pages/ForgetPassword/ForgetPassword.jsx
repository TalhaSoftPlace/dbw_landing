import React from 'react';
import { Container } from '@mui/material';
import { HomeNavbar, ForgetPasswordForm } from '../../containers';
import { Background, Wrapper } from './ForgetPassword.style';
import { FormFooter } from '../../components';
import { WithBGIcons } from '../../components';
import { useGuest, useWindowResize } from '../../hooks';
import { useTheme } from '@mui/material';

export const ForgetPassword = () => {
  useGuest({ redirect: '/admin' });
  const winSize = useWindowResize();
  const muiTheme = useTheme();
  return (
    <>
      <Background>
        <HomeNavbar />
        <Container maxWidth="lg">
          <Wrapper>
            <WithBGIcons
              size={winSize.width > muiTheme.breakpoints.values.sm ? 26 : 0}
            >
              <ForgetPasswordForm />
            </WithBGIcons>
          </Wrapper>
        </Container>
      </Background>
      {winSize.width > muiTheme.breakpoints.values.sm ? <FormFooter /> : <></>}
    </>
  );
};
