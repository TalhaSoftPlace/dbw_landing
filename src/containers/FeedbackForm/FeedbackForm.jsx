import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { Wrapper , SuccessIcon } from './FeedbackForm.styles';
import { Form } from './Form';
import { useSendFeedbackMutation } from '../../mutations';
import { feedBackSchema } from './validation.schema';
import { ConfirmationDialog  } from '../../containers';
import { useNavigate } from 'react-router-dom';
export const FeedbackForm = React.memo(() => {
  const navigate = useNavigate();
  const initialValues = {
    username: '',
    category: 'category',
    feedbacknote: '',
  };
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClose = React.useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleOpen = useCallback((row) => {
    setOpenDialog(true);
  }, []);

  const handleNavigate = useCallback(() => {
    navigate('/');
    setOpenDialog(false);
  },[navigate]);

  const { mutateAsync: sendFeedback, isSuccess } = useSendFeedbackMutation();
  const handleLogin = useCallback(
    values => {
      sendFeedback({
        category: values?.category,
        feedback: values?.feedbacknote,
        userEmail: values?.username,
      }).then(()=>{
        handleOpen();
        setTimeout(() =>handleNavigate() , 5000);
      })},
    [sendFeedback, handleOpen, handleNavigate]
  );

  return (
    <Wrapper sx={{ maxWidth: '500px', m: 'auto' }}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
        validationSchema={feedBackSchema}
        validateOnMount
      >
        {props => <Form {...props} isLoading={isSuccess} />}
      </Formik>
      <ConfirmationDialog
      title={"Thank you for your feedback"}
      subtitle=""
        open={openDialog}
        handleClose={handleClose}
        handleDelete={handleNavigate}
        deletebtn="ok"
      >
        <SuccessIcon />
      </ConfirmationDialog>
    </Wrapper>
  );
});
