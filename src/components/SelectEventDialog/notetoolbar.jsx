import React, { useCallback, useMemo } from 'react';
import '../../containers/CalendarView/CalendarView.styles';
import { useRecoilState } from 'recoil';
import { noteEventAtom } from '../../atoms';
import moment from 'moment';
import {
  StyledButtonActions,
  StyledButtonDate,
  Wrapper,
  StyledMenu
} from './SelectEventDialog.styles';
import {CalendarDatePicker} from '../CalendarDatePicker';

export const Customtoolbar = React.memo(({dates,dateChanged,components}) => {
  const [{ date }, setNoteState] = useRecoilState(noteEventAtom);
  const [anchorEl, setAnchorEl] = React.useState(null);
    const open = useMemo(() => !!anchorEl, [anchorEl]);
    const handleClose = useCallback(() => {
      setAnchorEl(null);
    }, []);
    const handleClick = useCallback(event => {
      setAnchorEl(event?.currentTarget);
    }, []);
  const onPrevious = useCallback(() => {
    setNoteState((state) => ({
      ...state,
      date: moment(date).subtract(1, 'days'),
    }));
  }, [setNoteState, date]);

  const onNext = useCallback(() => {
    setNoteState((state) => ({ ...state, date: moment(date).add(1, 'days') }));
  }, [setNoteState, date]);

  const todayDate = useMemo(() => moment(date).format('MMMM D, YY'), [date]);

  const datepicker = useMemo(() => {
    return (
      <StyledMenu
        id="checkbox-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'checkbox-button',
        }}
        className="main-menu"
      >
        <CalendarDatePicker
          date={date}
          dateChanged={dateChanged}
          components={components}
          background={true}
          />
      </StyledMenu>
    );
  }, [anchorEl, components, date, dateChanged, handleClose, open]);

  return (
    <Wrapper>
      <StyledButtonActions onClick={onPrevious} variant="primary">
        {'Previous'}
      </StyledButtonActions>

      <StyledButtonDate variant="outlined-light" onClick={handleClick}>{todayDate}</StyledButtonDate>
      {datepicker}

      <StyledButtonActions onClick={onNext} variant="primary">
        {'Next'}
      </StyledButtonActions>
    </Wrapper>
  );
});
