import React, { useCallback, useMemo, useRef } from 'react';
import { CircularProgress, Grid, IconButton, Box } from '@mui/material';
import {
  MessageBoxTop,
  BoxStyled,
  StyledBox,
  StyledCloseIcon,
} from './ShortReply.styles';
import { UploadedFileChip } from '../../components';
import { Button, ShortReplyeditor } from '../../components';
import SendIcon from '@mui/icons-material/Send';
import { Formik } from 'formik';
import { useReplyEmailMutation } from '../../mutations';
import { sendEmailValidationSchema } from './validation.schema';
import { useSnackbar } from 'notistack';
import { FileUploader } from 'react-drag-drop-files';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useRecoilValue } from 'recoil';
import { emailPaginationAtom } from '../../atoms';
import { useAuth , useWindowResize } from '../../hooks';
import { useTheme } from '@emotion/react';
import moment from 'moment';
import { decompressBody } from '../../utils';
const fileTypes = [
  'JPG',
  'PNG',
  'GIF',
  'DOC',
  'DOCX',
  'PDF',
  'PPT',
  'PPTX',
  'XLS',
  'XLSX',
  'TXT',
  'SQL',
  'ICS',
  'JPEG',
  'BMP',
  'TIFF',
  'SVG',
  'ZIP',
  'KEY',
  'MOV',
  'MP3',
  'MP4',
  'TAR',
];
const Form = React.memo(props => {
  const { enqueueSnackbar } = useSnackbar();
  const attachmentsUploadRef = useRef(null);
  const onSubmit = React.useCallback(() => {
    if (props.errors?.to) {
      enqueueSnackbar(props.errors.to, {
        variant: 'error',
      });
    } else {
      props.handleSubmit();
    }
  }, [enqueueSnackbar, props]);
  const filesUploaded = React.useCallback(
    file => {
      if (file?.target?.files) {
        props.setFieldValue('attachments', [
          ...file.target.files,
          ...props?.values?.attachments,
        ]);
        file.target.value = null;
      } else if (file) {
        props.setFieldValue('attachments', [
          ...file,
          ...props?.values?.attachments,
        ]);
      }
    },
    [props]
  );

  const files = React.useMemo(
    () =>
      (props?.values?.attachments?.length && props?.values?.attachments) ||
      null,
    [props?.values?.attachments]
  );

  const openFileDialog = React.useCallback(() => {
    attachmentsUploadRef.current.click();
  }, [attachmentsUploadRef]);
  return (
    <>
      <FileUploader
        key={files?.length || 0}
        handleChange={filesUploaded}
        multiple={true}
        name="file"
        fileOrFiles={files}
        types={fileTypes}
      >
        <StyledBox onClickCapture={e => e.stopPropagation()}>
          <ShortReplyeditor {...props} />
        </StyledBox>
      </FileUploader>
      <MessageBoxTop
        sx={{
          pl: 5,
          pr: 3,
        }}
        container
      >
        <Grid item lg={12} sx={{ mt: 1, mb: 1, display: 'none' }}>
          <input
            type="file"
            ref={attachmentsUploadRef}
            multiple
            onChange={filesUploaded}
            name="attachments"
          />
        </Grid>
        <Grid
          item
          xs={1}
          className="space-between"
          sx={{
            mt: 1,
            mb: 1,
            pt: 1.5,
            display: 'block',
          }}
        >
          <AttachFileIcon
            onClick={openFileDialog}
            sx={{
              color: 'text.greyDark',
              fontSize: 'large',
              cursor: 'pointer',
            }}
          />
        </Grid>

        <Grid
          item
          xs={7}
          md={9}
          sx={{
            mb: 1,
            pl: 1,
            pt: 1,
            display: 'flex',
          }}
        >
          <UploadedFileChip
            name="attachments"
            attachments={props?.values?.attachments}
            setFieldValue={props?.setFieldValue}
          />
        </Grid>

        <Grid item className="sendbtn" pt={1} xs={4} md={2}>
          <Button
            onClick={onSubmit}
            disabled={props.isSending || props?.values.message === '<p></p>'}
            type="submit"
            size="mini"
            variant="primary"
            sx={{ height: '40px' }}
            texttransform="none"
          >
            {props.isSending ? (
              <CircularProgress size={26} color="inherit" />
            ) : (
              <>
                <SendIcon
                  style={{ fontSize: '16px' }}
                  sx={{ color: 'text.white', marginRight: '3px' }}
                />
                Quick Reply
              </>
            )}
          </Button>
          <Box className="closeIconbox">
            <IconButton onClick={props.toggleEmailFooter}>
              <StyledCloseIcon
                sx={{ color: 'text.blueLight' }}
                fontSize="inherit"
              />
            </IconButton>
          </Box>
        </Grid>
      </MessageBoxTop>
    </>
  );
});

export const ShortReply = React.memo(
  ({ to, email, subject, toggleEmailFooter , onClose }) => {
    const winSize = useWindowResize();
    const muiTheme = useTheme();
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const { folder } = useRecoilValue(emailPaginationAtom);
    const {
      mutateAsync: replyEmail,
      isLoading: isSending,
    } = useReplyEmailMutation();
    const initialValues = useMemo(() => {
      return {
        to,
        subject,
        cc: [...(email?.toRecipients ?? []), ...(email?.ccList ?? [])].filter(
          i => !to.includes[i] && user?.userName !== i
        ),
        message: '<p></p>',
        attachments: [],
      };
    }, [email?.ccList, email?.toRecipients, subject, to, user?.userName]);
    const emailFrom = useMemo(() => {
      const sender = email?.sender;
      return (
        sender?.substring(sender.indexOf('<') + 1, sender.lastIndexOf('>')) ||
        sender
      );
    }, [email?.sender]);
    const emailBody= useMemo(()=> email?.body ? decompressBody(email?.body) : undefined,[email?.body])
    const handleSubmit = useCallback(
      (values, { resetForm }) => {
        replyEmail({
          uid: email?.uid,
          folder,
          subject: values.subject,
          body: `${values.message} ${
            email
              ? `
<br />                                                     
<p>
On ${moment(email.sentDate).format(
                  'ddd, MMM Do, YYYY [at] h:mm a'
                )}, &lt;<a href="mailto:${emailFrom}">${emailFrom}</a>&gt; wrote:
</p>

<blockquote class="gmail_quote" style="margin:0px 0px 0px 0.8ex;border-left:1px solid rgb(204,204,204);padding-left:1ex">

<div> ${emailBody} 
      ${email?.quotedText ? email.quotedText : ''}
</div>



</blockquote>
          `
              : ''
          }`,
          toEmails: values.to,
          ccEmails: values.cc,
          bccEmails: [],
          attachments: values.attachments,
        }).then(res => {
          if (res === 'Reply sent') {
            enqueueSnackbar('Email Sent', {
              variant: 'success',
            });
            resetForm(initialValues);
            if (winSize.width < muiTheme.breakpoints.values.md) {
              onClose();
            }
          } else {
            enqueueSnackbar(res, {
              variant: 'error',
            });
          }
        });
      },
      [email, emailBody, emailFrom, enqueueSnackbar, folder, initialValues, replyEmail, muiTheme, winSize , onClose]
    );

    return (
      <BoxStyled>
        <Formik
          initialValues={initialValues}
          validateOnMount
          enableReinitialize
          validationSchema={sendEmailValidationSchema}
          onSubmit={handleSubmit}
        >
          {props => (
            <Form
              {...props}
              isSending={isSending}
              toggleEmailFooter={toggleEmailFooter}
            />
          )}
        </Formik>
      </BoxStyled>
    );
  }
);
