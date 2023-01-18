import React from 'react';
import { HomeNavbar } from '../../containers';
import {  HomeFooter, HomeAdressSection, TermsandCondition} from '../../components';
import {
  Background,
} from './TermsandConditionPage.style';
import { homeNavItems } from '../../constants';

export const TermsandConditionPage = () => {
 
  
  return (
    <>
      <Background>
        <HomeNavbar pages={homeNavItems} />
          <TermsandCondition />
          <HomeAdressSection />
          <HomeFooter />
      </Background>
    </>
  );
};
