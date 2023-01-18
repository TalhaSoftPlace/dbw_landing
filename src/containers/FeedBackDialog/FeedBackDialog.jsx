import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { FeedbackForm } from './FeedbackForm';
import {
  StyledBackIcon,
  DialogStyled,
  StyleDialogTitle,
  Wrapper,
  SuccessIcon
} from './FeedBackDialog.styles';
import { DialogContent, Box } from '@mui/material';
import { useSendFeedbackMutation } from '../../mutations';
import { useAuth } from '../../hooks';
import { feedBackSchema } from './validation.schema';
import { ConfirmationDialog } from '../../containers';
import { useLocalization } from '../../hooks';
export const FeedBackDialog = React.memo(({ open, handleClose }) => {
  const { user } = useAuth();
  const { mutateAsync: sendFeedback, isSuccess } = useSendFeedbackMutation();
  const { t } = useLocalization();
  const initialValues = {
    category: 'category',
    feedbacknote: '',
    userEmail: user?.username,
  };

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleCloseDialog = React.useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleOpen = useCallback((row) => {
    setOpenDialog(true);
  }, []);

  const handleNavigate = useCallback(() => {
    setOpenDialog(false);
    handleClose();
  },[handleClose]);

  const handleFeedback = useCallback(
    values => {
      sendFeedback({
        category: values?.category,
        feedback: values?.feedbacknote,
        userEmail: user?.userName,
      }).then(() => {
        handleOpen();
      });
    },
    [handleOpen, sendFeedback, user?.userName]
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
              {t.container.feedbackDialog.backIcon}
            </Box>
          </StyleDialogTitle>
          <DialogContent sx={{ pt: 0, pb: 4 }}>
            <Wrapper>
              <Formik
                initialValues={initialValues}
                onSubmit={handleFeedback}
                validationSchema={feedBackSchema}
                validateOnMount
              >
                {props => <FeedbackForm {...props} isLoading={isSuccess} />}
              </Formik>
            </Wrapper>
            <ConfirmationDialog
      title={"Thank you for your feedback"}
      subtitle=""
        open={openDialog}
        handleClose={handleCloseDialog}
        handleDelete={handleNavigate}
        deletebtn="ok"
      >
        <SuccessIcon />
      </ConfirmationDialog>
          </DialogContent>
        </>
      )}
    </DialogStyled>
  );
});
