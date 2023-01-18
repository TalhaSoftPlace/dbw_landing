import React, { useCallback } from 'react';
import { TextFieldStyled, EventTagsAutocomplete } from './EventTagInput.styles';
import { useTags } from '../../queries';

export const EventTagInput = React.memo(
  ({ name, values, setFieldValue, placeholder }) => {
    const { data: tags = [], isFetching } = useTags();
    const tagHandleChange = useCallback(
      (event, newValue) => {
        setFieldValue(name, newValue);
      },
      [setFieldValue, name]
    );

    return (
      <EventTagsAutocomplete
        loading={isFetching}
        placeholder={placeholder} 
        autoSelect
        multiple
        freeSolo
        options={tags}
        getOptionLabel={(option) => option?.tag || option}
        value={values?.[name]}
        onChange={tagHandleChange}
        filterSelectedOptions
        renderInput={(params) => {
          return <TextFieldStyled placeholder={placeholder} {...params} />;
        }}
      />
    );
  }
);
