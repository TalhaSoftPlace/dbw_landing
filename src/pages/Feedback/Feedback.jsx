import React from 'react';
import { Container } from '@mui/material';
import { HomeNavbar, FeedbackForm } from '../../containers';
import { Background, Wrapper, LoginWrapper } from './Feedback.style';
import { FormFooter, WithBGIcons } from '../../components';
import { useWindowResize } from '../../hooks';
import { useTheme } from '@mui/material';
import { homeNavItems } from '../../constants';
export const Feedback = () => {
  const winSize = useWindowResize();
  const muiTheme = useTheme();
  return (
    <>
      <Background>
      <HomeNavbar pages={homeNavItems} />
        <Container maxWidth="lg">
          <Wrapper>
            <WithBGIcons
              size={winSize.width > muiTheme.breakpoints.values.sm ? 25 : 0}
            >
              <LoginWrapper>
                <FeedbackForm />
              </LoginWrapper>
            </WithBGIcons>
          </Wrapper>
        </Container>
      </Background>
      {winSize.width > muiTheme.breakpoints.values.sm ? <FormFooter /> : <></>}
    </>
  );
};
