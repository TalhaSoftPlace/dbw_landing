import {
  Box,
  DialogContent,
  Grid,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import {
  CloseIconStyled,
  DialogStyled,
  SelectStyled,
} from './AddAttendees.styles';
import { AttendeesEmailInput } from '../AttendeesEmailInput';
import { useAuth, useLocalization } from '../../hooks';
import { FieldGrid, FieldLabel } from '../AddEventForm/AddEventForm.styles';
import { Button } from '../Button';
import { useAddAttendee } from '../../mutations';

export const AddAttendees = React.memo(
  ({
    values,
    setFieldValue,
    roles,
    dialogOpen,
    setDislogOpen,
    attendees,
    setAttendees,
    selectedRole,
    setSelectedRole,
    makeRequest,
  }) => {
    const { mutateAsync: addAttendee } = useAddAttendee();
    const { user: { userName } = {} } = useAuth();
    const handleClose = React.useCallback(() => {
      setAttendees([]);
      setDislogOpen(false);
    }, [setAttendees, setDislogOpen]);

    const handleOpen = React.useCallback(() => {
      setDislogOpen(true);
    }, [setDislogOpen]);

    const attendeesAdded = React.useCallback(() => {
      const updatedAtendees = values.attendees.filter(attendee => {
        return !attendees.includes(attendee.email);
      });

      const newattendees = attendees
        .map(attendee => {
          return {
            email: attendee,
            attendeeDepartment: '',
            attendeeJobTitle: '',
            role: selectedRole,
          };
        })
        .filter(i => i.email !== userName);

      const payload = attendees
        ?.map(attendee => ({
          attendeeName: attendee,
          attendeeDepartment: '',
          attendeeJobTitle: '',
          attendeeRole: selectedRole,
        }))
        .filter(i => i.attendee !== userName);

      makeRequest && addAttendee(payload).then(() => {});

      setFieldValue('attendees', [...updatedAtendees, ...newattendees]);

      handleClose();
    }, [
      values.attendees,
      attendees,
      makeRequest,
      addAttendee,
      setFieldValue,
      handleClose,
      selectedRole,
      userName,
    ]);

    const handleRole = React.useCallback(
      event => {
        setSelectedRole(event.target.value);
      },
      [setSelectedRole]
    );
    const { t } = useLocalization();
    return (
      <>
        <IconButton
          onClick={handleOpen}
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 25,
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <AddIcon
            sx={{
              color: 'text.blueLight',
            }}
          />
        </IconButton>

        <DialogStyled
          open={dialogOpen}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
          fullWidth
        >
          <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5">
              {t.components.addAttendees.createAttendees}
            </Typography>
            <CloseIconStyled onClick={handleClose} />
          </Box>
          {dialogOpen && (
            <DialogContent>
              <Grid container sx={{ pt: 2 }}>
                <Grid item xs={12}>
                  <FieldLabel>{t.addEvent.addAttendees}:</FieldLabel>
                </Grid>
                <Grid item xs={12}>
                  <AttendeesEmailInput
                    {...{ 
                      values,
                      setFieldValue, 
                      attendees,
                      setAttendees,
                    }}
                    placeholder={t.addEvent.addAttendees}
                  />
                </Grid>

                <Grid item xs={12} sx={{ pt: 2 }}>
                  <FieldLabel>{t.addEvent.selectRole}:</FieldLabel>
                </Grid>
                <Grid item xs={12}>
                  <SelectStyled
                    fullWidth
                    value={selectedRole}
                    onChange={handleRole}
                  >
                    {roles.map(role => {
                      return (
                        <MenuItem key={role.id} value={role.id}>
                          {role.title}
                        </MenuItem>
                      );
                    })}
                  </SelectStyled>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}></Grid>
                <FieldGrid item xs={8}></FieldGrid>
                <FieldGrid item xs={4}>
                  <Button
                    onClick={attendeesAdded}
                    fullWidth
                    size="small"
                    variant="primary"
                  >
                    {t.components.addAttendees.saveTxt}
                  </Button>
                </FieldGrid>
              </Grid>
            </DialogContent>
          )}
        </DialogStyled>
      </>
    );
  }
);
