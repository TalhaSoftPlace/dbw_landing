import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { Button } from '../../components';
import { HomeEndUserSection } from './../../components';
import { NewsCard, Logo } from '../../components';
import { InvitationDialog } from '../../components';
import {
  NewsHead,
  News,
  EmailPlateform,
  EmailAccount,
  PrivacySection,
  PowerIcon,
  StyledLink
} from './HomeNews.style';
import NewsIntro from '../../images/newsImage.png';
import NewsManagement from '../../images/newsManagement.png';
import { ReactComponent as LegalIcon } from '../../images/Legal.svg';
import { ReactComponent as IconPrivacy } from '../../images/icon-privacy.svg';
import { useLocalization } from './../../hooks';
export const HomeNews = React.memo(() => {
  const { t } = useLocalization();

  const [openDialog, setOpenDialog] = React.useState(false);
  const hadleOpen = React.useCallback(() => {
    setOpenDialog(true);
  }, []);
  const handleClose = React.useCallback(() => {
    setOpenDialog(false);
  }, []);
  return (
    <>
      <PrivacySection>
        <Grid container>
          <Grid item md={12}>
            <Grid item xs={12} sx={{ pb: 0 }}>
              <Typography variant="h4">{t.keepprivacy}</Typography>
            </Grid>
          </Grid>
          <Grid item md={12} sx={{ pt: 2  , display:'flex'}}>
            <Grid container className="privacyicon">
              <Grid item xs={12} md={4}  className="privacylogo">
                <Logo height="60" width="280" variant="light" />
              </Grid>
              <Grid item xs={6} md={4} mb={5}>
                <HomeEndUserSection
                  title={t.gdpr.title}
                  subtitle={t.gdpr.subtitle}
                >
                  <LegalIcon />
                </HomeEndUserSection>
              </Grid>
              <Grid item xs={6} md={4}>
                <HomeEndUserSection
                  title={t.approach.title}
                  subtitle={t.approach.subtitle}
                >
                  <IconPrivacy />
                </HomeEndUserSection>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PrivacySection>

      <EmailAccount>
        <Grid container>
          <Grid item md={9} xs={12}>
            <Box sx={{ display: 'flex' }}>
              <span className="powericon">
                <PowerIcon />
              </span>
              <Typography variant="h4" >{t.emailAccountHeading}</Typography>
            </Box>
          </Grid>
          <Grid item md={3} xs={12} className="contactbtn">
            <span className="emailbtn">
              <Button variant="light" className="signupbtn" onClick={hadleOpen}>{t.Signupbtn}</Button> 
            </span>
          </Grid>
        </Grid>
      </EmailAccount>

      <EmailPlateform>
        <Typography variant="h4" className="heading">
          {t.emailTitle}
        </Typography>
        <Grid container pt={1}>
          <Grid item md={4} className="ourteambutton">
            <Grid className="ourteambtn" item md={12} sx={{ display: 'flex' }}>
              <Button variant="primary" className="signupbtn" onClick={hadleOpen}>{t.meetOurTeam}</Button>
              <br />
            </Grid>
          </Grid>
          <Grid item md={8}>
            <Grid container>
              <Typography className="ourteamparagraph">
                {t.emailParagraph}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </EmailPlateform>
      <News>
        <div>
          <div>
            <NewsHead>
              <Typography variant="h4"> {t.NewsHeading} </Typography>
            </NewsHead>
          </div>
          <Grid container mt={5}>
            <Grid item sm={12} md={6} lg={6}>
              
            <StyledLink to="/business-email" >
              <NewsCard imgSrc={NewsIntro} title={t.newsTitle} /> 
            </StyledLink>
            </Grid>
            <Grid item sm={12} md={6} lg={6}>
            <StyledLink to="/workflow-engine" >
              <NewsCard imgSrc={NewsManagement} title={t.newsTitle2} />
            </StyledLink>
            </Grid>
          </Grid>
        </div>
      </News>
      
      <InvitationDialog open={openDialog} handleClose={handleClose} />
    </>
  );
});
