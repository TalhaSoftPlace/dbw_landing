import { Grid, Typography, Box } from '@mui/material';
import React, { useMemo, useCallback } from 'react';
import { Logo } from '../Logo';
import {
  Footer,
  FooterHead,
  StyledLink,
  StyledMenu,
  LinkStyled,
} from '../HomeFooter/HomeFooter.styles';
// import { ChatwootWidget } from '../../components/Chatwoot/Chatwoot';
import { useLocalization } from './../../hooks';
export const HomeFooter = React.memo(() => {
  const { t } = useLocalization();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = useMemo(() => !!anchorEl, [anchorEl]);
  const handleClick = useCallback(event => {
    setAnchorEl(event?.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const userfilterfolder = useMemo(() => {
    return (
      <StyledMenu
        id="checkbox-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'checkbox-button',
        }}
        className="commingsoom"
      >
        <Logo variant="dark" />
        <Box sx={{ fontSize: '20px', textAlign: 'center' }}>Coming Soon!</Box>
      </StyledMenu>
    );
  }, [anchorEl, handleClose, open]);
  return (
    <>
      <Footer>
        <Grid container>
          <Grid item xs={6} sm={6} md lg sx={{ p: 1 }}>
            <div className="heading">
              <FooterHead variant="h6">
                {t.footerHeadDeepBlueWorkMail}
              </FooterHead>
            </div>
            <Typography mb={1}>
              <StyledLink to="/pricing">{t.Pricing}</StyledLink>
            </Typography>
            <Typography mb={1}>
              <StyledLink to="/privacy">{t.Privacy}</StyledLink>
            </Typography>
            <Typography mb={1}>
              <StyledLink to="/feedback"> Feedback</StyledLink>
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md lg sx={{ p: 1 }}>
            <div className="heading">
              <FooterHead variant="h6">{t.footerHeadFeatures}</FooterHead>
            </div>
            <Typography mb={1}>
              <StyledLink to="/business-email"> {t.BusinessEmail}</StyledLink>
            </Typography>
            <Typography mb={1}>
              <StyledLink to="/workflow-engine">{t.workFlow}</StyledLink>
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md lg sx={{ p: 1 }}>
            <div className="heading">
              <FooterHead variant="h6">{t.footerHeadLegal}</FooterHead>
            </div>
            <Typography mb={1}>
              <StyledLink to="/privacy">{t.PrivacyPolicy}</StyledLink>
            </Typography>
            <Typography mb={1}>
              <StyledLink to="/terms">{t.TermsConditions}</StyledLink>
            </Typography>
            <Typography mb={1}>
              <StyledLink to="/feedback">{t.ReportAbuse}</StyledLink>
            </Typography>
            <Typography mb={1}>
              <StyledLink to="/privacy">{t.GDPRCompliance}</StyledLink>
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md lg sx={{ p: 1 }}>
            <div className="heading">
              <FooterHead variant="h6">{t.footerHeadCompany}</FooterHead>
            </div>

            <Typography
              mb={1}
              id="checkbox-button"
              aria-controls={open ? 'checkbox-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ cursor: 'pointer' }}
            >
              {t.Careers}
            </Typography>

            <Typography
              mb={1}
              id="checkbox-button"
              aria-controls={open ? 'checkbox-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ cursor: 'pointer' }}
            >
              {t.partners}
            </Typography>

            {userfilterfolder}
          </Grid>
          <Grid item xs={6} sm={6} md lg sx={{ p: 1 }}>
            <div className="heading">
              <FooterHead variant="h6">{t.FooterHeadSocial}</FooterHead>
            </div>
            <Typography
              mb={1}
              id="checkbox-button"
              aria-controls={open ? 'checkbox-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ cursor: 'pointer' }}
            >
              {t.Facebook}
            </Typography>

            <Typography mb={1} sx={{ cursor: 'pointer' }}>
              <LinkStyled
                href="https://twitter.com/DeepBlueWork"
                target="_blank"
                rel="noreferrer"
              >
                {t.Twitter}
              </LinkStyled>
            </Typography>
            <Typography mb={1} sx={{ cursor: 'pointer' }}>
              <LinkStyled
                href="https://www.linkedin.com/company/86391718/admin/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </LinkStyled>
            </Typography>
            <Typography mb={1} sx={{ cursor: 'pointer' }}>
              <LinkStyled
                href="https://www.instagram.com/deepbluework/"
                target="_blank"
                rel="noreferrer"
              >
                {t.Instagram}
              </LinkStyled>
            </Typography>
            <Typography mb={1} sx={{ cursor: 'pointer' }}>
              <LinkStyled
                href="https://www.youtube.com/channel/UCij1ft21S-24hWKRVuROBLg"
                target="_blank"
                rel="noreferrer"
              >
                Youtube
              </LinkStyled>
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item className="right-reserved">
            <Typography>{t.rightReserved}</Typography>
          </Grid>
        </Grid>
      </Footer>
      {/* <ChatwootWidget /> */}
    </>
  );
});
