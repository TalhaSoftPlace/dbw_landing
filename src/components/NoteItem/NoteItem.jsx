import { Box, Grid, IconButton, MenuItem } from '@mui/material';
import React, { useMemo, useRef } from 'react';
import { SelectStyled } from './NoteItem.styles';
import { DatePicker } from '../DatePicker';
import { MeetingNoteWrapper, Textarea } from './NoteItem.styles';
import DeleteIcon from '@mui/icons-material/Delete';

export const NoteItem = React.memo(
  ({ note, values, index, setFieldValue, attendees, isReadOnly }) => {
    const attachmentsUploadRef = useRef(null);
    const emails = useMemo(
      () => values?.attendees?.map((attendee) => attendee.name) || [],
      [values]
    );

    const handleNoteChange = React.useCallback(
      (newNote) => {
        setFieldValue(`meetingItems[${index}]`, newNote);
      },
      [index, setFieldValue]
    );

    const handleDelete = React.useCallback(() => {
      setFieldValue(
        `meetingItems`,
        values.meetingItems.filter((item) => item.id !== note.id)
      );
    }, [note.id, setFieldValue, values.meetingItems]);

    const filesUploaded = React.useCallback((file) => {
      if (file?.target?.files) {
        file.target.value = null;
      }
    }, []);

    const emailOptions = React.useMemo(() => {
      return emails.map((email) => {
        return (
          <MenuItem key={email} value={email}>
            {email}
          </MenuItem>
        );
      });
    }, [emails]);

    const handeDescriptionChange = React.useCallback(
      (e) => {
        handleNoteChange({ ...note, note: e.target.value });
      },
      [handleNoteChange, note]
    );

    const handleUserChange = React.useCallback(
      (e) => {
        handleNoteChange({ ...note, user: e.target.value });
      },
      [handleNoteChange, note]
    );

    const handeDateChange = React.useCallback(
      (e) => {
        handleNoteChange({ ...note, date: e });
      },
      [handleNoteChange, note]
    );

    return (
      <MeetingNoteWrapper spacing={2} container className={isReadOnly ? 'readonly' : ''}>
        <Grid sx={{ display: 'flex', p: 1 }} item sm={8} xs={12}>
          <Box>
            <IconButton
              onClick={handleDelete}
              sx={{ color: '#FF1616' }}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          <Textarea
            autoFocus
            multiline
            rows={3}
            maxRows={3}
            name={note.note}
            onChange={handeDescriptionChange}
            placeholder="Enter Text Here"
            value={note.note}
          />
        </Grid>
        <Grid item lg={12} sx={{ display: 'none' }}>
          <input
            type="file"
            ref={attachmentsUploadRef}
            onChange={filesUploaded}
          />
        </Grid>
        <Grid item sm={4} xs={12} sx={{ p: 1 }}>
          <Grid item sm={12}>
            <SelectStyled
              fullWidth
              onChange={handleUserChange}
              value={note.user}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Responsible Person
              </MenuItem>
              {emailOptions}
            </SelectStyled>
          </Grid>
          <Grid item sm={12} sx={{ mt: 2 }}>
            <DatePicker value={note.date} onChange={handeDateChange} />
          </Grid>
        </Grid>
      </MeetingNoteWrapper>
    );
  }
);
