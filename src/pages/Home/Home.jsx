import React from 'react';
import {
  HomeNews,
  HomeFooter,
  HomeAdressSection,
  HomePricing,
} from '../../components';
import { HomeNavbar, CookiesPopup } from '../../containers';
import { Typography } from '@mui/material';
import { FeatureCard, HeroSection } from '../../components';
import {
  Background,
  Wrapper,
  LockImage,
  KeyImage,
  LikeImage,
  CalenderImage,
  WhyUsDiv,
  WhyUsIntro,
  HolisticEmailIcon,
  MeetblueIcon
} from './Home.style';
import { Container, Grid } from '@mui/material';
import { useLocalization } from './../../hooks';
import { homeNavItems } from '../../constants';
import { cookiesApprovalAtom } from './../../atoms';
import { useRecoilValue } from 'recoil';
import { ChatwootWidget } from '../../components/Chatwoot/Chatwoot';
export const Home = () => {
  const { t } = useLocalization();
  const { isPopup } = useRecoilValue(cookiesApprovalAtom);
  return (
    <>
      <Background>
        <HomeNavbar pages={homeNavItems} />
        <HeroSection />
        <Container maxWidth="lg" className="herodiv">
          <Grid  spacing={2}>
            <Grid item xs={12} sx={{ pl: '0px !important' }}>
              <Wrapper>
                <Typography variant="h1" className="homeheading">
                  {t.homeHeading}
                </Typography>
                <Typography variant="h4" sx={{ color: '#9a9ea5 !important' }}>
                  {t.homeSubHeading}
                </Typography>
              </Wrapper>
            </Grid>
            <Grid
              container
              sx={{paddingInline: '9%'}}
              spacing={4}
              className="featurecard"
            >
              <Grid item xs={12} lg={4} md={6}>
                <FeatureCard
                  title={t.encryption.title}
                  body={t.encryption.body}
                >
                  <LockImage />
                </FeatureCard>
              </Grid>
              <Grid item xs={12} lg={4} md={6}>
                <FeatureCard
                  title={t.experience.title}
                  body={t.experience.body}
                >
                  <HolisticEmailIcon />
                </FeatureCard>
              </Grid>
              <Grid item xs={12} lg={4} md={6}>
                <FeatureCard title={t.workflow.title} body={t.workflow.body}>
                  <LikeImage />
                </FeatureCard>
              </Grid>
              <Grid item xs={12} lg={4} md={6}>
                <FeatureCard
                  title={t.meetBlue.title}
                  body={t.meetBlue.body}
                >
                  <MeetblueIcon />
                </FeatureCard>
              </Grid>
              <Grid item xs={12} lg={4} md={6}>
                <FeatureCard
                  title={t.intutiveOrganizer.title}
                  body={t.intutiveOrganizer.body}
                >
                  <CalenderImage />
                </FeatureCard>
              </Grid>
              <Grid item xs={12} lg={4} md={6}>
                <FeatureCard title={t.rules.title} body={t.rules.body}>
                  <KeyImage />
                </FeatureCard>
              </Grid>

            </Grid>
          </Grid>
        </Container>
        <HomePricing />
        <WhyUsDiv>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7} lg={7}></Grid>
            <Grid item xs={12} md={5} lg={5}>
              <WhyUsIntro sx={{ mr: 4 }}>
                <Typography variant="h4" sx={{ mb: 5 }}>
                  {t.WhyUsIntro.heading}
                </Typography>
                <Typography variant="h5" id="Privacy">
                  {t.WhyUsIntro.subheading}
                </Typography>
              </WhyUsIntro>
            </Grid>
          </Grid>
        </WhyUsDiv>
        <HomeNews />
        <HomeAdressSection />
        <HomeFooter />
        <ChatwootWidget />
      </Background>
      {isPopup && <CookiesPopup />}
    </>
  );
};
