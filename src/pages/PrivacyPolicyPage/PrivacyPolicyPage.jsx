import React  from 'react';
import { HomeNavbar } from '../../containers';
import {  HomeFooter, HomeAdressSection, PrivacyPolicy } from '../../components';
import {
  Background,
} from './PrivacyPolicyPage.style';
import { homeNavItems } from '../../constants';
export const PrivacyPolicyPage = () => {


  return (
    <>
      <Background>
        <HomeNavbar pages={homeNavItems} />
          <PrivacyPolicy />
          <HomeAdressSection />
          <HomeFooter />
      </Background>
    </>
  );
};
