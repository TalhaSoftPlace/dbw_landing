import React, { useState } from 'react';
import { Grid, Typography, Box, CircularProgress } from '@mui/material';
import {
  Wrapper,
  EmailBox,
  HeroWrapper,
  LogoIcon,
  TextFieldStyled,
  MainHeading,

} from './MeetBlueHeroSection.styles';
import { Button } from '../../components';
import EmailBoxIcon from '../../images/meetblueimg.svg';

import { useCreateNewMeeting } from '../../mutations';
import { useCallback } from 'react';
import { openMeeingFromMeetingId } from '../../utils';
import { useAuth } from '../../hooks';

export const MeetBlueHeroSection = React.memo(() => {
  const { mutateAsync: createMeeting, isLoading } = useCreateNewMeeting();
  const { user: { userName } = {} } = useAuth();
  const [meetingId, setMeetingId] = useState('');
  const handleCreateMeetingClick = useCallback(() => {
    createMeeting().then(meetId => {
      openMeeingFromMeetingId({ userName, name: userName, meetingId: meetId });
    });
   
  }, [createMeeting, userName]);

  const handleJoinMeetingClick = useCallback(() => {
    openMeeingFromMeetingId({ userName, name: userName, meetingId });
  }, [meetingId, userName]);

  const handleMeetingIdChange = useCallback(
    e => {
      setMeetingId(e.target.value);
    },
    [setMeetingId]
  );

  return (
    <HeroWrapper>
      <MainHeading>
        <Grid item md={7} lg={6} sm={12} xs={12} className="leftText">
          <Wrapper>
            <Typography variant="h3" mt={6}>
              <LogoIcon /> MeetBlue
            </Typography>
            <Typography variant="h3" pb={2}>
              Real-time video calls. <br />
              Simple, Secure, Fast. <br />
            </Typography>
            <Typography variant="h6">
              Start your next video call with a single click. No <br />
              download plug-in or login is required. Just get <br />
              straight to talking, messaging and sharing your <br /> screen.
            </Typography>
          </Wrapper>
        </Grid>
        <Grid item lg={6} md={5} sm={12}>
          <EmailBox>
            <img alt="DBW" src={EmailBoxIcon} className="emailboxIcon" />
          </EmailBox>
        </Grid>
      </MainHeading>
    
      <Grid className="startmeetingbox">
          <Button
            onClick={handleCreateMeetingClick}
            variant="primary"
            sx={{ width: '100%', height: '48px' }}
          >
            {isLoading ? (
              <CircularProgress size={12} color="inherit" />
            ) : (
              'Start New Meeting'
            )}
          </Button>
        <Box sx={{color:'text.lightgrey' , display:'flex' , justifyContent:'center'}}>or</Box>
        <Box className="btnbox">
          <TextFieldStyled
            autoFocus
            name="title"
            placeholder="Room Id"
            value={meetingId}
            onChange={handleMeetingIdChange}
          />
          <Button
            disabled={!meetingId}
            onClick={handleJoinMeetingClick}
            variant="primary"
            sx={{ width: '200px', height: '48px' }}
          >
            Join
          </Button>
        </Box>
      </Grid>
    </HeroWrapper>
  );
});
