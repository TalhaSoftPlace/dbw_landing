import React  from 'react';
import {MeetBlueHeroSection } from '../../components';
import {
  Background,
} from './MeetBlue.style';
import { MailBoxNav } from '../../containers';

export const MeetBlue = () => {


  return (
    <>
      <Background>
          <MailBoxNav />
          <MeetBlueHeroSection />
      </Background>
    </>
  );
};
