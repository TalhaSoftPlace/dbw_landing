import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CircularProgress, Grid, Box, useTheme } from '@mui/material';
import {
  InputLabelStyles,
  MessageBoxTop,
  MessageBoxTBottom,
  TextFieldStyled,
  BoxStyled,
  MobileCloseHeader,
  StyledBox,
  ToBccIconButton,
  Wrapper,
  SendWrapper,
  DraggableBox,
  SendIcon,
  EmailView,
} from './MessageBox.styles';
import { Editor, Button, UploadedFileChip } from '../../components';
import { EmailsInput } from '../EmailsInput';
import { ReactComponent as QuilToolIcon } from '../../images/QuilTool.svg';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import { Formik } from 'formik';
import { useReplyEmailMutation, useSendEmailMutation } from '../../mutations';
import { sendEmailValidationSchema } from './validation.schema';
import { useSnackbar } from 'notistack';
import { FileUploader } from 'react-drag-drop-files';
import MinimizeIcon from '@mui/icons-material/Minimize';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useRecoilState } from 'recoil';
import { composeBoxAtom } from '../../atoms';
import { useAuth, useWindowResize } from '../../hooks';
import moment from 'moment';
import { useGetCompantSettings } from '../../queries';
import { useLocalization } from '../../hooks';
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { enqueueSnackbar } = useSnackbar();
  const attachmentsUploadRef = useRef(null);
  const winSize = useWindowResize();
  const muiTheme = useTheme();
  const { t } = useLocalization();

  const handleBoxExpand = React.useCallback(() => {
    props.setOpen(!props.open);
  }, [props]);

  useEffect(() => {
    if (winSize.width < muiTheme.breakpoints.values.md) {
      setPosition({ x: 0, y: 0 });
    }
  }, [muiTheme.breakpoints.values.md, setPosition, winSize.width]);

  const handleBcCccExpand = React.useCallback(() => {
    props.setBccCccExpand(!props.bccCccExpand);
  }, [props]);

  const [toolOpen, setToolOpen] = React.useState(true);
  const handleToolExpand = React.useCallback(() => {
    setToolOpen(!toolOpen);
  }, [toolOpen]);

  const maximizedStateColumn = React.useMemo(() => {
    const labelColumn = 1;
    const fieldColumn = 11;
    const toFieldColumn = props.open ? 10 : 9;
    const ccBccColumn = props.open ? 1 : 2;

    return { labelColumn, fieldColumn, toFieldColumn, ccBccColumn };
  }, [props]);
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

  const openFileDialog = React.useCallback(() => {
    attachmentsUploadRef.current.click();
  }, [attachmentsUploadRef]);

  const files = React.useMemo(
    () =>
      (props?.values?.attachments?.length && props?.values?.attachments) ||
      null,
    [props?.values?.attachments]
  );

  const isDraggable = React.useMemo(() => {
    return winSize.width < muiTheme.breakpoints.values.md;
  }, [winSize, muiTheme]);

  const handlePositionChange = React.useCallback((e, { x, y }) => {
    setPosition({ x, y });
  }, []);
  const emailBody = useMemo(
    () => (props?.email?.body ? decompressBody(props.email?.body) : undefined),
    [props.email?.body]
  );

  return (
    <DraggableBox
      disabled={isDraggable}
      handle=".handle"
      onDrag={handlePositionChange}
      position={position}
    >
      <Wrapper className="no-cursor">
        <FileUploader
          disabled
          key={files?.length || 0}
          handleChange={filesUploaded}
          multiple
          name="file"
          fileOrFiles={files}
          types={fileTypes}
        >
          <div className="inner">
            <MobileCloseHeader
              className="mobile-close-header cursor handle"
              item
              sm={12}
              xs={12}
            >
              {!props.open ? (
                <OpenInNewIcon
                  onClick={handleBoxExpand}
                  className="pointer"
                  sx={{ pt: 1, mb: 0.5, mr: 1, color: 'text.light' }}
                />
              ) : (
                <MinimizeIcon
                  onClick={handleBoxExpand}
                  className="pointer"
                  sx={{ pt: 1, mb: 0.5, mr: 1, color: 'text.light' }}
                />
              )}
              <CloseIcon
                onClick={props.onCancel}
                className="pointer"
                sx={{ mt: 1, mr: 1, color: 'text.light' }}
              />
            </MobileCloseHeader>
            <MessageBoxTop
              sx={{
                pl: 3,
                pr: 3,
                pb: 1,
                pt: 1,
                backgroundColor: 'background.lightGrey',
                borderBottom: 0,
              }}
              container
              open={props.open}
              nobordertoponmobile="true"
            >
              <Grid item xs={2} lg={maximizedStateColumn.labelColumn}>
                <InputLabelStyles
                  sx={{ pt: 1, fontWeight: 500, color: 'text.greyDarkest' }}
                >
                  {t.container.messageBox.messageTo}
                </InputLabelStyles>
              </Grid>
              <Grid
                item
                xs={8}
                lg={maximizedStateColumn.toFieldColumn}
                tabIndex="1"
              >
                <EmailsInput
                  autoFocus={!props.email || props.isForward}
                  name="to"
                  {...props}
                />
              </Grid>
              <Grid
                item
                xs={2}
                lg={maximizedStateColumn.ccBccColumn}
                className="tobcc"
                sx={{ textAlign: 'right' }}
              >
                <ToBccIconButton
                  tabIndex={-1}
                  onClick={handleBcCccExpand}
                  className="pointer"
                >
                  {t.container.messageBox.cCBbc}
                </ToBccIconButton>
              </Grid>

              {props.bccCccExpand ? (
                <>
                  <Grid item xs={2} lg={maximizedStateColumn.labelColumn}>
                    <InputLabelStyles
                      sx={{ pt: 1, fontWeight: 500, color: 'text.greyDarkest' }}
                    >
                      {t.container.messageBox.cC}{' '}
                    </InputLabelStyles>
                  </Grid>
                  <Grid item xs={10} lg={maximizedStateColumn.fieldColumn}>
                    <EmailsInput name="cc" {...props} />
                  </Grid>

                  <Grid item xs={2} lg={maximizedStateColumn.labelColumn}>
                    <InputLabelStyles
                      sx={{ pt: 1, fontWeight: 500, color: 'text.greyDarkest' }}
                    >
                      {t.container.messageBox.bCC}{' '}
                    </InputLabelStyles>
                  </Grid>
                  <Grid item lg={maximizedStateColumn.fieldColumn} xs={10}>
                    <EmailsInput name="bcc" {...props} />
                  </Grid>
                </>
              ) : (
                <></>
              )}

              <Grid
                item
                sx={{ mt: 1 }}
                xs={2}
                lg={maximizedStateColumn.labelColumn}
              >
                <InputLabelStyles
                  sx={{
                    paddingTop: '5px',
                    fontWeight: 500,
                    color: 'text.greyDarkest',
                  }}
                >
                  {t.container.messageBox.subject}{' '}
                </InputLabelStyles>
              </Grid>
              <Grid
                item
                sx={{ mt: 1 }}
                lg={maximizedStateColumn.fieldColumn}
                xs={10}
                tabIndex="2"
              >
                <TextFieldStyled
                  id="subject"
                  name="subject"
                  value={props?.values?.subject}
                  onChange={props?.handleChange}
                  onBlur={props?.handleBlur}
                  sx={{ width: '100%', mb: 1, backgroundColor: 'transparent' }}
                  variant="standard"
                  inputProps={{
                    style: { fontSize: 13 },
                    autoComplete: 'off',
                    form: {
                      autocomplete: 'off',
                    },
                  }}
                />
              </Grid>
            </MessageBoxTop>
            <StyledBox>
              <Editor
                {...props}
                open={props.open}
                isemail={!!props.email}
                bccCccExpand={props.bccCccExpand}
                toolOpen={toolOpen}
              />
              {emailBody && (
                <EmailView
                  srcDoc={`
                    <html>
                      <head>
                        <base target="_blank" />
                        <style>
                         @import url('https://use.typekit.net/aeh2skt.css');
                          * { font-family: 'Roboto', sans-serif !important; font-size: 13px; line-height:1.3;}
                             input[type='checkbox'] {
                                display: none;
                              }
                              .wrap-collabsible {
                                margin: 0;
                              }
                              .lbl-toggle {
                                line-height: 2px;
                                font-weight: 500;
                                font-size: 24px;
                                text-transform: uppercase;
                                text-align: center;
                                padding: 0;
                                color: #ddd;
                                background: grey;
                                cursor: pointer;
                                border-radius: 8px;
                                transition: all 0.25s ease-out;
                                height: 15px;
                                width: 30px;
                                box-sizing: border-box;
                                display: block;
                              }
                              .lbl-toggle:hover {
                                color: #fff;
                              }
                              .collapsible-content {
                                color: #500050;
                                z-index: 9;
                                max-height: 0px;
                                overflow: hidden;
                                transition: max-height 0.25s ease-in-out;
                              }
                              .toggle:checked + .lbl-toggle + .collapsible-content {
                                max-height: unset;
                              }
                              .toggle:checked + .lbl-toggle {
                                border-bottom-right-radius: 0;
                                border-bottom-left-radius: 0;
                              }
                              .collapsible-content .content-inner {
                                border-bottom-left-radius: 7px;
                                border-bottom-right-radius: 7px;
                                padding: 0.5rem 1rem;
                              }
                              .collapsible-content p {
                                margin-bottom: 0;
                              }
                        </style>
                      </head>
                      <body>
                          <div class="wrap-collabsible">
                            <input id="collapsible" class="toggle" type="checkbox" />
                            <label for="collapsible" class="lbl-toggle">...</label>

                            <div class="collapsible-content">
                              <div class="content-inner">
                                  ${emailBody}
                                    ${
                                      props?.email?.quotedText
                                        ? props?.email?.quotedText
                                        : ''
                                    }
                              </div>
                            </div>
                          </div>  
                          <script>     
                          const images = [...document.querySelectorAll('img')];
                          images.forEach((i)=> {
                            if(!(i.src.startsWith("http://") || i.src.startsWith("https://") || i.src.startsWith("www.")))
                            {
                              i.remove(); 
                            }
                          })
                        </script>    
                      </body>
                    </html> 
                    `}
                />
              )}
            </StyledBox>
          </div>
        </FileUploader>

        <MessageBoxTBottom
          sx={{
            pl: 5,
            pr: 3,
            pt: 1,
            pb: 1,
            backgroundColor: 'background.lightGrey',
          }}
          container
          open={props.open}
          hasborderbottom="true"
        >
          <Grid item xs={12} sx={{ mb: 1 }}>
            <UploadedFileChip
              name="attachments"
              attachments={props?.values?.attachments}
              setFieldValue={props?.setFieldValue}
              forwardAttachmentNames={props.forwardAttachmentNames}
              setforwardAttachmentNames={props.setforwardAttachmentNames}
            />
          </Grid>
          <Grid item lg={12} sx={{ mt: 1, mb: 1, display: 'none' }}>
            <input
              type="file"
              ref={attachmentsUploadRef}
              multiple
              onChange={filesUploaded}
              name="attachments"
            />
          </Grid>
          <SendWrapper>
            <Box sx={{ mt: 1, mb: 1, display: 'flex' }}>
              <QuilToolIcon
                onClick={handleToolExpand}
                className={
                  'pointer ' + (toolOpen ? 'nonActiveSvgIcon' : 'activeSvgIcon')
                }
              />
              <AttachFileIcon
                onClick={openFileDialog}
                sx={{
                  display: 'block',
                  color: 'text.greyDark',
                  fontSize: 'large',
                  ml: 1,
                  cursor: 'pointer',
                }}
                className="attachmenticon"
              />
            </Box>
            <Box>
              <Button
                onClick={onSubmit}
                type="submit"
                size="mini"
                variant="primary"
                texttransform="none"
                disabled={props.isSending}
              >
                {props.isSending ? (
                  <CircularProgress size={26} color="inherit" />
                ) : (
                  <>
                    <SendIcon
                      style={{ fontSize: '16px' }}
                      sx={{ color: 'text.white', marginRight: '3px' }}
                    />
                    Send
                  </>
                )}
              </Button>
            </Box>
          </SendWrapper>
        </MessageBoxTBottom>
      </Wrapper>
    </DraggableBox>
  );
});

