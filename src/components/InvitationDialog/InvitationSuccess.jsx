import React from 'react';
import {
  StyledBackIcon,
  DialogStyled,
  StyledButton,
  StyleDialogTitle,
  TypographyStyled,
} from './InvitationDialog.styles';
import {
  DialogContent,
  Grid,
  Typography,
  Box,
} from '@mui/material';


export const InvitationSuccess = React.memo(
  ({
    open,
    handleClose,
    setFieldValue ,
  }) => {
    const submit = React.useCallback(() => {
      handleClose();
      setFieldValue('step' , 'generate-code');
    }, [handleClose, setFieldValue]);

    return (
      <>
        <DialogStyled
          open={open}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
          fullWidth
        >
          {open && (
            <>
              <StyleDialogTitle sx={{ pb: 0, pt: '5px' }}>
                <Box onClick={handleClose} sx={{ cursor: 'pointer' }}>
                  <StyledBackIcon />
                  Back
                </Box>
              </StyleDialogTitle>
              <DialogContent sx={{ pt: 0, pb: 4 }}>
                <Box className="dialoguecontent">
                  <Typography variant="h4" sx={{ color: 'text.blueLight' }}>
                  Thank you for registering!
                  </Typography>
                  <TypographyStyled mt={2} sx={{ textAlign: 'center', pb: 3 }}>
                  You are now in the waiting list.
                  </TypographyStyled>
                  <Grid
                    container
                    sx={{
                      display: 'flex',
                      gap: 2,
                      justifyContent: 'center',
                      pt: 1,
                    }}
                  >
                    <StyledButton variant="primary" onClick={submit}>
                      OK
                    </StyledButton>
                  </Grid>
                </Box>
              </DialogContent>
            </>
          )}
        </DialogStyled>
      </>
    );
  }
);
