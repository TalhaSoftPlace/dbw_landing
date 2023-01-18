import React, { useCallback } from 'react';
import { DBWTable } from '../DBWTable';
import {
  StyledSpan,
  StyledTh,
} from '../MeetingAttendees/MeetingAttendees.styles';

import { useTheme } from '@mui/material';
import { useRecoilState } from 'recoil';
import { useCalendarEvents } from '../../queries';
import moment from 'moment';
import { noteEventAtom } from '../../atoms';
import { useNavigate } from 'react-router-dom';

export const DataTable = React.memo(({ onClose }) => {
  const [{ date }] = useRecoilState(noteEventAtom);
  const { data: events = [] } = useCalendarEvents({
    fromDate: moment(date).startOf('day'),
    toDate: moment(date).endOf('day'),
  });
  const navigate = useNavigate();

  const muiTheme = useTheme();
  const generateRowContent = useCallback(row => {
    return {
      EventTime: (
        <StyledSpan sx={{ pl: 3, cursor: 'pointer' }}>
          {moment(row?.start).format('h:mm a,MMMM D, YY')}
        </StyledSpan>
      ),
      EventName: (
        <StyledSpan sx={{ cursor: 'pointer' }}>{row.title}</StyledSpan>
      ),
    };
  }, []);

  const generateHeader = useCallback(() => {
    return {
      EventTime: <StyledTh sx={{ pl: 6 }}>Event Time</StyledTh>,
      EventName: <StyledTh>Event Name</StyledTh>,
    };
  }, []);

  const rowClicked = useCallback(
    event => {
      navigate(`details/${event.calendarEventId}`);
      onClose();
    },
    [navigate, onClose]
  );

  return (
    <DBWTable
      generateHeader={generateHeader}
      generateRowContent={generateRowContent}
      data={events}
      rowClicked={rowClicked}
      headingBackground={muiTheme.palette.background.lightGray}
      itemBackground={muiTheme.palette.background.lightGray}
      headingColor={muiTheme.palette.text.blueDark}
      itemColor={muiTheme.palette.text.greyLight}
      padding={20}
    />
  );
});
