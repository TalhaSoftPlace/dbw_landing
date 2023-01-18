import { Box } from '@mui/system';
import React, { useCallback, useMemo, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDeleteMeetingNoteMutation } from '../../mutations';
import IconButton from '@mui/material/IconButton';
import {
  NotesHeaderSection,
  DBWTable,
  LoadingOverlay,
  SearchBar,
  MeatingNotesPagination,
  MeetingNoteView,
  Loading,
  ContextMenu,
} from '../../components';
import { useLocalization } from '../../hooks';
import {
  StyledSpan,
  StyledSpanHeader,
  StyledBox,
  NotesList,
  NotesviewStyledBox,
  Delete,
} from './MeetingNotes.styles';
import { ConfirmationDialog } from '../../containers';
import moment from 'moment';
import { useTheme } from '@mui/material';
import { useEventNotes } from '../../queries';
import { noteEventAtom } from '../../atoms';
import { useRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const MeetingNotes = React.memo(() => {
  const [
    { tagName, date, page, size, searchTerm },
    setEventState,
  ] = useRecoilState(noteEventAtom);
  const navigate = useNavigate();
  const {
    data: { content: meetingNotes = [], totalElements } = {},
    isLoading,
  } = useEventNotes({
    searchTerm,
    tagName,
    fromDate: !!date ? moment(date) : undefined,
    toDate: !!date ? moment(date) : undefined,
    page,
    size,
  });

  const { calendarEventId } = useParams();
  const [selectedEvent, setSelectedEvent] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useLocalization();

  const { mutateAsync: deleteNote } = useDeleteMeetingNoteMutation();

  useEffect(() => {
    setEventState(state => ({ ...state, total: totalElements }));
  }, [setEventState, totalElements]);
  const rowClicked = useCallback(
    note => {
      navigate(`details/${note.calendarEventId}`);
    },
    [navigate]
  );
  const handleClose = React.useCallback(() => {
    navigate(`details`);
    setOpenDialog(false);
  }, [navigate]);

  const handleOpen = useCallback(row => {
    setOpenDialog(true);
    setSelectedEvent(row.eventId);
  }, []);

  const muiTheme = useTheme();
  const tableData = useMemo(
    () =>
      (!!meetingNotes &&
        meetingNotes?.map(note => ({
          id: note.id,
          eventId: note.eventId,
          calendarEventId: note.calendarEventId,
          subject: note.title,
          tag: '',
          organizer: note.userName,
          creationDate: note.createdAt,
          eventDate: note?.eventDate,
        }))) ||
      [],
    [meetingNotes]
  );
  const handleDelete = useCallback(
    row => {
      !isLoading &&
        deleteNote({ eventId: selectedEvent }).then(() => {
          handleClose();
        });
    },
    [deleteNote, handleClose, isLoading, selectedEvent]
  );

  const generateRowContent = useCallback(
    row => {
      const EventDate = moment(row?.eventDate).format('MMM-DD-YYYY');
      const CreationDate = moment(row.creationDate).format('MMM-DD-YYYY');

      const menuItems = [
        { name: 'View', onClick: () => rowClicked(row) },
        { name: 'Delete', onClick: () => handleOpen(row) },
      ];
      return {
        subject: (
          <StyledSpan
            sx={{
              paddingBlock: '12px',
            }}
          >
            {row.subject}
          </StyledSpan>
        ),
        eventDate: <StyledSpan>{EventDate}</StyledSpan>,
        creationDate: <StyledSpan>{CreationDate}</StyledSpan>,
        organizer: (
          <StyledSpan sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
            {row.organizer}
          </StyledSpan>
        ),
        action: (
          <ContextMenu menuItems={menuItems} anchorOrigin="left">
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls="1"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
          </ContextMenu>
        ),
      };
    },
    [handleOpen, rowClicked]
  );

  const generateHeader = useCallback(() => {
    return {
      subject: (
        <StyledSpanHeader sx={{ pl: '20px' }}>
          {t.container.meetingNotes.meetingSubject}
        </StyledSpanHeader>
      ),
      eventDate: (
        <StyledSpanHeader>
          {t.container.meetingNotes.eventDate}
        </StyledSpanHeader>
      ),
      creationDate: (
        <StyledSpanHeader>
          {t.container.meetingNotes.notesDate}
        </StyledSpanHeader>
      ),
      ogranizer: (
        <StyledSpanHeader
          sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}
        >
          {t.container.meetingNotes.organizer}
        </StyledSpanHeader>
      ),
      action: (
        <StyledSpanHeader
          sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}
        >
          {t.container.meetingNotes.action}
        </StyledSpanHeader>
      ),
    };
  }, [t]);

  const handleBack = useCallback(() => {}, []);

  return (
    <>
      {!tableData ? (
        <LoadingOverlay />
      ) : (
        <>
          {!!calendarEventId ? (
            <NotesviewStyledBox>
              <MeetingNoteView
                onBack={handleBack}
                calendarEventId={calendarEventId}
              />
            </NotesviewStyledBox>
          ) : (
            <StyledBox>
              <NotesHeaderSection
                heading={t.meatingNotes.title}
                subHeading={t.meatingNotes.subtitle}
                headerAction={<SearchBar placeholder={t.meatingNotes.search} />}
              >
                <Box sx={{ mb: 1 }} className="headingborder" />
                <NotesList>
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <DBWTable
                      generateHeader={generateHeader}
                      generateRowContent={generateRowContent}
                      data={tableData}
                      headingBackground={muiTheme.palette.background.dark}
                      itemBackground={muiTheme.palette.background.tableitembg}
                      headingColor={muiTheme.palette.text.grey}
                      itemColor={muiTheme.palette.text.grey}
                      padding={10}
                    />
                  )}
                </NotesList>
                <Box className="pagination">
                  <MeatingNotesPagination />
                </Box>
              </NotesHeaderSection>
              <ConfirmationDialog
                title="Are You Sure ?"
                subtitle="Do you realy want to delete this record."
                open={openDialog}
                handleClose={handleClose}
                handleDelete={handleDelete}
                cancelbtn="Cancel"
                deletebtn="Delete"
              >
                <Delete />
              </ConfirmationDialog>
            </StyledBox>
          )}
        </>
      )}
    </>
  );
});
