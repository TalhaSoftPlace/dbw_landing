import React, { useCallback, useMemo } from 'react';
import { useLocalization } from '../../hooks';
import { FormControl, MenuItem, Box } from '@mui/material';
import { translations } from '../../constants';
import { IconGlobeStyled, StyledSelect } from './LanguageSelect.styles';
import Flag from 'react-flagkit';

export const LanguageSelect = React.memo(() => {
  const { local, setLocal } = useLocalization();
  const [myFlag, setFlag] = React.useState('US');
  const handleChange = useCallback(
    (e) => {
      const selectedCountry = e.target.value.split('-')[1];
      setFlag(selectedCountry);
      setLocal(e.target.value);
    },
    [setLocal]
  );

  const options = useMemo(
    () =>
      Object.entries(translations).map(([key, { name = 'No name' }]) => (
        <MenuItem key={key} value={key}>
          {name}
        </MenuItem>
      )),
    []
  );

  return (
    <FormControl
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
      }}
      fullWidth
    >
      <Box>
        <IconGlobeStyled>
          <Flag country={myFlag} />
        </IconGlobeStyled>
      </Box>
      <StyledSelect
        displayEmpty
        variant="standard"
        disableUnderline={true}
        value={local}
        onChange={handleChange}
      >
        {options}
      </StyledSelect>
    </FormControl>
  );
});
