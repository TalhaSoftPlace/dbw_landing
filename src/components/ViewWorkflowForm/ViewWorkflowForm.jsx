import { Box, DialogContent, Grid, Typography } from '@mui/material';
import moment from 'moment-timezone';
import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FormViewer, Button } from '../../components';
import { useApproveWorkflowDocumentMutation } from '../../mutations';
import { Textarea } from '../NoteItem/NoteItem.styles';
import { CloseIconStyled, HistoryWrapper } from './ViewWorkflowForm.styles';

export const ViewWorkflowForm = React.memo(({ selectedWorkflowDocument }) => {
  const [note, setNote] = useState('');
  const navigate = useNavigate();
  const { workflowId } = useParams();
  const { mutateAsync: approveReject  , isLoading} = useApproveWorkflowDocumentMutation();
  const handleClose = useCallback(() => {
    navigate(`../details/${workflowId}`);
  }, [navigate, workflowId]);

  const json = useMemo(
    () =>
      selectedWorkflowDocument?.formDesignJson
        ? JSON.parse(selectedWorkflowDocument?.formDesignJson)
        : undefined,
    [selectedWorkflowDocument]
  );

  const formData = useMemo(
    () =>
      selectedWorkflowDocument?.formDataJSON
        ? JSON.parse(selectedWorkflowDocument?.formDataJSON)
        : undefined,
    [selectedWorkflowDocument]
  );

  const handeDescriptionChange = useCallback(e => {
    setNote(e.target.value);
  }, []);

  const handleApprove = useCallback(() => {
    approveReject({
      documentId: selectedWorkflowDocument?.id,
      level: selectedWorkflowDocument?.approvelLevel,
      status: 'A',
      notes: note,
    }).then(() => {});
  }, [
    approveReject,
    note,
    selectedWorkflowDocument?.approvelLevel,
    selectedWorkflowDocument?.id,
  ]);

  const handleReject = useCallback(() => {
    approveReject({
      documentId: selectedWorkflowDocument?.id,
      level: selectedWorkflowDocument?.approvelLevel,
      status: 'R',
      notes: note,
    }).then(() => {});
  }, [
    approveReject,
    note,
    selectedWorkflowDocument?.approvelLevel,
    selectedWorkflowDocument?.id,
  ]);

  return (
    <Box
      sx={{
        borderRadius: '10px',
        background: 'white',
        margin: '20px',
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'auto',
        position: 'relative',
        border:'2px solid #D4DAE5',
      }}
    >
      <DialogContent sx={{ paddingBlock: 2, paddingInline: '12px' }}>
        <Box
          sx={{
            position: 'absolute',
            top: '6px',
            right: '0px',
            height: '30px',
            width: '30px',
            background: 'white',
            borderRadius: '50%',
          }}
        >
          <CloseIconStyled sx={{ flexGrow: 0 , zIndex:'5' }} onClick={handleClose} />
        </Box>
        <Box sx={{zIndex:'4'}}>
          {!!json && (
            <FormViewer readonly json={json} formData={formData ?? {}} />
          )}
        </Box>
        <Box >
          {selectedWorkflowDocument?.approver &&
            selectedWorkflowDocument?.statusText === 'Waiting For Approval' && (
              <>
                <Grid container sx={{ marginTop: '10px' }}>
                  <Grid sx={{ display: 'flex' }} item xs={12}>
                    <Textarea
                      autoFocus
                      multiline
                      rows={3}
                      maxRows={3}
                      name="note"
                      onChange={handeDescriptionChange}
                      placeholder="Enter a note"
                      value={note}
                    />
                  </Grid>
                </Grid>
                <Grid container sx={{ marginTop: '10px' }}>
                  <Grid item xs={12} md={6}></Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '30px',
                    }}
                  >
                    <Button
                      texttransform="none"
                      onClick={handleReject}
                      variant="primaryGrey"
                      sx={{ width: '110px', lineHeight: 0 }}
                    >
                      Reject
                    </Button>
                    <Button
                      disabled={isLoading}
                      texttransform="none"
                      onClick={handleApprove}
                      variant="primaryLight"
                      sx={{ width: '110px', lineHeight: 0 }}
                    >
                      Approve 
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          <Box>
            <Typography sx={{ flexGrow: 1 }} variant="h6">
              Form History:
            </Typography>
            <HistoryWrapper>
              {selectedWorkflowDocument?.approvalHistory?.map((item , index) => (
                <p key={item + index}>
                  Document
                  {item.status === 'C'
                    ? ' submited '
                    : item.status === 'A'
                    ? ' approved '
                    : ' rejected '}
                  by {item.userName}
                  <span className="time">
                    {moment.utc(item.creationDateTime).local().format(
                      'MM.DD.YYYY - hh:mm a'
                    )} 
                  </span>

                  {item.notes && <>({item.notes})</>}
                </p>
              ))}
            </HistoryWrapper>
          </Box>
        </Box>
      </DialogContent>
    </Box>
  );
});
