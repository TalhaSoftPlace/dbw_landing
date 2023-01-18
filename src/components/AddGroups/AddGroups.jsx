import React, { useState } from 'react';
import { DialogContent, DialogTitle, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useLocalization } from '../../hooks';
import {
  CloseIconStyled,
  DialogStyled,
  StyledTextField,
} from './AddGroups.styles';
import { FieldGrid, FieldLabel } from './AddGroups.styles';
import { Button } from '../Button';

export const AddGroups = React.memo(({ values, setFieldValue }) => {
  const [groupsDialog, setGroupsDialog] = useState(false);
  const [addGroupTextField, setAddGroupTextField] = useState('');

  const handleChange = React.useCallback(e => {
    setAddGroupTextField(e.target.value);
  }, []);

  const addGroup = React.useCallback(() => {
    setFieldValue('groups', [...values.groups, addGroupTextField]);
    setGroupsDialog(false);
    setAddGroupTextField('');
  }, [addGroupTextField, setFieldValue, values.groups]);

  const handleClose = React.useCallback(() => {
    setGroupsDialog(false);
    setAddGroupTextField('');
  }, [setGroupsDialog]);

  const handleOpen = React.useCallback(() => {
    setGroupsDialog(true);
  }, [setGroupsDialog]);
  const { t } = useLocalization();
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          position: 'absolute',
          bottom: 5,
          right: 5,
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <AddIcon
          sx={{
            color: 'text.blueLight',
          }}
        />
      </IconButton>

      <DialogStyled
        open={groupsDialog}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <DialogTitle sx={{ pb: 0 }}>
          <CloseIconStyled onClick={handleClose} />
        </DialogTitle>
        <DialogContent>
          <Grid container sx={{ pt: 2 }}>
            <Grid item xs={12}>
              <FieldLabel sx={{ mb: 1 }}>
                {t.components.addGroups.enterGroup}:
              </FieldLabel>
              <StyledTextField
                value={addGroupTextField}
                onChange={handleChange}
              />
            </Grid>
            <FieldGrid item xs={4}>
              <Button
                onClick={addGroup}
                fullWidth
                size="small"
                variant="primary"
              >
                {t.components.addGroups.saveTxt}
              </Button>
            </FieldGrid>
          </Grid>
        </DialogContent>
      </DialogStyled>
    </>
  );
});
