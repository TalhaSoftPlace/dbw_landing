import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Wrapper, EmailBox, HeroWrapper } from './PrivacyPolicy.styles';
import EmailBoxIcon  from '../../images/PrivacyPolicyist.png';
import { ReactComponent as PrivacyIcontwo } from '../../images/PrivacyPolicy2nd.svg';

export const PrivacyPolicy = React.memo(() => {
 
  return (
    <HeroWrapper>
      
        <Grid container spacing={2}>
          <Grid item md={6} lg={6} sm={12} xs={12} mt={6}>
            <Wrapper>
              <Typography variant="h4">Our Privacy Policy <br /> 
              <span className="subheading"> October 2022 </span> </Typography>

              <Typography variant="p"> Our concern is to protect your business and personal information, not to sell it to the highest bidder from the advertising industry.</Typography>
              
              <Typography mt={2} variant="h5">
              Our commitments:
              </Typography>
              <Box>
                <Typography mt={2} variant="h5">1. Personal Information </Typography>
                <Typography variant="p"> You do not have to enter any personal information during signup.</Typography>
              </Box>

              <Box>
                <Typography mt={2} variant="h5">2. User Data </Typography>
                <Typography variant="p"> We do not collect user data, nor do we possess traffic data connected to any accounts. Processes and functions are always conceived with the principle of data-efficiency. 
              </Typography>
              </Box>

             

              <Box>
                <Typography mt={2} variant="h5">3. Data Fundamentals </Typography>
                <Typography variant="p"> Accessing your data fundamentally occurs with encryption. (TLS with PFS for IMAP, POP3, webmail, CardDAV and CalDAV). </Typography>
              </Box>

              <Box>
                <Typography mt={2} variant="h5">4. Protection</Typography>
                <Typography variant="p"> Protects emails and metadata during transmission, as long as the other email server also supports it (TLS with PFS). </Typography>
              </Box>

              
              
              <Box>
                <Typography mt={2} variant="h5">5. Security Features</Typography>
                <Typography variant="p"> This security feature protects you from sending emails to insecure systems. If you activate the TLS-sending guarantee, 
              we will only send your email if it can be sent to the recipient over an encrypted connection. Otherwise, the email will not be sent and you will receive a 
              notification from us.</Typography>
              </Box>
                 
              <Box>
                <Typography mt={2} variant="h5">6. Saved Data</Typography>
                <Typography variant="p"> Encrypts all saved email data (content, attachments and metadata) at the click of a button. </Typography>
              </Box>   
                  
            </Wrapper>
          </Grid>
          <Grid item lg={6} md={6} sm={12}>
              <EmailBox>
                <img
              alt="DBW"
              src={EmailBoxIcon}
              className="emailboxIcon"
            />
              </EmailBox>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
        <Grid item lg={5} md={5} sm={12}  sx={{mt:2}}>
            <EmailBox>
                <PrivacyIcontwo width="100%" className="emailboxIcon" />
            </EmailBox>
        </Grid>
          <Grid item md={7} lg={7} sm={12} xs={12} mt={4}>
           
            <Wrapper>
              <Box>
                <Typography mt={2} variant="h5"> 7. Processing Payments </Typography>
                <Typography variant="p">  We are processing payments through secure Stripe payment gateway, some of your data will be passed to the respective 
            payment gateway including information required to process or support the payment, such as the purchase total and your customer’s billing information. 
            All communication between payment gateway is encrypted.
            </Typography>
              </Box>
              <Box>
                <Typography mt={2} variant="h5">8. Data Trade</Typography>
                <Typography variant="p"> No data trade or circulation (unless required by law) 
              </Typography>
              </Box>
              <Box>
                <Typography mt={2} variant="h5">9. Backups </Typography>
                <Typography variant="p"> We undertake daily backups of all accounts and retain these for seven days. </Typography>
              </Box>

              <Box>
                <Typography mt={2} variant="h5">10. Spam and Virus </Typography>
                <Typography variant="p">Highly efficient spam and virus filter  </Typography>
              </Box>

              <Box>
                <Typography mt={2} variant="h5">11. Data Centre</Typography>
                <Typography variant="p"> Servers located in a highly secure German data centre </Typography>
              </Box>

              
              
              <Box>
                <Typography mt={2} variant="h5">12. Tracking</Typography>
                <Typography variant="p"> No use of tracking tools </Typography>
              </Box>
                 
              <Box>
                <Typography mt={2} variant="h5">13. Encryption</Typography>
                <Typography variant="p">  The encryption we use at DeepBlueWork satisfies these requirements while 
            giving organizations total control over their data. Unlike other cloud email services, you can be sure that neither we nor anyone 
            else can see the contents of your emails — even if there is a breach of our servers. We can make this guarantee thanks to 
            our implementation of end-to-end encryption, which protects your organization’s internal email communications. </Typography>
              </Box>   

              <Box>
                <Typography mt={2} variant="h5">14. Privacy Regulations</Typography>
                <Typography variant="p">  Privacy regulations aside, encrypted email is a common-sense tool that more businesses are adopting to defend 
            against cyber attacks and to keep sensitive information safe. By combining email encryption with a cloud hosted service, 
            DeepBlueWork provides the best of both worlds. You can benefit from the reliability and cost savings of the cloud, while 
            simultaneously maintaining control over your data. From the user’s perspective, DeepBlueWork works just like an unencrypted email 
            service, with modern inbox design. There’s no learning curve because all the encryption takes place automatically behind the scenes.  </Typography>
              </Box> 

              <Box>
                <Typography mt={2} variant="h5">15. Trust and Security</Typography>
                <Typography variant="p"> It’s important to work with trustworthy and security-conscious service providers to limit your liability under 
            the GDPR, and in this regard DeepBlueWork can help protect your organization and your customers. Now more 
            than ever, customers want to know that you are taking the appropriate steps to protect their data, and encrypted email helps reduce 
            the risk of being fined or worse: being in the headlines for a catastrophic data breach. </Typography>
              </Box> 
                  
            </Wrapper>
          </Grid>
          
        </Grid>
    </HeroWrapper>
  );
});
