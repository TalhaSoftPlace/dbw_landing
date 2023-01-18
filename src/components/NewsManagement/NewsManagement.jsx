import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import {
  Wrapper,
  EmailBox,
  HeroWrapper,
} from './NewsManagement.styles';
import  newsManagementimage  from '../../images/newsManagementbanner.svg';

export const NewsManagement = React.memo(() => {
  return (
    <HeroWrapper>
      <Grid container spacing={1}>
        <Grid item md={6} lg={6} sm={12} xs={12} mt={4}>
          <Wrapper>
            <Typography variant="h4">Zero Code Workflow Management</Typography>
            <Box mt={2}>
              <Typography variant="p">
                Workflow management is one of the key applications to manage
                your business effectively. It should be user friendly and
                integrated to make a company’s adaptation easier. We have
                designed a simple and intuitive workflow management tool within
                the DeepBlueWork platform that you will use for your mailing,
                calendar and meeting notes etc.
              </Typography>
            </Box>

            <Box mt={2}>
              <Typography variant="p">
                This will enable companies to reduce complications by using our
                cloud-based workflow application. Several basic workflows like
                vacation requests, device purchases, employee on boarding, lead
                generation etc. may become quite complicated if not managed
                properly. We provide a basic and useful workflow management
                application to manage all of the processes that you will need
                from the early stage of your company.
              </Typography>
            </Box>

            <Box mt={2}>
              <Typography variant="p">
                You will be a few steps away from using the DeepBlueWork
                workflow application upon registering for our platform. Once you
                define your organization schema, create users and determine the
                roles of the users, you are ready to design your workflows in 4
                easy steps.
              </Typography>
            </Box>

            <Box mt={2}>
              <Typography variant="p">
                - Define the form <br />
                - Define who will use the form <br />
                - Define an approval mechanism if there is any <br />
                - Define how workflow documents will be listed and viewed
                <br />
              </Typography>
            </Box>
          </Wrapper>
        </Grid>
        <Grid item lg={6} md={6} sm={12}>
          <EmailBox>
            <img 
              alt="DBW"
              src={newsManagementimage}
              className="emailboxIcon"
              width="100%"
            />
          </EmailBox>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={12} lg={12} sm={12} xs={12}>
          <Wrapper>
            <Box>
              <Typography variant="p">
                After starting to use the workflow application, you will notice
                that every process is better controlled and effort required to
                follow up emails, follow up problems and reporting will be
                incredibly reduced.
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography variant="p">
                DeepBlueWork is not only user friendly and intuitive, but also
                very affordable. In other cases, companies choose sub-optimal
                workflow tools to automate their workflow processes, wasting
                significant organizational resources like time and money. Those
                options become complicated as more people start using the
                system.
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography variant="p">
                To make these processes easier, we have integrated our workflow
                application with our email platform. Thus, you will have your
                email and workflow together in a single platform.
              </Typography>
            </Box>
          </Wrapper>
        </Grid>
      </Grid>
    </HeroWrapper>
  );
});
