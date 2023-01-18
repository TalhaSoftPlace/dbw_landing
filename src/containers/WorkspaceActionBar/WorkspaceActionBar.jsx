import { Box, Grid } from '@mui/material';
import React, { useCallback } from 'react';
import { Wrapper } from './WorkspaceActionBar.style';
import { v4 as uuidv4 } from 'uuid';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import {
  WorkspaceActionPagination,
  Button,
  MailBoxSearchBar,
} from '../../components';
import { useSnackbar } from 'notistack';
import { useSetRecoilState } from 'recoil';
import { composeEmailQueueAtom } from '../../atoms';
import { useLocalization } from '../../hooks';

export const WorkspaceActionBar = React.memo(() => {
  const setComposeEmailsQueue = useSetRecoilState(composeEmailQueueAtom);
  const { enqueueSnackbar } = useSnackbar();
  const composeEmail = useCallback(() => {
    const newCompose = { id: uuidv4(), to: [] };
    setComposeEmailsQueue((queue) => {
      if (queue.length < 2) {
        return [...queue, newCompose];
      } else {
        enqueueSnackbar('You can not compose more then 2 emails at a time.', {
          variant: 'error',
        });
        return queue;
      }
    });
  }, [enqueueSnackbar, setComposeEmailsQueue]);


  const { t } = useLocalization();
  return (
    <Wrapper>
      <Grid container className="workspaceactionbar">
            <Button
              onClick={composeEmail}
              className="new"
              variant="primary"
              texttransform="none"
            >
              <RateReviewOutlinedIcon size="small" /> &nbsp;&nbsp;{t.container.workspaceActionBar.newEmailBtn}
            </Button>
          
          <Box sx={{flex:'auto'}}>
            <MailBoxSearchBar /> 
          </Box>
        <Box
          sx={{
            pl:1,
            display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' },
          }}
        >
          <WorkspaceActionPagination />
        </Box>
      </Grid>
    </Wrapper>
  );
});
