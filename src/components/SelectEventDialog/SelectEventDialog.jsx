import { DialogContent, Grid, Typography, Paper, Box } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { Customtoolbar } from './notetoolbar';
import { DataTable } from './DataTable';

import {
  CloseIconStyled,
  DialogStyled,
  DialogTitleStyled,
} from './SelectEventDialog.styles';

export const SelectEventDialog = React.memo(({ dialogOpen, handleClose ,date,dateChanged,components }) => {
  const handleDialogClose = useCallback(() => {
    handleClose();
  }, [handleClose]);

  const dialogHeader = useMemo(() => {
    return (
      <>
        <Box>
          <Typography className="tagHeading">
            Select an Event To Write Meeting Notes
          </Typography>
        </Box>
        <br />
      </>
    );
  }, []);

  return (
    <DialogStyled
      open={dialogOpen}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        style: {
          height: '530px',
        },
      }}
      className="dialogbox"
    >
      <Box sx={{ pb: 0, pt: 1, pr: 1 }}>
        <CloseIconStyled onClick={handleDialogClose} />
      </Box>
      <DialogTitleStyled sx={{ pb: 0, pt: 0, pl: 3, pr: 3 }}>
        {dialogHeader}
      </DialogTitleStyled>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item sm={12} className="notespopupbox">
            <Customtoolbar dates={date} dateChanged={dateChanged} components={components}   />
            <Grid item sm={12}>
              <Box sx={{ mt: 2 }}>
                <Paper
                  elevation={3}
                  sx={{
                    height: 340,
                    overflow: 'scroll',
                    borderRadius: '7px',
                  }}
                  className="notesdata"
                >
                  <Box className="notesbox">
                    <DataTable onClose={handleDialogClose} />
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </DialogStyled>
  );
});
