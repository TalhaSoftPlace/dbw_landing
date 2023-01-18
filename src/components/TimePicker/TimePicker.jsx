import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextFieldStyled } from './TimePicker.styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useTheme } from '@mui/material';

export const TimePicker = React.memo(
  ({ name, value, setFieldValue, placeholder, onChange }) => {
    const muiTheme = useTheme();

    const setTimePicker = React.useCallback(
      newValue => {
        onChange && onChange(newValue);
        setFieldValue && setFieldValue(name, newValue);
      },
      [onChange, setFieldValue, name]
    );

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MuiTimePicker
          value={value}
          onChange={setTimePicker}
          shouldDisableTime={(timeValue, clockType) => {
            return clockType === 'minutes' && timeValue % 15;
          }}
          renderInput={params => (
            <TextFieldStyled
              fullWidth
              sx={{
                svg: { color: muiTheme.palette.text.blueLight },
                color:'text.primaryText',
              }}
              {...params}
              inputProps={{
                ...params.inputProps,
                placeholder,
              }}
            />
          )}
          PopperProps={{
            sx: {
              "& .MuiClockPicker-root span": {
                color: `${muiTheme.palette.email.text.primaryText}`,
              },
              "& .MuiClockPicker-root  .Mui-selected": {
                color:`${muiTheme.palette.email.text.light}`,
              },
              "& .MuiIconButton-root span":{
                color:"inherit",
              },
            }
            }}
        />
      </LocalizationProvider>
    );
  }
);
