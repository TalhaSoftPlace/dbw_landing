import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Wrapper, EmailBox, HeroWrapper } from './NewsIntro.styles';
import { ReactComponent as EmailBoxIcon } from '../../images/newsIntrobanner.svg';

export const NewsIntro = React.memo(() => {
  return (
    <HeroWrapper>
      <Grid container spacing={1}>
        <Grid item md={5} lg={5} sm={12} xs={12} mt={4}>
          <Wrapper>
            <Typography variant="h4">
              Introducing the New DeepBlueWork
            </Typography>

            <Typography variant="p">
              A new email integrated workflow platform is on the market for
              business owners… DeepBlueWork.
            </Typography>

            <Box mt={2}>
              <Typography variant="p">
                DeepBlueWork brings us a totally new holistic email experience.
                First of all it’s an all-in-one secure business email package
                with integrated workflow unlike most email providers offer
                today.
              </Typography>
            </Box>

            <Box mt={2}>
              <Typography variant="p">
                DeepBlueWork believes that your emails are your company’s asset.
                It is getting more and more so as it becomes almost the
                exclusive communication channel of business. It is even used as
                evidence in court to resolve business disputes, therefore your
                emails should be handled with care and remain safe. It is also
                an undeniable fact that the market leaders in this field are
                data companies and unfortunately their real business is your
                data. Currently, a few email providers are aware of this dilemma
                and offer encrypted email but they lack a complete business
                structure. This is where DeepBlueWork comes in; A secure email
                platform designed for business with integrated workflow
                management.
              </Typography>
            </Box>
          </Wrapper>
        </Grid>
        <Grid item lg={7} md={7} sm={12}>
          <EmailBox>
            <EmailBoxIcon width="100%" className="emailboxIcon" />
          </EmailBox>
        </Grid>
      </Grid> 
      <Grid container spacing={1}>
        <Grid item md={12} lg={12} sm={12} xs={12}>
          <Wrapper>
            <Box>
              <Typography variant="p">
                DeepBlueWork helps you control your business in a holistic
                manner by managing your internal and external communication
                effectively. Integrated workflow management is a significant
                plus helping business owners maximize the efficiency of in-house
                communication thus reducing delays. User friendly and intuitive
                screens offer a simplified and facilitated workflow creation
                feature. Sharing workflow documents is also one click away. Once
                created, they are listed, shared, presented and approved in a
                very simple manner. The multilevel approval feature in a desired
                order makes the whole process an easy task with one click. Your
                company will continue to benefit immensely from this
                easy-to-reach collection of workflows for years.
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography variant="p">
                In organizing affairs one of the most important tools is the
                calendar. In all email platforms the calendar feature is offered
                with more or less similar features. DeepBlueWork delivers a user
                friendly calendar with a built-in meeting notes feature. You
                won’t need anything else to delegate tasks, keep meeting notes
                and share them other than DeepBlueWork. Upon creation of an
                event all invitees receive invitation emails and are virtually
                included in all features of a meeting. Meeting notes can be
                kept, saved, edited and shared, responsibilities can be assigned
                in the DeepBlueWork platform using effortless screens. Keeping
                all meeting notes in one secure place will also be a great asset
                to your company. You can reach them anytime you need with the
                easy tag search feature in the note list.
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography variant="p">
                Business Rules create an environment where efficiency is the key
                word. Emails from selected domains can be designated a response
                time which will urge you and your team to reply to your
                important customers or business partners on time. No email shall
                remain unanswered! You can also assign avatars to selected
                domains to make them stand out in your inbox which will also
                help separate and categorize your business relations and value
                accordingly. Like other features of DeepBlueWork, Business Rules
                will also provide you more control over your company and your
                business.
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography variant="p">
                You can customize your platform in your dashboard or user
                settings. It is also extremely easy to add new users to your
                domain, build your company’s organization chart and form groups
                in the user friendly Admin Dashboard. Long story short,
                DeepBlueWork will be a great help in improving your business by
                decreasing the need for brainpower and manpower. DeepBlueWork is
                ready when you are!
              </Typography>
            </Box>
          </Wrapper>
        </Grid>
      </Grid>
    </HeroWrapper>
  );
});
