import React, { useState, useCallback, useMemo } from 'react';
import { Grid, MenuItem, useTheme } from '@mui/material';
import { useRecoilState } from 'recoil';
import { noteEventAtom } from '../../atoms';
import { useTags } from '../../queries';
import { CalenderFooter, CalendarDatePicker } from '..';
import { Button, NotesResponsiveCalenderView } from '../../components';
import { useLocalization } from '../../hooks';
import {
  SelectStyled,
  SidebarFooter,
  Wrapper,
  SidePanel,
  SidePanelMobile,
} from './NotesSidepanel.styles';
import { SelectEventDialog } from '../SelectEventDialog';
import { Customtoolbar } from '../SelectEventDialog/notetoolbar';
import { makeStyles } from '@mui/styles';
import { useToggle } from '../../hooks';
const useStyles = makeStyles((theme) => ({
  menuPaper: {
    maxHeight: 254,
  },
}));
export const NotesSidepanel = React.memo(() => {
  const [dialogOpen, setdialogOpen] = useState(false);
  const [viewSidebar, toggleviewSidebar] = useToggle(false);
  const [monthbtnText, setmonthbtnText] = useState('Calendar');
  const { data: tags = [] } = useTags();
  const muiTheme = useTheme();
  const classes = useStyles();
  const { t } = useLocalization();
  const [{ date, tagName }, setCalenderState] = useRecoilState(noteEventAtom);

  const dateChanged = React.useCallback(
    (newDate) => {
      setCalenderState((state) => ({
        ...state,
        date: newDate,
      }));
      toggleviewSidebar();
    },
    [setCalenderState, toggleviewSidebar]
  );

  const handleClose = useCallback(() => {
    setdialogOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setdialogOpen(true);
  }, []);

  const setType = React.useCallback(
    (event) => {
      const selectedTag = event.target.value;
      if (selectedTag === 'all') {
        setCalenderState((state) => ({
          ...state,
          tagName: 'all',
        }));
      } else {
        setCalenderState((state) => ({
          ...state,
          tagName: selectedTag,
        }));
      }
    },
    [setCalenderState]
  );

  const clearFilter = React.useCallback(() => {
    setCalenderState((state) => ({
      ...state,
      date: undefined,
      tagName: 'all',
    }));
  }, [setCalenderState]);

  const showSidebar = React.useCallback(() => {
    if (!viewSidebar) {
      toggleviewSidebar();
      setmonthbtnText('Notes');
    } else {
      toggleviewSidebar();
      setmonthbtnText('Calendar');
    }
  }, [toggleviewSidebar, viewSidebar]);
  const tagsOptions = useMemo(() => {
    return tags.map((tag, idx) => (
      <MenuItem key={tag + idx} value={tag} sx={{width:'300px !important'}}>
        {tag}
      </MenuItem>
    ));
  }, [tags]);
  const components = useMemo(() => ({ toolbar: Customtoolbar }), []);
  const selectEventTag = React.useMemo(() => {
    return (
      <SelectStyled
        background={muiTheme.palette.background.primary}
        caretcolor={muiTheme.palette.text.light}
        value={tagName}
        onChange={setType}
        MenuProps={{ classes: { paper: classes.menuPaper } }}
      >
        <MenuItem value="all">All Meeting Notes</MenuItem>
        {tagsOptions}
      </SelectStyled>
    );
  }, [classes.menuPaper, muiTheme.palette.background.primary, muiTheme.palette.text.light, setType, tagName, tagsOptions]);
  return (
    <>
      <NotesResponsiveCalenderView
        handleOpen={handleOpen}
        monthbtn={monthbtnText}
        dayselct={showSidebar}
      >
        {selectEventTag}
      </NotesResponsiveCalenderView>
      {viewSidebar && (
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
        <Wrapper>
          <Grid container sx={{ pt: 1 }}>
            <Grid item xs={12} sx={{ pl: 2, pr: 2 }}>
              <Button
                onClick={handleOpen}
                className="new_notes"
                texttransform="none"
                fullWidth
                variant="primary" 
                size="large"
              >
                {t.Notes.newNotes}
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ pl: 2, mr: 2 }}>
              <CalendarDatePicker
                date={date}
                dateChanged={dateChanged}
                components={components}
              />
            </Grid>

            <SelectEventDialog
              handleClose={handleClose}
              dialogOpen={dialogOpen}
              date={date}
              dateChanged={dateChanged}
              components={components}

            />

            <Grid item xs={12} sx={{ pl: 2, pr: 2, pt: 1 }}>
              {selectEventTag}
            </Grid>
            <Grid item xs={12} sx={{ pl: 2, pr: 2, pt: 3 }}>
              <Button
                onClick={clearFilter}
                className="new_notes"
                texttransform="none"
                fullWidth
                variant="primary"
                size="large"
              >
                {t.Notes.resetNotes}
              </Button>
            </Grid>
            <SidebarFooter item xs={12}>
              <CalenderFooter />
            </SidebarFooter>
          </Grid>
        </Wrapper>
      </SidePanel>
    </>
  );
});
