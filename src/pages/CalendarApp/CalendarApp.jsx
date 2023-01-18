import React from 'react';
import { CalendarArea } from './CalendarApp.styles';
import { Box } from '@mui/material';
import { CalenderSidePanel, LoadingOverlay } from '../../components';
import { useAuth } from '../../hooks';
import { CalendarView } from '../../containers';
import { Navigate, Route, Routes } from 'react-router-dom';

export const CalendarApp = React.memo(() => {
  const { user } = useAuth({ redirect: true });

  return (
    <>
      {!user ? (
        <LoadingOverlay />
      ) : (
        <CalendarArea>
          <Box sx={{ display: 'flex' }} className="calendarview">
            <CalenderSidePanel />
            <Box sx={{ flexGrow: 1 }} className="calendarrightpanel">
              <Routes>
                <Route path="/" element={<CalendarView />} />
                <Route path="/*" element={<Navigate to="/" />} />
              </Routes>
            </Box>
          </Box>
        </CalendarArea>
      )}
    </>
  );
});
