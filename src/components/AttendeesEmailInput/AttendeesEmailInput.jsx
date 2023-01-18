import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRef } from 'react';
import { useLocalization } from '../../hooks';
import { useContacts } from '../../queries';
import {
  TextFieldStyled,
  AttendeesAutocomplete,
} from './AttendeesEmailInput.styles';

const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const AttendeesEmailInput = React.memo(
  ({ placeholder, attendees, setAttendees }) => {
    const [search, setSearch] = useState('');
    const { data: searchResults = [], isFetching } = useContacts({ search });
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useLocalization();
    const inputRef = useRef();

    const emails = useMemo(() => searchResults.map(r => r.contactName), [
      searchResults,
    ]);

    useEffect(() => {
      if (inputRef.current) {
        setTimeout(() => inputRef.current.focus(), 0);
      }
    }, [inputRef]);

    const tagHandleChange = useCallback(
      (event, newValue) => {
        const lastAdded = newValue[newValue.length - 1];
        if (!validateEmail(lastAdded) && newValue.length > 0) {
          enqueueSnackbar(t.addEvent.invalidEmail, {
            variant: 'error',
          });
          return;
        }
        setAttendees(newValue);
        setSearch('');
      },
      [setAttendees, enqueueSnackbar, t.addEvent.invalidEmail, setSearch]
    );

    const handleKeyDown = React.useCallback(
      event => {
        switch (event.key) {
          case ',':
          case ' ': {
            event.preventDefault();
            event.stopPropagation();
            if (event.target.value.length > 0) {
              if (validateEmail(event.target.value)) {
                setAttendees([...attendees, event.target.value]);
                setSearch('');
              } else {
                enqueueSnackbar(t.addEvent.invalidEmail, {
                  variant: 'error',
                });
              }
            }
            break;
          }
          default:
        }
      },
      [enqueueSnackbar, attendees, setAttendees, t, setSearch]
    );

    const onInputChange = useCallback(
      e => {
        setSearch(e.target.value);
      },
      [setSearch]
    );

    return (
      <AttendeesAutocomplete
        inputValue={search}
        loading={isFetching}
        autoSelect
        placeholder={placeholder}
        multiple
        freeSolo
        options={emails}
        getOptionLabel={option => option.email || option}
        value={attendees}
        onChange={tagHandleChange}
        onInputChange={onInputChange}
        filterSelectedOptions
        renderInput={params => {
          params.inputProps.onKeyDown = handleKeyDown;
          return (
            <TextFieldStyled
              inputRef={inputRef}
              placeholder={placeholder}
              {...params}
            />
          );
        }}
      />
    );
  }
);
