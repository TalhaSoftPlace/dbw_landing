import React from 'react';
import { Container } from '@mui/material';
import { HomeNavbar, CreateUserForm } from '../../containers';
import { Background, Wrapper } from './Registration.style';
import { FormFooter } from '../../components';
import { WithBGIcons } from '../../components';
import { useWindowResize } from '../../hooks';
import { useTheme } from '@mui/material';

export const Registration = () => {
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
              <CreateUserForm />
            </WithBGIcons>
          </Wrapper>
        </Container>
      </Background>
      {winSize.width > muiTheme.breakpoints.values.sm ? <FormFooter /> : <></>}
    </>
  );
};
