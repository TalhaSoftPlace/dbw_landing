import React, { useCallback } from 'react';
import { MeetingnotesArea, NotesviewStyledBox } from './NotesApp.styles';
import { Box } from '@mui/material';
import {
  LoadingOverlay,
  NotesSidepanel,
  MeetingNoteView,
} from '../../components';
import { useAuth } from '../../hooks';
import { MeetingNotes } from '../../containers';
import { Route, Routes, useNavigate } from 'react-router-dom';

export const NotesApp = React.memo(() => {
  const { user } = useAuth({ redirect: true });
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate('/workspace/meeting-notes');
  }, [navigate]);
  return (
    <>
      {!user ? (
        <LoadingOverlay />
      ) : (
        <MeetingnotesArea>
          <Box className="notesview">
            <NotesSidepanel />
            <Box sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" exact element={<MeetingNotes />} />
                <Route
                  path="/details/:calendarEventId"
                  exact
                  element={
                    <NotesviewStyledBox>
                      <MeetingNoteView onBack={handleBack} />
                    </NotesviewStyledBox>
                  }
                />
              </Routes>
            </Box>
          </Box>
        </MeetingnotesArea>
      )}
    </>
  );
});
