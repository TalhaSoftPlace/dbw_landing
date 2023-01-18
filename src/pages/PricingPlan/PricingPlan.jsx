import React from 'react';
import { Container, Box, Grid } from '@mui/material';
import { HomeNavbar } from '../../containers';
import { Button, PricingCard  , InvitationDialog , WithBGIcons , HomeFooter, HomeAdressSection,} from '../../components';
import {
  Background,
  PricingHeader,
  PricingBody,
  PricingSubHeading,
  StyledText,
  Styledspan,
} from './PricingPlan.style';
import { homeNavItems } from '../../constants';
import { useWindowResize } from '../../hooks';
import { useTheme } from '@mui/material';

const calendarData = [
  {
    title: 'Calendar',
    body: [
      {
        item: 'Intuitive event creation',
      },
      {
        item: 'Sending and receiving invitations',
      },
      {
        item: 'Event reminder email and notification',
      },
      {
        item: 'Integrated meeting notes',
      },

    ],
  },
];
const workflowData = [
  {
    title: 'Workflow',
    body: [
      {
        item: 'Integrated Workflow management',
      },
      {
        item: 'User friendly workflow creation',
      },
      {
        item: 'Unlimited number of workflows',
      },
      {
        item: 'Multi level workflow approvals',
      },
    ],
  },
];
const adminData = [
  {
    title: 'Admin Dashboard',
    body: [
      {
        item: 'Improved internal and external communication',
      },
      {
        item: 'User and group creation and management',
      },
      {
        item: 'Organization chart',
      },
      {
        item: 'Company settings',
      },
      {
        item: 'Workflow document creation and management',
      },
      {
        item: 'Business rules',
      },
      {
        item: 'Storage quota use monitoring',
      },
      
    ],
  },
];

const businessRuleData = [
  {
    

    title: 'Business Rules',
    body: [
      {
        item: 'Email reply time monitoring',
      },
      {
        item: 'Assigning avatars to selected domains',
      },
      
    ],
  },
];
const meetingNotesData = [
  {
    
    title: 'Meeting Notes',
    body: [
      {
        item: 'Built-in, ready to use',
      },
      {
        item: 'Intuitive and easy note keeping',
      },
      {
        item: 'Integrated with your calendar',
      },
      {
        item: 'One button sharing by email',
      },
   
    ],
  },
];
const meetBlueData = [
  {
    
    title: 'Meet Blue',
    body: [
      {
        item: 'Browser based virtual meetings',
      },
      {
        item: 'No installations and setups required',
      },
      {
        item: 'File, screen and video sharing',
      },
      {
        item: 'Private messaging and chat',
      },
      {
        item: 'White board feature',
      },
   
    ],
  },
];

const emailData = [
  {
    title: 'Email',
    body: [
      {
        item: 'Secure Business Email',
      },
      {
        item: 'Custom domain ',
      },
      {
        item: 'Commercial Free',
      },
      {
        item: 'Encrypted messaging and protected data',
      },
      {
        item: '10 MB attachment size',
      },
      {
        item: 'Quick reply feature',
      },
      {
        item: 'Folder creation',
      },
      {
        item: 'Email response time progress bar',
      },
      {
        item: 'Storage quota use percentage monitor',
      },
      {
        item: 'HTML signatures',
      },
      {
        item: 'Auto reply feature',
      },
      {
        item: 'Integration with workflow and calendar',
      },
      {
        item: 'Send/Receive invitations and reminders',
      },
      {
        item: 'Integrated notification feature',
      },
      {
        item: 'User Rules',
      },
      {
        item: 'Email group creation',
      },
      {
        item:'Avatar and color assignment ',
      }
    ],
  },
];



export const PricingPlan = () => {
  const winSize = useWindowResize();
  const muiTheme = useTheme();
  
  const [openDialog, setOpenDialog] = React.useState(false);
  const hadleOpen = React.useCallback(() => {
    setOpenDialog(true);
  }, []);
  const handleClose = React.useCallback(() => {
    setOpenDialog(false);
  }, []);

  return (
    <>
      <Background>
        <HomeNavbar pages={homeNavItems} />
        <Container maxWidth="1500px !important">
            <WithBGIcons
                size={winSize.width > muiTheme.breakpoints.values.sm ? 12 : 0}
              >
                  <PricingHeader sx={{textAlign: 'center', widht:'100%'}}>
                    Limited Time Offer!
                  </PricingHeader>
                  <PricingBody sx={{pb:5 , mb:3}}>
                    <PricingSubHeading sx={{pt:2, pb:2}}>
                    For the first user in your domain it's <StyledText> FREE! </StyledText> For each
                      additional user it’s only for <Styledspan> 3$ </Styledspan>
                      user/month
                    </PricingSubHeading>
                    <Box sx={{ display: 'flex', justifyContent: 'center' , mb:2}}>
                      <Button variant="primary" className="join-nowbtn" onClick={hadleOpen}>
                        Sign Up Now
                      </Button>
                    </Box>
                    <Grid container spacing={1} sx={{mb:2}} >
                      {emailData.map((item, key) => {
                        return (
                          <Grid item lg={4} md={6} sm={12} key={key + item} sx={{width:'100%'}}>
                            <PricingCard data={item.body} title={item.title} />
                          </Grid>
                        );
                      })}
                      <Grid item lg={4} md={6} sm={12} sx={{width:'100%'}}>
                    {calendarData.map((item, key) => {
                        return (
                          <Box key={key + item}>
                            <PricingCard data={item.body} title={item.title} />
                          </Box>
                        );
                    })}    
                    {meetingNotesData.map((item, key) => {
                        return (
                          <Box key={key + item}>
                            <PricingCard data={item.body} title={item.title} />
                          </Box>
                        );
                      })}
                      
                      {meetBlueData.map((item, key) => {
                        return (
                          <Box key={key + item}>
                            <PricingCard data={item.body} title={item.title} />
                          </Box>
                        );
                      })}
                    </Grid>
                    <Grid item lg={4} md={6} sm={12}>
                    {adminData.map((item, key) => {
                        return (
                          <Box key={key + item}>
                            <PricingCard data={item.body} title={item.title} />
                          </Box>
                        );
                      })}
                      {workflowData.map((item, key) => {
                        return (
                          <Box key={key + item}>
                            <PricingCard data={item.body} title={item.title} />
                          </Box>
                        );
                      })}

                      {businessRuleData.map((item, key) => {
                        return (
                          <Box key={key + item}>
                            <PricingCard data={item.body} title={item.title} />
                          </Box>
                        );
                      })}
                      
                      
                    </Grid>
                    
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center' , pt:1}}>
                      <Button variant="primary" className="join-nowbtn" onClick={hadleOpen}>
                        Sign Up Now
                      </Button>
                    </Box>
                  </PricingBody>
            </WithBGIcons>
          </Container>
          <HomeAdressSection />
          <HomeFooter />
      
        
      <InvitationDialog open={openDialog} handleClose={handleClose} />
      </Background>
    </>
  );
};
