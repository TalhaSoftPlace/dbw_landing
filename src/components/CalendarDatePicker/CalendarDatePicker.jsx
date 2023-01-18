import React, { useMemo } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPickerStyled } from './CalendarDatePicker.styles';
import { useTheme } from '@mui/material';
import moment from 'moment';

export const CalendarDatePicker = React.memo(({ date, dateChanged }) => {
  const muiTheme = useTheme();
  const d = useMemo(() => moment(date).toDate(), [date]);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CalendarPickerStyled
          labelColor={muiTheme.palette.email.text.calendarText}
          showDaysOutsideCurrentMonth={true}
          calenderBackground={muiTheme.palette.email.background.calenderPickerBackground}
          date={d}
          onChange={(newDate) => dateChanged(newDate)}
        />
      </LocalizationProvider>
    </>
  );
});
