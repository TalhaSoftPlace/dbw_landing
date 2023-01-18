import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TextFieldStyled } from './DatePicker.styles';
import { DatePicker as MuiDatePicker } from '@mui/lab';
import { useTheme } from '@mui/material';

export const DatePicker = React.memo(({ value, name, onChange, className }) => {
  const [open, setOpen] = React.useState(false);
  const muiTheme = useTheme();

  const toogleOpen = React.useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const toogleClose = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        open={open}
        onOpen={toogleOpen}
        onClose={toogleClose}
        value={value}
        name={name}
        onChange={onChange}
        inputFormat="MMMM dd, yyyy"
        renderInput={(params) => {
          return (
            <TextFieldStyled
              {...params}
              className={className}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                svg: { color: muiTheme.palette.text.blueLight },
              }}
              onClick={(e) => setOpen(true)}
              fullWidth
            />
          );
        }}
      />
    </LocalizationProvider>
  );
});
