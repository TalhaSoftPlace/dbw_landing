import React from 'react';
import { MailBoxNav, ProfileGeneralSettings } from '../../containers';
import { Background } from './ProfileSetting.styles';

export const ProfileSetting = () => {
  return (
    <Background>
      <MailBoxNav />
      <ProfileGeneralSettings />
    </Background>
  );
};
