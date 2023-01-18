import { Box } from '@mui/system';
import React from 'react';

import {
  DialogStyled,
  StyledButton,
  StyleDialogTitle,
} from './SubscriptionionSuccessDialog.styles';
import { DialogContent, Grid, Typography } from '@mui/material';

export const SubscriptionionSuccessDialog = React.memo(
  ({
    title,
    subtitle,
    open,
    handleClose,
    handleDelete,
    deletebtn,
  }) => {
    return (
      <>
        <DialogStyled
          open={open}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
          fullWidth
        >
          <StyleDialogTitle sx={{ pb: 0, pt: '5px' }} >
           {title}
          </StyleDialogTitle>
          <DialogContent sx={{ pt: 0, pb: 0 }}>
            <Box className="dialoguecontent">
              <Typography sx={{ textAlign: 'center' , color:'email.text.primaryText'  }}>{subtitle}</Typography>
              <Grid
                container
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'center',
                  pt: 3,
                }}
              >
                <>
                  {deletebtn && (
                    <StyledButton
                      variant="primary"
                      onClick={handleDelete}
                      className="deletebtn"
                    >
                      {deletebtn}
                    </StyledButton>
                  )}
                </>
                
              </Grid>
            </Box>
          </DialogContent>
        </DialogStyled>
      </>
    );
  }
);
