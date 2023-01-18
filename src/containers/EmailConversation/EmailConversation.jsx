import React from 'react';
import {
  Avatar,
  Box,
  ListItemAvatar,
  ListItemText,
  Typography,
  Grid,
} from '@mui/material';
import { RightWrapper, StyledList, StyledListItem } from './EmailConversation.styles';
import { ListActions } from './ListActions';
import { ListFilter } from './ListFilters';

const items = [
  {
    subject: 'DeepBlueWork (administrator@deepbluework.com)',
    To: 'To: info@techizer.net',
    BBC : 'Bcc: support@techizer.net; hr@techizer.net',
    content: 'Before verifying your e-mail address, if you have more than one Microsoft account or work account, please ensure you are signed in.',
  },
  {
    subject: 'DeepBlueWork (administrator@deepbluework.com)',
    To: 'To: info@techizer.net',
    BBC : 'Bcc: support@techizer.net; hr@techizer.net',
    content: 'Before verifying your e-mail address, if you have more than one Microsoft account or work account, please ensure you are signed in.',
    sender : true,
  },
  {
    subject: 'DeepBlueWork (administrator@deepbluework.com)',
    To: 'To: info@techizer.net',
    BBC : 'Bcc: support@techizer.net; hr@techizer.net',
    content: 'Before verifying your e-mail address, if you have more than one Microsoft account or work account, please ensure you are signed in.',
  },
  {
    subject: 'DeepBlueWork (administrator@deepbluework.com)',
    To: 'To: info@techizer.net',
    BBC : 'Bcc: support@techizer.net; hr@techizer.net',
    content: 'Before verifying your e-mail address, if you have more than one Microsoft account or work account, please ensure you are signed in.',
    sender : true,
  },
  {
    subject: 'DeepBlueWork (administrator@deepbluework.com)',
    To: 'To: info@techizer.net',
    BBC : 'Bcc: support@techizer.net; hr@techizer.net',
    content: 'Before verifying your e-mail address, if you have more than one Microsoft account or work account, please ensure you are signed in.',
  },
  
];

export const EmailConversation = React.memo(() => {
  return (
    <StyledList>
      <ListFilter />
      {items.map((item , index) => (
          <StyledListItem
            key={index}
            variant={!item.sender ? 'reciever' : 'sender'}
            sender={item.sender}
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="" />
            </ListItemAvatar>
            <ListItemText
              sx={{ margin: 0 }}
              primary={
                <Grid container className='primaryheader'>
                  <Grid item xs={5} md={6}>
                  <Typography  className='conversationtext'
                  sx={{ display: 'inline' }}
                  component="span"
                  color='text.lightgrey'
                >
                  {item.subject}
                </Typography>
                  </Grid>
                  <Grid item xs={7} md={6}>
                  <RightWrapper>
                    <Box>
                      <ListActions />
                    </Box>
                  </RightWrapper>
                  </Grid>
                </Grid>
              }
              secondary={
                <Box>
                  <Grid container >
                <Grid item  md={4 } lg={5} xl={3}>
                <Typography component="span" sx={{ display: 'block' }}>
                  <Typography
                    color='text.greyLight'
                    component="span"
                    className='conversationtext'
                  > 
                    {item.To}  
                  </Typography>
                  
                </Typography>
                </Grid>
                <Grid item md={8} lg={7} xl={9}>
                <Typography component="span" sx={{ display: 'block' }}>
                  <Typography
                    color='text.greyLight'
                    component="span"
                    className='conversationtext'
                  > 
                     {item.BBC}
                  </Typography>
                </Typography>
                </Grid>
              </Grid>
              <Typography component="span" sx={{ display: 'block' }}>
                  <Typography color="text.lightgrey" component="span" className='conversationtext'>
                    {item.content}
                  </Typography>
                </Typography>
                </Box>
                
              }
            />
            
          </StyledListItem>
      ))}
    </StyledList>
  );
});
