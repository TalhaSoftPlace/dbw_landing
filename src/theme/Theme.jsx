import React from 'react';
import { useRecoilValue } from 'recoil';
import { themeModeAtom } from '../atoms';
import { themeValues } from './themeValues';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import * as locales from '@mui/material/locale';
import { useLocalization } from '../hooks';

export const Theme = (props) => {
  const mode = useRecoilValue(themeModeAtom);
  const { local } = useLocalization();
  const theme = React.useMemo(
    () =>
      responsiveFontSizes(
        createTheme(themeValues(mode), locales[local.replaceAll('-', '')])
      ),
    [mode, local]
  );

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
