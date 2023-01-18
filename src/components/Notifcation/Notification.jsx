import { Grid, MenuItem, IconButton } from '@mui/material';
import React, { useMemo } from 'react';
import { NotificationMenu, NotificationWrapper } from './Notification.styles';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { notificationsAtom, selectedEmailAtom } from '../../atoms';
import { useNavigate } from 'react-router-dom';

export const Notification = React.memo(({ open, handleClose }) => {
  const { notifications: notes } = useRecoilValue(notificationsAtom);
  const setSelectedEmail = useSetRecoilState(selectedEmailAtom);

  const navigate = useNavigate();

  const notifications = useMemo(
    () =>
      notes.map(note => ({
        icon: <CalendarMonthIcon />,
        title: note.subject,
        body: note.sender,
        from: note.from,
        snippet: note.snippet,
        uid: note?.uid,
      })),
    [notes]
  );
  const handleSelect = React.useCallback(
    note => {
      navigate('/workspace');
      handleClose();
      setSelectedEmail(note?.uid);
    },
    [handleClose, navigate, setSelectedEmail]
  );

  const totalNotifications = React.useMemo(() => {
    return notifications.length;
  }, [notifications.length]);

  return (
    <NotificationMenu open={open} onClose={handleClose}>
      <NotificationWrapper>
        <p onClick={handleClose}>
          Notifications
          <IconButton>
            <CloseIcon />
          </IconButton>
        </p>
        <ul>
          {notifications.map((notifi, idx) => {
            return (
              <MenuItem onClick={() => handleSelect(notifi)} key={idx}>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid className="notificationIcon" item xs={1}>
                        {notifi.icon}
                      </Grid>
                      <Grid key={notifi.body + ' 2'} item xs={11}>
                        <Grid container>
                          <Grid
                            item
                            className="notificationTitle"
                            lg={12}
                            xs={12}
                            sm={12}
                          >
                            {notifi.title}
                          </Grid>
                          <Grid
                            className={
                              'notificationBody ' +
                              (totalNotifications - 1 !== idx
                                ? 'borderBotton'
                                : '')
                            }
                            item
                            lg={12}
                            xs={12}
                            sm={12}
                          >
                            {notifi.body}
                            <br />
                            {notifi.snippet}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </MenuItem>
            );
          })}
        </ul>
      </NotificationWrapper>
    </NotificationMenu>
  );
});
