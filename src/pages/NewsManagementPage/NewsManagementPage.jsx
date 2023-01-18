import React from 'react';
import { HomeNavbar } from '../../containers';
import {  HomeFooter, HomeAdressSection, NewsManagement} from '../../components';
import {
  Background,
} from './NewsManagementPage.style';
import { homeNavItems } from '../../constants';
export const NewsManagementPage = () => {
 
  return (
    <>
      <Background>
        <HomeNavbar pages={homeNavItems} />
          <NewsManagement />
          <HomeAdressSection />
          <HomeFooter />
      </Background>
    </>
  );
};
