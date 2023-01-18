import React  from 'react';
import { HomeNavbar } from '../../containers';
import {  HomeFooter, HomeAdressSection,  NewsIntro} from '../../components';
import {
  Background,
} from './NewsIntroPage.style';
import { homeNavItems } from '../../constants';
export const NewsIntroPage = () => { 

  return (
    <>
      <Background>
        <HomeNavbar pages={homeNavItems} />
          <NewsIntro />
          <HomeAdressSection />
          <HomeFooter />
      </Background>
    </>
  );
};
