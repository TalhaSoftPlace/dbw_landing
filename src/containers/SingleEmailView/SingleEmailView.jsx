import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, ListItemAvatar, Typography, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import linkifyHtml from 'linkify-html';
import {
  RightWrapper,
  StyledList,
  StyledListItem,
  EmailView,
  SingleEmailFooter,
  EmailHead,
  SingleEmailWrapper,
  StyledAvatar,
} from './SingleEmailView.styles';
import { EmailActions } from './EmailActions';
import moment from 'moment';
import { useSetRecoilState } from 'recoil';
import { composeEmailQueueAtom } from '../../atoms';
import { ShortReply } from '../../containers';
import { useEmail } from '../../queries';
import { Loading, EmailInfo } from '../../components';
import { EventInvitationDialog } from '../../containers';
import { useFlagEmailMutation } from '../../mutations';
import { avatarIcons, isSeen } from '../../constants';
import { emailPaginationAtom } from '../../atoms';
import { useRecoilValue } from 'recoil';
import { useAuth } from '../../hooks';
import { decompressBody } from '../../utils';
export const SingleEmailView = React.memo(
  ({ selectedEmailId, selectedEmail, onClose = () => {}, mailBoxFolder }) => {
    const { user } = useAuth();
    const { folder } = useRecoilValue(emailPaginationAtom);
    const { data: singleEmail } = useEmail({
      uId: selectedEmail?.uid ?? selectedEmailId,
      mailBoxFolder,
      disabled: !!selectedEmail?.body|| !!selectedEmail?.multiPartCalendar,
    });
    const email = useMemo(() => singleEmail ?? selectedEmail, [
      selectedEmail,
      singleEmail,
    ]);
    const { mutateAsync: flagEmail } = useFlagEmailMutation();
    const setComposeEmailsQueue = useSetRecoilState(composeEmailQueueAtom);
    const [showEmailFooter, toggleEmailFooter] = useState(true);
    const emailAt = useMemo(() => {
      return moment(email?.sentDate).format('h:mm a, MMMM D, YY');
    }, [email]);
    const emailTo = useMemo(() => {
      const sender = email?.sender;
      return (
        sender?.substring(sender.indexOf('<') + 1, sender.lastIndexOf('>')) ||
        sender
      );
    }, [email?.sender]);

    const toEmails = useMemo(() => {
      return [emailTo];
    }, [emailTo]);

    const eventAttachment = useMemo(
      () =>
        email?.attachments?.filter(attachment => {
          const fileExt = attachment?.fileName?.split('.').pop();
          return fileExt === 'ics';
        })?.[0],
      [email?.attachments]
    );

    const onReply = useCallback(() => {
      setComposeEmailsQueue(queue => [
        ...queue,
        {
          id: uuidv4(),
          to: [emailTo],
          uid: email?.uid,
          email,
          folder: folder,
          subject: `Re: ${email?.subject}`,
        },
      ]);
    }, [setComposeEmailsQueue, emailTo, email, folder]);

    const onForward = useCallback(() => {
      setComposeEmailsQueue(queue => [
        ...queue,
        {
          id: uuidv4(),
          to: [],
          uid: email?.uid,
          email,
          isForward: true,
          folder: folder,
          subject: `Fwd: ${email?.subject}`,
        },
      ]);
    }, [setComposeEmailsQueue, email, folder]);

    const onReplyAll = useCallback(() => {
      setComposeEmailsQueue(queue => [
        ...queue,
        {
          id: uuidv4(),
          to: [emailTo],
          cc: [...(email?.toRecipients ?? []), ...(email?.ccList ?? [])].filter(
            i => i !== emailTo && user?.userName !== i
          ),
          uid: email?.uid,
          email,
          folder: folder,
          subject: `Re: ${email?.subject}`,
        },
      ]);
    }, [setComposeEmailsQueue, emailTo, email, folder, user?.userName]);

    const isUnread = useMemo(() => {
      if (email?.sender === user?.userName) return false;
      const unredFlag = !email?.systemFlags?.find(flag => {
          return flag === isSeen;
        });
      if (!!unredFlag && !email?.isSeen) return true;
      return false;
    }, [email?.isSeen, email?.sender, email?.systemFlags, user?.userName]);
    useEffect(() => {
      if (isUnread && email?.uid) {
        const uid = email?.uid;
        flagEmail({ uids: [uid] });
      }
    }, [isUnread, flagEmail, email]);

    useEffect(() => {
      if (folder === 'INBOX' || folder === 'All' ) {
        toggleEmailFooter(true);
      } else {
        toggleEmailFooter(false);
      }
    }, [folder, selectedEmailId, toggleEmailFooter]);

    const handleShortReplyToggle = useCallback(() => {
      toggleEmailFooter(false);
    }, [toggleEmailFooter]);
    const avatarColorIcon = React.useMemo(() => {
      const avatarRule = email?.userFlags?.find(
        flag => flag.split('_')?.[0] === 'avatar'
      );
      const color = avatarRule?.split('_')?.[1];
      const icon = avatarRule?.split('_')?.[2];
      if (avatarRule) {
        return {
          color,
          icon,
        };
      }
      return undefined;
    }, [email]);
    const firstLetter = useMemo(() => {
      return (
        <Box>
          {avatarColorIcon?.icon ? (
            avatarIcons[avatarColorIcon?.icon]
          ) : folder === 'SENT' ? (
              <>{email?.toRecipients[0]?.replace(/[^a-zA-Z0-9]/g, '')?.charAt(0)?.toUpperCase()}</>
          ) : (
            <>
              {(email?.senderPersonal ?? email?.address ?? email?.sender)
                ?.charAt(0)
                ?.toUpperCase()}
            </>
          )}
        </Box>
      );
    }, [
      avatarColorIcon?.icon,
      email?.address,
      email?.sender,
      email?.senderPersonal,
      email?.toRecipients,
      folder,
    ]);

    const emailBody = useMemo(() => email?.body ? decompressBody(email?.body) : undefined, [email?.body]);
    const content = useMemo(() => {
      return !!eventAttachment || !!email?.multiPartCalendar ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className="eventdialog"
        >
          <EventInvitationDialog
            email={email}
            eventAttachment={eventAttachment}
            icsContent={email?.multiPartCalendar}
          />
        </Box>
      ) : (
        emailBody && (
          <EmailView
            className={!showEmailFooter ? 'expand-email-iframe' : ''}
            srcDoc={`
                    <html>
                      <head>
                        <base target="_blank" />
                        <style>
                         @import url('https://use.typekit.net/aeh2skt.css');
                         * { font-family: 'Roboto', sans-serif !important; font-size: 13px; line-height:1.3; }
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
                                color:#500050;
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
                        ${linkifyHtml(emailBody)}
                        ${email?.quotedText
                ? `
                          <div class="wrap-collabsible">
                            <input id="collapsible" class="toggle" type="checkbox" />
                            <label for="collapsible" class="lbl-toggle">...</label>

                            <div class="collapsible-content">
                              <div class="content-inner">
                                <p>
                                  ${linkifyHtml(email?.quotedText)}
                                </p>
                              </div>
                            </div>
                          </div>

                        `
              : ``
              }
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
          )
      )
    }, [email, emailBody, eventAttachment, showEmailFooter]);
    return (
      <SingleEmailWrapper className="email-view">
        {!email ? (
          <Loading color="#fff" />
        ) : (
          <>
            <StyledList>
              <EmailHead>
                <Grid item sm={12} className="mobileemailviewAction">
                  <RightWrapper>
                    <Box>
                      <EmailActions
                        onReply={onReply}
                        onReplyAll={onReplyAll}
                        onForward={onForward}
                        email={email}
                        onClose={onClose}
                        emailDate={emailAt}
                      />
                    </Box>
                  </RightWrapper>
                </Grid>
                <StyledListItem>
                  <ListItemAvatar className="avatar">
                    <StyledAvatar color={avatarColorIcon?.color}>
                      {firstLetter}
                    </StyledAvatar>
                  </ListItemAvatar>
                  <Grid container className="primaryheader">
                    <Grid item md={7} sm={7} xs={12}>
                      <EmailInfo email={email} />
                      <Grid container>
                        <Grid item className="subject-text ">
                          <Typography
                            className="time "
                            component="span"
                            sx={{
                              fontSize: 13,
                              display: {
                                xs: 'flex',
                                sm: 'flex',
                                md: 'flex',
                                lg: 'flex',
                              },
                            }}
                          >
                            {email?.subject}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item md={5} sm={5} xs={6} className="rightwrapper">
                      <RightWrapper>
                        <Box>
                          <EmailActions
                            onReply={onReply}
                            onReplyAll={onReplyAll}
                            onForward={onForward}
                            email={email}
                            onClose={onClose}
                            emailDate={emailAt}
                            selectedEmailId={selectedEmailId}
                          />
                        </Box>
                      </RightWrapper>
                    </Grid>
                  </Grid>
                </StyledListItem>
                {content}
              </EmailHead>
            </StyledList>
              {!eventAttachment && !email?.multiPartCalendar && showEmailFooter && (
              <SingleEmailFooter>
                <Grid container>
                  <Grid item xs={12}>
                    <ShortReply
                      email={email}
                      toggleEmailFooter={handleShortReplyToggle}
                      to={toEmails}
                      subject={`Re: ${email?.subject}`}
                      onClose={onClose}
                    />
                  </Grid>
                </Grid>
              </SingleEmailFooter>
            )}
          </>
        )}
      </SingleEmailWrapper>
    );
  }
);
