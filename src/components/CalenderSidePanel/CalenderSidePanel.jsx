import React from 'react';
import { Grid, MenuItem, useTheme  } from '@mui/material';
import { useRecoilState } from 'recoil';
import { calenderAtom } from '../../atoms';
import { useWindowResize } from '../../hooks';
import {
  CalenderFooter,
  CalendarDatePicker,
  ResponsiveMonthView,
} from '../../components';
import moment from 'moment';

import {
  SelectStyled,
  SidebarFooter,
  SidePanel,
  SidePanelMobile,
} from './CalenderSidePanel.styles';
import { AddEvent } from '../../containers';
import { useTags } from '../../queries';
import { makeStyles } from '@mui/styles';
import { useLocalization } from '../../hooks';
const useStyles = makeStyles(theme => ({
  menuPaper: {
    maxHeight: 254,
  },
}));

export const CalenderSidePanel = React.memo(() => {
  const { t } = useLocalization();
  const winSize = useWindowResize();
  const muiTheme = useTheme();
  const classes = useStyles();
  const [{ date, tag, view }, setCalenderState] = useRecoilState(calenderAtom);
  const { data: tags = [] } = useTags();
  const dateChanged = React.useCallback(
    newDate => {
      setCalenderState(state => ({
        ...state,
        date: newDate,
        view:
          Math.abs(moment(newDate).diff(moment(state.date), 'days')) < 32
            ? 'day'
            : state.view,
      }));
    },
    [setCalenderState]
  );

  const setType = React.useCallback(
    event => {
      setCalenderState(state => ({
        ...state,
        tag: event.target.value,
      }));
    },
    [setCalenderState]
  );
  const handleViewToggle = React.useCallback(() => {
    if (view === 'month') {
      setCalenderState(state => ({
        ...state,
        view: 'day',
      }));
    } else {
      setCalenderState(state => ({
        ...state,
        view: 'month',
      }));
    }
  }, [setCalenderState, view]);

  const selectEventTag = React.useMemo(() => {
    return (
      <SelectStyled
        background={muiTheme.palette.background.primary}
        caretcolor={muiTheme.palette.text.light}
        value={tag}
        onChange={setType}
        MenuProps={{ classes: { paper: classes.menuPaper } }}
      >
        <MenuItem value="all"  >
          {t.components.calenderSidePanel.allEvents}
        </MenuItem>
        
        {tags.map((tag, idx) => (
          <MenuItem key={tag + idx} value={tag} sx={{ maxWidth:'306px !important'}}>
            {tag}
          </MenuItem>
        ))}
      </SelectStyled>
    );
  }, [classes.menuPaper, muiTheme.palette.background.primary, muiTheme.palette.text.light, setType, t.components.calenderSidePanel.allEvents, tag, tags]);

  const monthbtnText = React.useMemo(() => {
    return view === 'month' ? 'day' : 'Month';
  }, [view]);

  return (
    <>
      <ResponsiveMonthView dayselct={handleViewToggle} monthbtn={monthbtnText}>
        {selectEventTag}
      </ResponsiveMonthView>

      {view === 'month' && winSize.width <= muiTheme.breakpoints.values.md && (
        <SidePanelMobile sx={{ pt: 5 }}>
          <Grid item xs={12} sx={{ pl: 2, mr: 2 }}>
            <CalendarDatePicker
              date={date}
              dateChanged={dateChanged}
            ></CalendarDatePicker>
          </Grid>
          <SidebarFooter item xs={12} sx={{ mb: 4 }}>
            <CalenderFooter />
          </SidebarFooter>
        </SidePanelMobile>
      )}
      <SidePanel>
        <Grid container>
          <Grid item xs={12} sx={{ pl: 2, pr: 2, pt: 1 }}>
            <AddEvent />
          </Grid>
          <Grid item xs={12} sx={{ pl: 2, mr: 2 }}>
            <CalendarDatePicker
              date={date}
              dateChanged={dateChanged}
            ></CalendarDatePicker>
          </Grid>
          <Grid item xs={12} sx={{ pl: 2, pr: 2, pt: 1 }}>
            {selectEventTag}
          </Grid>
          <SidebarFooter item xs={12}>
            <CalenderFooter />
          </SidebarFooter>
        </Grid>
      </SidePanel>
    </>
  );
});
