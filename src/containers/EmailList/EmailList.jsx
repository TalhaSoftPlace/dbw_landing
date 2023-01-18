import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Box,
  LinearProgress,
  ListItemText,
  Typography,
  Checkbox,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  ItemWrapper,
  RightWrapper,
  StyledList,
  StyledListItem,
  StyledMonth,
  StyledAvatar,
  ItemWrapperThread,
  StyledCheckCircleIcon,
  AvatarContent,
  StyledSentIcon,
  StyledRecievedIcon,
} from './EmailList.styles';
import { ListActions } from './ListActions';
import { EmailListActions } from '../EmailListActions';
import { TimeProgressBar } from '../../components';
import { emailDateFormat, groupEmailListByMonth } from '../../utils';
import { avatarIcons, isSeen } from '../../constants';
import { useAuth, useDoubleClick } from '../../hooks';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { emailPaginationAtom } from '../../atoms';
import { EmailsenderList } from './EmailsenderList';
import { useToggle } from '../../hooks';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckIcon from '@mui/icons-material/Check';
import moment from 'moment';
import { useProfilePicture } from '../../queries';
const getFlatEmails = email => {
  if (email?.referencedThreads?.length) {
    const emails = email?.referencedThreads?.reduce(
      (all, email) => [...all, ...getFlatEmails(email)],
      []
    );
    return [email, ...emails];
  }
  return [email];
};

