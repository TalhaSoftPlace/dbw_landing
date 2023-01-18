import { Box } from '@mui/system';
import React from 'react';

import {
  StyledBackIcon,
  DialogStyled,
  StyledButton,
  StyleDialogTitle,
} from './ConfirmationDialog.styles';
import { DialogContent, Grid, Typography } from '@mui/material';
import { useLocalization } from '../../hooks';

export const ConfirmationDialog = React.memo(
  ({
    title,
    subtitle,
    children,
    open,
    disabledAction = false,
    handleClose,
    handleDelete,
    deletebtn,
    cancelbtn,
    dangerbtn,
    successbtn,
  }) => {
    const { t } = useLocalization();
    return (
      <>
        <DialogStyled
          open={open}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
          fullWidth
        >
          <StyleDialogTitle sx={{ pb: 0, pt: '5px' }}>
            <Box onClick={handleClose} sx={{ cursor: 'pointer' }}>
              <StyledBackIcon />
              {t.back}
            </Box>
          </StyleDialogTitle>
          <DialogContent sx={{ pt: 0, pb: 0 }}>
            <Box className="dialoguecontent">
              {children}
              <Typography sx={{ textAlign: 'center' , color:'text.primaryText' }} variant="h5" >
                {title}
              </Typography>
              <Typography sx={{ textAlign: 'center',color:'text.primaryText' }}>{subtitle}</Typography>
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
                  {cancelbtn && (
                    <StyledButton variant="primaryGrey" onClick={handleClose}>
                      {cancelbtn}
                    </StyledButton>
                  )}
                </>
                <>
                  {deletebtn && (
                    <StyledButton
                      disabled={disabledAction}
                      variant="primary"
                      onClick={handleDelete}
                      className="deletebtn"
                    >
                      {deletebtn}
                    </StyledButton>
                  )}
                </>
                <>
                  {dangerbtn && (
                    <StyledButton
                      variant="danger"
                      disabled={disabledAction}
                      onClick={handleDelete}
                      className="deletebtn"
                    >
                      {dangerbtn}
                    </StyledButton>
                  )}
                </>
                <>
                  {successbtn && (
                    <StyledButton
                      variant="success"
                      onClick={handleClose}
                      className="deletebtn"
                    >
                      {successbtn}
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