export const MessageBox = React.memo(({ composeData, onCancel }) => {
  const { user } = useAuth();
  const { data: companySettings = {} } = useGetCompantSettings();
  const [open, setOpen] = useRecoilState(composeBoxAtom);
  const [bccCccExpand, setBccCccExpand] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [forwardAttachmentNames, setforwardAttachmentNames] = useState([]);
  useEffect(() => {
    setforwardAttachmentNames(composeData?.email?.attachments?.map(({fileName})=>fileName) ?? [])
  }, [composeData?.email]);
  const {
    mutateAsync: sendEmail,
    isLoading: isSending,
  } = useSendEmailMutation();
  const {
    mutateAsync: replyEmail,
    isLoading: isReplying,
  } = useReplyEmailMutation();
  const initialValues = useMemo(() => {
    return {
      to: composeData?.to ?? [],
      subject: composeData?.subject ?? '',
      cc: composeData?.cc ?? [],
      bcc: [],
      message: `<p><br /><br /><br /><br />${
        !!user?.signature ? user?.signature : ''
      }<p/><br /><br /><p>${
        !!companySettings?.disclaimer ? companySettings?.disclaimer : ''
      }</p></p>`,
      attachments: [],
    };
  }, [
    companySettings,
    composeData?.cc,
    composeData?.subject,
    composeData?.to,
    user.signature,
  ]);
  const emailBody = useMemo(
    () =>
      composeData?.email?.body
        ? decompressBody(composeData.email?.body)
        : undefined,
    [composeData.email?.body]
  );

  const handleCancel = useCallback(() => {
    onCancel(composeData.id);
  }, [composeData.id, onCancel]);
  const emailFrom = useMemo(() => {
    const sender = composeData.email?.sender;
    return (
      sender?.substring(sender.indexOf('<') + 1, sender.lastIndexOf('>')) ||
      sender
    );
  }, [composeData.email?.sender]);
  const handleSubmit = useCallback(
    (values, { resetForm }) => {
      if (composeData?.uid) {
        const bodyy = `${values.message} ${
          composeData.email
            ? `   
<br />                                                     
<p>
On ${moment(composeData.email.sentDate).format(
                'ddd, MMM Do, YYYY [at] h:mm a'
              )}, &lt;<a href="mailto:${emailFrom}">${emailFrom}</a>&gt; wrote:
</p>

<blockquote class="gmail_quote" style="margin:0px 0px 0px 0.8ex;border-left:1px solid rgb(204,204,204);padding-left:1ex">

<div> ${emailBody} 
      ${composeData.email?.quotedText ? composeData.email?.quotedText : ''}
</div>



</blockquote>
          `
            : ''
        }`;
        replyEmail({
          subject: values.subject,
          uid: composeData?.uid,
          folder: composeData?.folder,
          body: bodyy,
          isForward: composeData?.isForward ?? false,
          toEmails: values.to,
          ccEmails: values.cc,
          bccEmails: values.bcc,
          attachments: values.attachments,
          attachmentNames:!!forwardAttachmentNames?.length?forwardAttachmentNames : undefined,
        }).then(res => {
          if (res === 'Reply sent') {
            enqueueSnackbar('Email Sent', {
              variant: 'success',
            });
            resetForm(initialValues);
            handleCancel();
          } else {
            enqueueSnackbar(res, {
              variant: 'error',
            });
          }
        });
      } else {
        sendEmail({
          subject: values.subject,
          body: values.message,
          toEmails: values.to.join(),
          ccEmails: values.cc.join(),
          bccEmails: values.bcc.join(),
          attachments: values.attachments,
        }).then(res => {
          if (res === 'OK') {
            enqueueSnackbar('Email Sent', {
              variant: 'success',
            });
            resetForm(initialValues);
            handleCancel();
          } else {
            enqueueSnackbar(res, {
              variant: 'error',
            });
          }
        });
      }
    },
    [composeData.email, composeData?.folder, composeData?.isForward, composeData?.uid, emailBody, emailFrom, enqueueSnackbar, forwardAttachmentNames, handleCancel, initialValues, replyEmail, sendEmail]
  );
  return (
    <BoxStyled open={open}>
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
            onCancel={handleCancel}
            isSending={isSending || isReplying}
            open={open}
            setOpen={setOpen}
            bccCccExpand={bccCccExpand}
            setBccCccExpand={setBccCccExpand}
            isForward={composeData.isForward}
            email={composeData.email}
            forwardAttachmentNames={forwardAttachmentNames}
            setforwardAttachmentNames={setforwardAttachmentNames}
          />
        )}
      </Formik>
    </BoxStyled>
  );
});
