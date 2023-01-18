import React, { useCallback } from 'react';
import { DBWTable } from '../DBWTable';
import {
  StyledSpan,
  StyledTh,
  TextFieldStyle,
} from './MeetingAttendees.styles';
import { useTheme , Accordion , AccordionSummary , AccordionDetails } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReactComponent as AttendeeIcons } from '../../images/notesAttendeeIcon.svg';
export const MeetingAttendees = React.memo(({ values, setFieldValue , isReadOnly }) => {
  const muiTheme = useTheme();
  const generateRowContent = useCallback(
    (row) => {
      const handleDepartmentChange = (e) => {
        setFieldValue(
          'attendees',
          values.attendees.map((attendee) => {
            if (attendee.id === row.id) {
              return { ...attendee, department: e.target.value };
            } else {
              return attendee;
            }
          })
        );
      };
      const handleJobTitleChange = (e) => {
        setFieldValue(
          'attendees',
          values.attendees.map((attendee) => {
            if (attendee.id === row.id) {
              return { ...attendee, jobTitle: e.target.value };
            } else {
              return attendee;
            }
          })
        );
      };
      return {
        name: <StyledSpan sx={{ pl: '3px' }}>{row.name}</StyledSpan>,
        department: (
          <TextFieldStyle
            value={row.department}
            onChange={handleDepartmentChange}
          ></TextFieldStyle>
        ),
        jobTitle: (
          <TextFieldStyle
            value={row.jobTitle}
            onChange={handleJobTitleChange}
          ></TextFieldStyle>
        ),
      };
    },
    [ setFieldValue, values.attendees]
  );
  const generateHeader = useCallback(() => {
    return {
      name: <StyledTh sx={{ pl: 3 }}>Name</StyledTh>,
      department: (
        <StyledTh >
          Department
        </StyledTh>
      ),
      jobTitle: (
        <StyledTh >
          Job Title
        </StyledTh>
      ),
    };
  }, []);

  return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{color:'email.text.primaryText'}}><AttendeeIcons /> Attendees</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{overflow:'auto', maxHeight:'160px'}}>
          <DBWTable
          generateHeader={generateHeader}
          generateRowContent={generateRowContent}
          data={values.attendees}
          headingBackground={muiTheme.palette.background.tableattendeebg}
          itemBackground={muiTheme.palette.background.tableattendeebg}
          headingColor={muiTheme.palette.text.blueLight}
          itemColor={muiTheme.palette.text.greyLight}
          padding={20}
         />
        </AccordionDetails>
      </Accordion>
  );
});
