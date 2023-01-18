import React, { useCallback, useState } from 'react';
import { Formik } from 'formik';
import { InvitationDialogForm } from './InvitationDialogForm';
import {InvitationSuccess} from './InvitationSuccess';
import { inviteemailSchema } from './validation.schema';
import { InvitationCode } from '../../components';
export const InvitationDialog = React.memo(({ open, handleClose }) => {
  const initialValues = {
    username: '',
    step:'generate-code',
  };

  const [openDialog, setOpenDialog] = useState(false);
  const dialogOpen = useCallback(() => {
    setOpenDialog(true);
    handleClose();
  }, [handleClose]);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);
 
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={inviteemailSchema}
        validateOnMount
      >
        {(props) => {
          switch (props.values.step) {
            case 'generate-code':
              return <InvitationDialogForm
              {...props}
              dialogOpen={dialogOpen}
              open={open}
              handleClose={handleClose}
            />;
            case 'success':
              return <InvitationSuccess 
              {...props}
              dialogOpen={dialogOpen}
              open={open}
              handleClose={handleClose} />;
            default:
              return;
          }
        }}
        
      </Formik>
      <InvitationCode open={openDialog} handleClose={handleCloseDialog} />
    </>
  );
});
