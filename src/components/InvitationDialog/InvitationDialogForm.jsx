import React, { useCallback } from 'react';
import {
  StyledBackIcon,
  DialogStyled,
  StyledButton,
  StyleDialogTitle,
  TypographyStyled,
  LogoIcon,
} from './InvitationDialog.styles';
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

import { useGenerateInvitationCode } from '../../mutations';
export const InvitationDialogForm = React.memo(
  ({
    open,
    handleClose,
    handleChange,
    dialogOpen,
    values,
    handleBlur,
    setFieldValue,
    errors,
  }) => {
    const { enqueueSnackbar } = useSnackbar();

    const { mutateAsync: addEmail, isLoading } = useGenerateInvitationCode();
    const { username } = values;
    const handleCloseDialog = useCallback(() =>{
      setTimeout(() => setFieldValue('step', 'generate-code') , 1000 );
      handleClose();
    },[handleClose, setFieldValue]);
    const handleSubmit = useCallback(
      values => {
        addEmail({
          userEmail: username,
        }).then(() => {
          setFieldValue('step', 'success');
          setTimeout(() => handleCloseDialog() , 5000 );
          setFieldValue('username' , '');
        });
      },
      [addEmail, handleCloseDialog, setFieldValue, username]
    );

    const submit = React.useCallback(() => {
      getErrorsArrayfromFormikErrors(errors).forEach(error => {
        enqueueSnackbar(error, { variant: 'error' });
      });
      if (!errors.username) {
        handleSubmit();
      }
    }, [enqueueSnackbar, errors, handleSubmit]);

    const handleKeyPress = useCallback(e => enterToFormikSubmit(submit)(e), [
      submit,
    ]);

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
                <Box onKeyDown={handleKeyPress} className="dialoguecontent">
                  <Typography variant="h4" sx={{ color: 'text.blueLight' }}>
                    Welcome On Board!
                  </Typography>
                  <TypographyStyled mt={2} sx={{ textAlign: 'center', pb: 3 }}>
                    We are happy to announce that the DeepBlueWork is now
                    available for beta users.
                    <br /> Join our waitlist to receive your invitation code.
                  </TypographyStyled>
                  <FormControl
                    size="small"
                    sx={{ maxWidth: '450px', width: '100%' }}
                  >
                    <OutlinedInput
                      autoFocus
                      variant="outlined"
                      id="username"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      type={'text'}
                      placeholder="Enter your email"
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
                    <StyledButton variant="primary" onClick={submit}>
                      {isLoading ? (
                        <CircularProgress
                          sx={{ marginRight: '10px' }}
                          size={18}
                          color="inherit"
                        />
                      ) : (
                        <> OK </>
                      )}
                    </StyledButton>
                  </Grid>
                  <Box sx={{ display: 'flex' }}>
                    <LogoIcon />
                    <TypographyStyled
                      mt={2}
                      sx={{ color: 'text.blueLight', cursor: 'pointer' }}
                      onClick={dialogOpen}
                    >
                      <u>I already have my invitation code</u>
                    </TypographyStyled>
                  </Box>
                </Box>
              </DialogContent>
            </>
          )}
        </DialogStyled>
      </>
    );
  }
);
