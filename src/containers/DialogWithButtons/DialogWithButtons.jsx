import { Box } from '@mui/system';
import React from 'react';

import {
  StyledBackIcon,
  DialogStyled,
  StyledButton,
  StyleDialogTitle,
} from './DialogWithButtons.styles';
import { DialogContent, Grid, Typography } from '@mui/material';
import { useLocalization } from '../../hooks';
import Checkbox from '@mui/material/Checkbox';
export const DialogWithButtons = React.memo(
  ({
    title,
    subtitle,
    open,
    disabledAction = false,
    children,
    onClose,
    handleDanger,
    handleSccuess,
    handleCancel,
    dangerText,
    cancelText,
    sccuessText,
    onChange,
    checkboxValue,
    occrance,
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
            <Box onClick={onClose} sx={{ cursor: 'pointer' }}>
              <StyledBackIcon />
              {t.back}
            </Box>
          </StyleDialogTitle>
          <DialogContent sx={{ pt: 0, pb: 0 }}>
            <Box className="dialoguecontent">
              <Box sx={{ textAlign: 'center' , width:'100%' , color:'text.primaryText'  }}>
              {children}
              <Typography sx={{ textAlign: 'center' , width:'100%'  }} variant="h5">
                {title}
              </Typography>
              <Typography sx={{ textAlign: 'center' , width:'100%'  }}>{subtitle}</Typography>
              </Box>
              {occrance && (
                <Box sx={{ textAlign: 'left', color:'text.primaryText' }}>
                  <Checkbox
                    checked={checkboxValue}
                    onChange={onChange}
                    size="medium"
                  />All occurrences
                </Box>
              )}
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
                  {handleCancel && (
                    <StyledButton variant="primaryGrey" onClick={handleCancel}>
                      {cancelText}
                    </StyledButton>
                  )}
                </>
                <>
                  {handleDanger && (
                    <StyledButton
                      variant="danger"
                      disabled={disabledAction}
                      onClick={handleDanger}
                      className="deletebtn"
                    >
                      {dangerText}
                    </StyledButton>
                  )}
                </>
                <>
                  {handleSccuess && (
                    <StyledButton
                      variant="success"
                      onClick={handleSccuess}
                      className="deletebtn"
                    >
                      {sccuessText}
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
