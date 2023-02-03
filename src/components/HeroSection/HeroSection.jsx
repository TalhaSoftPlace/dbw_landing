import React from 'react';
import { Grid, Container, Box, Typography } from '@mui/material';
import { Button } from '../../components';
import { Wrapper, EmailBox, HeroWrapper } from './HeroSection.styles';
import { ReactComponent as EmailBoxIcon } from '../../images/HeroemailBox.svg';
import { ReactComponent as EmailHeroIcon } from '../../images/EmailHeroIcon.svg';
import { ReactComponent as CalendarHeroIcon } from '../../images/CalendarHeroIcon.svg';
import { ReactComponent as WorkflowHeroIcon } from '../../images/WorkflowHeroIcon.svg';
import { ReactComponent as MeetblueHeroIcon } from '../../images/MeetblueHeroIcon.svg';
import { useNavigate } from 'react-router-dom';
import { useLocalization } from './../../hooks';

export const HeroSection = React.memo(() => {
  const navigate = useNavigate();
  const hadleOpen = React.useCallback(() => {
    navigate('/sign-up');
  }, [navigate]);
  const handleLogin = () => {
    window.location.replace(process.env.REACT_APP_FRONTEND_URL);
  };
  const { t } = useLocalization();
  return (
    <HeroWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item md={5} lg={5} sm={12} xs={12} mt={6}>
            <Wrapper>
              <Typography variant="h2">
                {t.heroHeading1} <br /> {t.heroHeading2}{' '}
              </Typography>
              <Typography mt={4} variant="h2">
                {t.heroSubheading}
              </Typography>
              <Typography variant="h4" sx={{ color: '#9a9ea5 !important' }}>
                {t.heroTagLine}
              </Typography>
              <Box sx={{ display: 'flex', gap: 4 }}>
                <Grid className="login-signup-grid" container>
                  <Grid item md={5} lg={5} sm={6} xs={6}>
                    <Button
                      variant="primary"
                      className="herosignup"
                      onClick={hadleOpen}
                    >
                      {t.signupToday}
                    </Button>
                  </Grid>
                  <Grid item md={7} lg={7} sm={6} xs={6}>
                    <Button
                      className="signin-btn"
                      variant="outlined"
                      onClick={handleLogin}
                    >
                      {t.signin}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Wrapper>
          </Grid>
          <Grid
            sx={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}
            item
            lg={7}
            md={7}
            sm={12}
          >
            {/* <WithBGIcons size={20}>
            </WithBGIcons> */}
            <EmailBox>
              <EmailBoxIcon height="450px" className="emailboxIcon" />
              <Box className="animationBox">
                <EmailHeroIcon className="email-hero-icon" />
                <CalendarHeroIcon className="email-hero-icon2" />
                <WorkflowHeroIcon className="email-hero-icon3" />
                <MeetblueHeroIcon className="email-hero-icon4" />
                <MeetblueHeroIcon className="email-static-icon" />
              </Box>
            </EmailBox>
          </Grid>
        </Grid>
      </Container>
    </HeroWrapper>
  );
});
