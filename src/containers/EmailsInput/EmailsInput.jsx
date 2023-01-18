import React, { useCallback, useMemo, useState } from 'react';
import { TextFieldStyled, EmailInputAutoComplete } from './EmailsInput.styles';
import { useContacts, useUserEmailGroups } from './../../queries';

export const EmailsInput = React.memo(
  ({ name, values, setFieldValue, autoFocus = false }) => {
    const [search, setSearch] = useState('');
    const { data: searchResults = [], isFetching } = useContacts({ search });
    const { data: emailGroups = [] } = useUserEmailGroups();
    const isValidEmail = useMemo(() => String(search)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ), [search]);

    const emails = useMemo(
      () => {
        const mails = searchResults.map((r) => r.contactName);
        const groups = emailGroups.map((g) => "+" + g.groupName);
        if (search?.startsWith("+")) {
          return [...groups, mails];
        }
        return mails;
      },
      [emailGroups, search, searchResults]
    );
    const tagHandleChange = useCallback(
      (event, newValue) => {

        setFieldValue(name, newValue?.filter((i) => !i.startsWith("+")));
      },
      [setFieldValue, name]
    );

    const onInputChange = useCallback(
      (e) => {
        setSearch(!!e.target.value ? e.target.value : "");
      },
      [setSearch]
    );

    const handleKeyDown = React.useCallback((event) => {
      switch (event.key) {
        case ',':
        case ' ': {
          event.preventDefault();
          event.stopPropagation();
          break;
        }
        default:
      }
    }, []);

    return (
      <EmailInputAutoComplete
        loading={isFetching}
        autoFocus={autoFocus}
        autoSelect
        multiple
        freeSolo={!!isValidEmail}
        size="small"
        options={emails}
        getOptionLabel={(option) => !!option?.length ? option?.email ?? option : ''}
        value={values?.[name]}
        onChange={tagHandleChange}
        onInputChange={onInputChange}
        filterSelectedOptions
        sx={{ color: 'text.primaryText', mb: 1 }}
        className="mailToChip"
        renderInput={(params) => {
          params.inputProps.onKeyDown = handleKeyDown;
          return (
            <TextFieldStyled
              autoFocus={autoFocus}
              variant="standard"
              className="mailToChip"
              sx={{color:'text.primaryText'}}
              {...params}
            />
          );
        }}
      />
    );
  }
);
