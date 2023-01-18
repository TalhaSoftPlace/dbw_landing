import { Box, Grid} from '@mui/material';
import React from 'react';
import { Button } from '..';
import {
  EmailAccount,
  PricingBox,
  StyledGrid,
  Wrapper,
  StyledTypography,
  PricingCheck,
  StyleTypography,
  StyledLink
} from './HomePricing.style';
import { InvitationDialog } from '../../components';
export const HomePricing = React.memo(() => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const hadleOpen = React.useCallback(() => {
    setOpenDialog(true);
  }, []);
  const handleClose = React.useCallback(() => {
    setOpenDialog(false);
  }, []);
  return (
    <Box id="pricing">
      <EmailAccount>
        <Grid container>
          <Grid item md={12} xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                fontWeight: '500',
              }}
              className="limitedtimetext"
            >
              Limited Time Offer!
            </Box>
          </Grid>
        </Grid>
      </EmailAccount>
      <Wrapper sx={{ pt: 3, pb: 3 }} >
        <PricingBox>
          <Grid container>
            <StyledGrid
              item
              lg={5}
              md={6}
              xs={12}
              sx={{ textAlign: 'center', pr: 3 }}
            >
              <Box className="priceBox" >
                <Box className="price">
                  <StyleTypography className="pricesubheading">
                  For the first user in your domain it's
                  </StyleTypography>
                  <StyleTypography className="free">
                    <b>FREE!</b>
                  </StyleTypography>
                  <StyleTypography className="pricesubheading">
                    For each additional user it’s only for
                  </StyleTypography>
                  <StyleTypography className="dollor">3$</StyleTypography>
                  <StyleTypography className="pricesubheading">
                    USER/MONTH
                  </StyleTypography>
                </Box>
                <Button
                  variant="primary"
                  className="btnJoinNow"
                  onClick={hadleOpen}
                >
                 Sign Up Now
                </Button>
              </Box>
            </StyledGrid>
            <Grid item  lg={7} md={6} sm={12}>
              <StyledTypography className="offeredtext">
                Offered in the package:
              </StyledTypography>
              <Grid container className="paragraph">
                <Grid item lg={6} md={6}>
                  <Box sx={{ display: 'flex' }}>
                    <Box>
                      <PricingCheck />
                    </Box>
                    <StyledTypography className>
                      Secure business email with your own domain
                    </StyledTypography>
                  </Box>

                  <Box sx={{ display: 'flex' }}>
                    <Box>
                      <PricingCheck />
                    </Box>
                    <StyledTypography>
                      10 GB storage area for each user
                    </StyledTypography>
                  </Box>

                  <Box sx={{ display: 'flex' }}>
                    <Box>
                      <PricingCheck />
                    </Box>
                    <StyledTypography>Admin Dashboard</StyledTypography>
                  </Box>

                  <Box sx={{ display: 'flex' }}>
                    <Box>
                      <PricingCheck />
                    </Box>
                    <StyledTypography>Calendar</StyledTypography>
                  </Box>

                  <Box sx={{ display: 'flex' }}>
                    <Box>
                      <PricingCheck />
                    </Box>
                    <StyledTypography>Meeting notes</StyledTypography>
                  </Box>
                </Grid>
                <Grid item lg={6} md={6} className="colum2">
                  <Box sx={{ display: 'flex' }}>
                    <Box>
                      <PricingCheck />
                    </Box>
                    <StyledTypography>Workflow</StyledTypography>
                  </Box>

                  <Box sx={{ display: 'flex' }}>
                    <Box> 
                      <PricingCheck />
                    </Box>
                    <StyledTypography>Business Rules</StyledTypography>
                  </Box>

                  <Box sx={{ display: 'flex' }}>
                    <Box>
                      <PricingCheck />
                    </Box>
                    <StyledTypography>Organization Chart</StyledTypography>
                  </Box>

                  <Box sx={{ display: 'flex' }}>
                    <Box>
                      <PricingCheck />
                    </Box>
                    <StyledTypography>Users and Groups</StyledTypography>
                  </Box>

                  <Box sx={{ display: 'flex' }}>
                    <Box>
                      <PricingCheck />
                    </Box>
                    <StyledTypography>Company Settings</StyledTypography>
                  </Box>
                </Grid>
              </Grid>
              <StyledTypography
                sx={{ color: 'text.light !important' }}
                className="endheading"
              >
                Add or remove users at any time and pay monthly
              </StyledTypography>
              
                <StyledTypography
                  className="seeall"
                  sx={{
                    textAlign: 'right',
                    color: 'text.blueLight',
                    pt: 1,
                    pr: 3,
                  }}
                >
                <StyledLink to='/pricing'>  See all Features </StyledLink>
                </StyledTypography>
                
            </Grid>
          </Grid>
        </PricingBox>
      </Wrapper>
      <InvitationDialog open={openDialog} handleClose={handleClose} />
    </Box>
  );
});
