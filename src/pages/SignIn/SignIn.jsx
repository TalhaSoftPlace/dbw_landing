import React from 'react';
import { Container } from '@mui/material';
import { HomeNavbar, Login } from '../../containers';
import { Background, Wrapper, LoginWrapper } from './SignIn.style';
import { FormFooter, WithBGIcons } from '../../components';
import { useWindowResize } from '../../hooks';
import { useTheme } from '@mui/material';
export const SignIn = () => {
  const winSize = useWindowResize();

  const muiTheme = useTheme();
  return (
    <>
      <Background>
        <HomeNavbar />
        <Container maxWidth="lg">
          <Wrapper>
            <WithBGIcons
              size={winSize.width > muiTheme.breakpoints.values.sm ? 25 : 0}
            >
              <LoginWrapper>
                <Login />
              </LoginWrapper>
            </WithBGIcons>
          </Wrapper>
        </Container>
      </Background>
      {winSize.width > muiTheme.breakpoints.values.sm ? <FormFooter /> : <></>}
    </>
  );
};
