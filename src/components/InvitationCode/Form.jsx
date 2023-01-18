import React, { useCallback } from 'react';
import {
  StyledBackIcon,
  DialogStyled,
  StyledButton,
  StyleDialogTitle,
  TypographyStyled,
} from './InvitationCode.styles';
import {
  DialogContent,
  Grid,
  Typography,
  Box,
  OutlinedInput,
  FormControl,
  CircularProgress,
} from '@mui/material';
import {
  enterToFormikSubmit,
  getErrorsArrayfromFormikErrors,
} from '../../utils';
import { useSnackbar } from 'notistack';

export const Form = React.memo(
  ({
    open,
    handleClose,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    isLoading,
    errors,
  }) => {
    const { enqueueSnackbar } = useSnackbar();
    const hadleNavigate = React.useCallback(() => {
      getErrorsArrayfromFormikErrors(errors).forEach(error => {
        enqueueSnackbar(error, { variant: 'error' });
      });
      handleSubmit();
    }, [enqueueSnackbar, errors, handleSubmit]);

    const handleKeyPress = useCallback(
      e => enterToFormikSubmit(hadleNavigate)(e),
      [hadleNavigate]
    );

    return (
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
              <Box onKeyDown={handleKeyPress} className="dialoguecontent">
                <Typography variant="h4" sx={{ color: 'text.blueLight' }}>
                  Enter Your Invitation Code
                </Typography>
                <TypographyStyled mt={2}>Enter your Code</TypographyStyled>
                <FormControl
                  size="small"
                  sx={{ maxWidth: '450px', width: '100%' }}
                >
                  <OutlinedInput
                    autoFocus
                    variant="outlined"
                    id="inviteCode"
                    name="inviteCode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.inviteCode}
                    type={'text'}
                    placeholder="Enter Code"
                  />
                </FormControl>
                <Grid
                  container
                  sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'center',
                    pt: 3,
                  }}
                >
                  <StyledButton variant="primary" onClick={hadleNavigate}>
                    {isLoading ? (
                      <CircularProgress
                        sx={{ marginRight: '10px' }}
                        size={18}
                        color="inherit"
                      />
                    ) : (
                      <> Submit </>
                    )}
                  </StyledButton>
                </Grid>
              </Box>
            </DialogContent>
          </>
        )}
      </DialogStyled>
    );
  }
);