const EmailItem = React.memo(
  ({
    selectedEmailId,
    email,
    setSelectedEmail,
    selectedEmails,
    setSelectedEmails,
    folder,
    thread = false,
    threadItem = false,
  }) => {
    const { user: { userName } = {} } = useAuth();
    const setEmailPagination = useSetRecoilState(emailPaginationAtom);
    const all = useMemo(() => {
      const emails = getFlatEmails(email);
      emails.shift();
      setEmailPagination(state => ({
        ...state,
        allchildren: [...state.allchildren, ...emails].filter(
          (value, index, self) =>
            self.findIndex(v => v.uid === value.uid) === index
        ),
      }));
      return emails;
    }, [email, setEmailPagination]);
    const itemRef = useRef();
    const [showThread, toggleShowThread] = useToggle(false);
    const isSent = useMemo(
      () => folder === 'Sent' || email.sender === userName,
      [email.sender, folder, userName]
    );
    const toggleThread = useCallback(
      e => {
        e.stopPropagation();
        toggleShowThread();
      },
      [toggleShowThread]
    );
    const isUnread = useMemo(() => {
      if (email.sender === userName) return false;
      const unredFlag = !email?.systemFlags?.find(flag => {
          return flag === isSeen;
        });
      if (!!unredFlag && !email?.isSeen) return true;
      if (thread) {
        const unreadFlagChild = !!all.find(
          email =>
            email.sender !== userName &&
            !email?.systemFlags?.find(flag => {
              return flag === isSeen;
            })
        );
        if (unreadFlagChild) return true;
      }
      return false;
    }, [
      all,
      email?.isSeen,
      email.sender,
      email?.systemFlags,
      thread,
      userName,
    ]);

    const isOpen = useMemo(() => selectedEmailId === email?.uid, [
      email,
      selectedEmailId,
    ]);

    const isSelected = useMemo(
      () =>
        !!selectedEmails.find(({ uid }) => {
          return uid === email?.uid;
        }),
      [email?.uid, selectedEmails]
    );

    const onSelect = useCallback(() => {
      setSelectedEmail && email && setSelectedEmail(email);
    }, [email, setSelectedEmail]);

    const handleCheck = useCallback(() => {
      if (!isSelected) {
        setSelectedEmails &&
          setSelectedEmails(emails =>
            [...emails, email, ...(thread ? all : [])]?.filter(
              (value, index, self) =>
                self.findIndex(v => v.uid === value.uid) === index
            )
          );
      } else {
        setSelectedEmails &&
          setSelectedEmails(emails =>
            emails?.filter(({ uid }) => {
              return !(
                uid === email?.uid ||
                !!(thread && all.find(i => i?.uid === uid))
              );
            })
          );
      }
    }, [all, email, isSelected, setSelectedEmails, thread]);

    const formatedDate = useMemo(() => emailDateFormat(email.sentDate), [
      email.sentDate,
    ]);
    const onDoubleClick = useCallback(() => {
      window.open(
        `email/${folder}/${email?.uid}`,
        '_blank',
        `toolbar=no,top=100,left=${window.screen.availLeft +
          window.screen.availWidth / 2 -
          300},width=800,height=800`
      );
    }, [email?.uid, folder]);

    useDoubleClick({
      onSingleClick: onSelect,
      onDoubleClick: onDoubleClick,
      ref: itemRef,
    });
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = useMemo(() => !!anchorEl, [anchorEl]);
    const handleClick = useCallback(event => {
      setAnchorEl(event?.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
      setAnchorEl(null);
    }, []);
    const emailSender = React.useMemo(() => {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            overflow: 'hidden',
          }}
        >
          {!!email?.toRecipients?.length ? (
            <Box
              sx={{
                flexGrow: 0,
              }}
            >
              <Typography
                sx={{
                  display: 'inline',
                  padding: '0px !important',
                }}
                color={'inherit'}
                component="span"
                variant="inherit"
                className="email-subject"
              >
                {email?.toRecipients.map((value, key) => (
                  <Box key={key + value}>
                    {value} {email?.toRecipients.length > 1 && ' , '}{' '}
                  </Box>
                ))}
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                flexGrow: 0,
              }}
            >
              <Typography
                sx={{
                  display: 'inline',
                  padding: '0px !important',
                }}
                color={'inherit'}
                component="span"
                variant="inherit"
                className="email-subject"
              >
                {email.sender ?? email.address}
              </Typography>
            </Box>
          )}
          {all?.length > 1 && (
            <Box
              onClick={handleClick}
              sx={{
                flexGrow: 0,
              }}
            >
              <ExpandMoreIcon
                sx={{
                  color: 'text.light',
                }}
              />
            </Box>
          )}
        </Box>
      );
    }, [
      all?.length,
      email.address,
      email.sender,
      email?.toRecipients,
      handleClick,
    ]);

    const { data: picture } = useProfilePicture();
    const emailTimeLeft = React.useMemo(() => {
      const replyRule = email?.userFlags?.find(
        flag => flag.split('_')?.[0] === 'reply'
      );
      const hr = parseInt(replyRule?.split('_')?.[1]);
      if (replyRule && hr) {
        const minutesRemaning = Math.round(
          hr * 60 - moment().diff(moment(email?.sentDate), 'm')
        );
        if (minutesRemaning > 0) {
          return {
            minutesRemaning,
            percentage: (minutesRemaning * 100) / (hr * 60),
          };
        }
        return { minutesRemaning, percentage: 0 };
      }

      return undefined;
    }, [email]);

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
        <AvatarContent className="avatarcontent">
          <Box className="avatar-text">
            {avatarColorIcon?.icon ? (
              avatarIcons[avatarColorIcon?.icon]
            ) : folder === 'Sent' ? (
              <>{email?.toRecipients?.[0]?.charAt(0)?.toUpperCase()}</>
            ) : (
              <>
                    {(email?.senderPersonal ?? email?.address ?? email?.sender)?.replace(/[^a-zA-Z0-9]/g, '')?.charAt(0)?.toUpperCase()}
              </>
            )}
          </Box>

          <Box className="avatar-icon">
            <CheckIcon />
          </Box>
        </AvatarContent>
      );
    }, [avatarColorIcon?.icon, email.address, email.sender, email.senderPersonal, email?.toRecipients, folder]);

    const name = useMemo(
      () =>
        email.senderPersonal?.split('<')?.[0] ??
        email.address?.split('<')?.[0] ??
        email.sender?.split('<')?.[0],
      [email.address, email.sender, email.senderPersonal]
    );

    return (
      <>
        <ItemWrapper
          variant={isUnread && !isOpen ? 'unread' : 'read'}
          open={isOpen}
          className={showThread && all && thread ? 'is-thread' : ''}
        >
          {threadItem &&
            (email.sender === userName ? (
              <StyledSentIcon color={avatarColorIcon?.color} />
            ) : (
              <StyledRecievedIcon color={avatarColorIcon?.color} />
            ))}
          <Checkbox
            icon={
              !!picture && isSent ? (
                <StyledAvatar
                  src={picture ? `data:image/png;base64,${picture}` : undefined}
                  color="#bdbdbd"
                ></StyledAvatar>
              ) : (
                <StyledAvatar color={avatarColorIcon?.color}>
                  {firstLetter}
                </StyledAvatar>
              )
            }
            sx={{ marginLeft: threadItem ? '-4px' : '' }}
            checkedIcon={<StyledCheckCircleIcon />}
            className={isSelected && isOpen ? 'emailViewed' : ''}
            checked={isSelected}
            onChange={handleCheck}
            size="small"
          ></Checkbox>
          {all?.length >= 1 && thread && (
            <Box
              className="threadIcon"
              sx={{ cursor: 'pointer' }}
              onClickCapture={toggleThread}
            >
              {showThread ? (
                <Box sx={{ fontSize: '16px', mt: '10px' }}>
                  <KeyboardArrowUpIcon />
                </Box>
              ) : (
                <Box
                  sx={{
                    fontSize: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ height: '20px' }}>{all?.length + 1}</Box>
                  <KeyboardArrowDownIcon />
                </Box>
              )}
            </Box>
          )}
          <StyledListItem ref={itemRef}>
            <ListItemText
              sx={{ margin: 0 }}
              secondary={
                <Typography
                  component="span"
                  sx={{
                    display: 'block',
                    paddingRight: '10px',
                    lineHeight: '1',
                    verticalAlign: 'middle',
                    width: '100%',
                  }}
                >
                  <Typography
                    color={isUnread && !isOpen ? 'text.light' : 'inherit'}
                    component="span"
                    variant="inherit"
                    // className="email-subject"
                    className={
                      isUnread ? 'email-subjectBold ' : 'email-subject'
                    }
                  >
                    {folder === 'Sent' ? <>{emailSender}</> : <>{name}</>}
                  </Typography>
                  <EmailsenderList
                    to={email}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  />
                  {!threadItem && (
                    <Typography
                      color="inherit"
                      component="span"
                      variant="inherit"
                      sx={{ pt: '3px', lineHeight: 1.2 }}
                    >
                      {email.subject}
                    </Typography>
                  )}
                </Typography>
              }
            />

            <RightWrapper>
              <Typography
                component="span"
                color={isUnread && !isOpen ? 'text.light' : 'inherit'}
                variant="inherit"
              >
                {formatedDate}
              </Typography>
              {emailTimeLeft !== undefined && (
                <TimeProgressBar
                  value={emailTimeLeft.percentage}
                  minutesRemaning={emailTimeLeft.minutesRemaning}
                />
              )}
            </RightWrapper>
            <ListActions email={email} />
          </StyledListItem>
        </ItemWrapper>
        {showThread && all && thread && (
          <Box>
            <ItemWrapperThread sx={{ pl: 2 }}>
              {all?.map(email => (
                <EmailItem
                  selectedEmails={selectedEmails}
                  setSelectedEmails={setSelectedEmails}
                  key={email?.uid}
                  email={email}
                  selectedEmailId={selectedEmailId}
                  setSelectedEmail={setSelectedEmail}
                  folder={folder}
                  threadItem={true}
                />
              ))}
            </ItemWrapperThread>
          </Box>
        )}
      </>
    );
  }
);

