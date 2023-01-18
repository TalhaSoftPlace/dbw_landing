import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { BoxStyled, EmailLabel , OrganizerIcon } from './AttendeesBox.styles';
import { Grid, IconButton } from '@mui/material';
import { AddAttendees } from '../AddAttendees';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteAttendeeMutation } from '../../mutations';
import { eventFormAtom } from '../../atoms';
import { useRecoilValue } from 'recoil';

const roles = [
  {
    id: 'attendee',
    title: 'Attendee',
  },
  {
    id: 'editor',
    title: 'Editor',
  },
];

const rolesIcon = {
  editor: <EditIcon sx={{ color: 'text.blueLight', fontSize: 20 }} />,
  organizer: <OrganizerIcon sx={{ color: 'text.blueLight' ,fontSize: 20}} />,
  attendee: <PersonIcon sx={{ color: 'text.blueLight', fontSize: 20 }} />,
};

export const AttendeesBox = React.memo(
  ({ values, setFieldValue, handleChange, makeRequest = false }) => {
    const [dialogOpen, setDislogOpen] = React.useState(false);
    const [attendees, setAttendees] = React.useState([]);
    const [selectedRole, setSelectedRole] = React.useState('attendee');
    const { event } = useRecoilValue(eventFormAtom);
    const { mutateAsync: deleteAtendee, isLoading } =
      useDeleteAttendeeMutation();

    const removeEmail = React.useCallback(
      (email) => {
        if (!isLoading) {
          const updatedAtendees = values.attendees.filter((attendee) => {
            return attendee.email !== email;
          });
          makeRequest &&
            deleteAtendee({
              eventId: event?.eventId,
              attendeeName: email,
            }).then(() => {});
          setFieldValue('attendees', updatedAtendees);
        }
      },
      [
        isLoading,
        values.attendees,
        makeRequest,
        deleteAtendee,
        event?.eventId,
        setFieldValue,
      ]
    );

    const attendeesList = React.useMemo(() => {
      return values?.attendees?.map((attendee) => {
        return (
          <Grid key={attendee.email} container columnSpacing={2}>
            <Grid key={attendee.email + 'icon'} item xs={2}>
              {rolesIcon[attendee.role]}
            </Grid>
            <Grid key={attendee.email + 'email'} item xs={8}>
              <EmailLabel>{attendee.email}</EmailLabel>
            </Grid>

            <Grid key={attendee.email + 'delete'} item xs={1}>
              <IconButton
                onClick={() => removeEmail(attendee.email)}
                sx={{ p: 0 }}
              >
                <DeleteIcon sx={{ color: 'background.redbg', fontSize: 16 }} />
              </IconButton>
            </Grid>
          </Grid>
        );
      });
    }, [values, removeEmail]);

    return (
      <BoxStyled>
        {attendeesList}

        <ContentCopyIcon
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            color: 'text.blueLight',
            cursor: 'pointer',
          }}
        />
        <AddAttendees
          {...{
            values,
            setFieldValue,
            roles,
            handleChange,
            dialogOpen,
            setDislogOpen,
            attendees,
            setAttendees,
            selectedRole,
            setSelectedRole,
            makeRequest,
          }}
        />
      </BoxStyled>
    );
  }
);
