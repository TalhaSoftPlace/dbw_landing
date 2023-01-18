import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TextFieldStyled , StyledDatePicker} from './DatePicker.styles';

import { useTheme } from '@mui/material';

export const DatePicker = React.memo(
  ({ value, name, onChange, className, disabled }) => {
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
        <StyledDatePicker
        labelColor={muiTheme.palette.email.text.calendarText}
          open={open}
          onOpen={toogleOpen}
          onClose={toogleClose}
          value={value}
          name={name}
          disabled={disabled}
          onChange={onChange}
          inputFormat="MMMM dd, yyyy"
          renderInput={params => {
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
                onClick={e => setOpen(true)}
                fullWidth
              />
            );
          }}
          PopperProps={{
            sx: {
              "& .MuiPaper-root": {
                padding: 2,
                marginTop: 1,
                color: `${muiTheme.palette.email.text.primaryText}`,
              },
              
              "& .PrivatePickersSlideTransition-root": {
                color: `${muiTheme.palette.email.text.primaryText}`,
              },
              "& .MuiPickersDay-dayWithMargin": {
                color:`${muiTheme.palette.email.text.primaryText}`,
              },
              "& .Mui-selected": {
                color:`${muiTheme.palette.email.text.light}`,
              },
            }
            }}
        />
      </LocalizationProvider>
    );
  }
);