const GroupItem = React.memo(
  ({
    month,
    emails,
    selectedEmailId,
    setSelectedEmail,
    selectedEmails,
    setSelectedEmails,
    folder,
  }) => {
    const renderEmails = useMemo(
      () =>
        emails.map(email => (
          <EmailItem
            selectedEmails={selectedEmails}
            setSelectedEmails={setSelectedEmails}
            key={email?.uid}
            email={email}
            selectedEmailId={selectedEmailId}
            setSelectedEmail={setSelectedEmail}
            folder={folder}
            thread
          />
        )),
      [
        emails,
        selectedEmails,
        setSelectedEmails,
        selectedEmailId,
        setSelectedEmail,
        folder,
      ]
    );
    return (
      <>
        <StyledMonth>{month}</StyledMonth>
        {renderEmails}
      </>
    );
  }
);

export const EmailList = React.memo(
  ({ emails, selectedEmailId, setSelectedEmail, isFetching }) => {
    const { folder } = useRecoilValue(emailPaginationAtom);
    const groupedEmails = useMemo(() => groupEmailListByMonth(emails), [
      emails,
    ]);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const renderGroups = useMemo(
      () =>
        Object.entries(groupedEmails)?.map(([month, emails]) => (
          <GroupItem
            key={month}
            month={month}
            emails={emails}
            selectedEmailId={selectedEmailId}
            setSelectedEmail={setSelectedEmail}
            selectedEmails={selectedEmails}
            setSelectedEmails={setSelectedEmails}
            folder={folder}
          />
        )),
      [groupedEmails, selectedEmailId, setSelectedEmail, selectedEmails, folder]
    );
    return (
      <>
        <EmailListActions
          emails={emails}
          selectedEmails={selectedEmails}
          setSelectedEmail={setSelectedEmail}
          setSelectedEmails={setSelectedEmails}
          isFetching={isFetching}
        />
        {isFetching && !emails.length && (
          <Box mt={1} mb={1}>
            <LinearProgress />
          </Box>
        )}
        <StyledList>{renderGroups}</StyledList>
      </>
    );
  }
);
