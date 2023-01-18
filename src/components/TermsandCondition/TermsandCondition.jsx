import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Wrapper, EmailBox, HeroWrapper } from './TermsandCondition.styles';
import TermsImage from '../../images/terms.png';

export const TermsandCondition = React.memo(() => {
  return (
    <HeroWrapper>
      <Grid container spacing={2}>
        <Grid item md={7} lg={7} sm={12} xs={12} mt={6}>
          <Wrapper>
            <Typography variant="h4">Terms of Services</Typography>
            <Box>
              <Typography mt={4} variant="h5">
                Users
              </Typography>

              <Typography variant="p">
                
                These Terms of Services are binding for all users of the
                www.deepbluework.com website and its present and future
                services. The DeepBlueWork services are provided to be used by
                people only.
              </Typography>
              
            </Box>
            <Typography variant="p" mt={3}>
                
                Robotic and automatic registrations are not permitted and
                accounts created using these methods shall be terminated
                immediately.
              </Typography>

            <Box>
              <Typography mt={4} variant="h5">
                Use of Services
              </Typography>

              <Typography variant="p">
                
                By agreeing to our Terms of Services you agree not to use our
                platform for illegal activities, bullying others, sending spam,
                phishing, junk or bulk mails, mass-mailing without getting the
                consent of the recipients, spreading malware or viruses. Users
                are obliged to use our platform in such a way that will not to
                disturb our system and network. Any abusive accounts in
                violation of our Terms of Services shall be terminated.
              </Typography>
              
            </Box>
            <Typography variant="p" mt={3}>
                Contents of terminated accounts shall not be stored or
                delivered. DeepBlueWork shall not store contents of accounts if
                their storage quota is exceeded.
              </Typography>
              <Typography variant="p" mt={3}>
                
                The maximum size of emails sent is limited to 10 Mb if not
                mentioned otherwise in the corresponding plan description.
                DeepBlueWork reserves the right to change the maximum email size
                limit.
              </Typography>

            <Box>
              <Typography mt={4} variant="h5">
                Liability
              </Typography>

              <Typography variant="p">
                
                DeepBlueWork is not liable for data loss or any damages stemming
                from loss of data or profits related to the functioning of our
                services or their performance deficiency.
              </Typography>
             
            </Box>

            <Typography variant="p" mt={3}>
                
                Users agree that DeepBlueWork is not obligated to recover their
                data if they cannot produce their recovery code since our
                services are encrypted.
              </Typography>
              <Typography variant="p" mt={3}>
                DeepBlueWork is not liable for the actions or data of the users.
              </Typography>

            <Box>
              <Typography mt={4} variant="h5">
                Copyrights
              </Typography>

              <Typography variant="p">
                
                The DeepBlueWork platform is protected in its entirety by
                copyright. It is prohibited to reverse engineer DeepBlueWork
                software or use it for purposes other than for what it was
                intended.
              </Typography>
            </Box>

            <Box>
              <Typography mt={4} variant="h5">
                Payments
              </Typography>

              <Typography variant="p">
                
                Payments are deducted on a monthly basis via the selected method
                of payment by users and are non-refundable. Subscriptions are
                renewed automatically unless terminated by users. Users are
                obliged to keep their payment method information up to date.
              </Typography>
            </Box>
            <Typography variant="p" mt={3}>
                
                DeepBlueWork has the right to terminate accounts making
                counterfeit payments immediately. Also if an account falls
                behind for two consecutive months this gives DeepBlueWork the
                right to suspend or terminate the contract without notice.
              </Typography>
          </Wrapper>
        </Grid>
        <Grid item lg={5} md={5} sm={12}>
          <EmailBox>
            <img 
              alt="DBW"
              src={TermsImage}
              width="100%"
            />
          </EmailBox>
        </Grid>
      </Grid>
    </HeroWrapper>
  );
});
