import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Autocomplete,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useLocalization } from '../../hooks';
import {
  CloseIconStyled,
  DialogStyled,
  StyledTextField,
  FieldGrid,
  FieldLabel,
} from './AddUsers.styles';
import { Button } from '../Button';
import { useUsers } from '../../queries';

export const AddUsers = React.memo(({ values, setFieldValue }) => {
  const inputRef = useRef();
  const { data: { users = [] } = {} } = useUsers();
  const [usersDialog, setUsersDialog] = useState(false);
  const [addUserTextField, setAddUserTextField] = useState('');
  const [addUserTextFieldInputValue, setAddUserTextFieldInputValue] = useState('');

  useEffect(() => {
    if (inputRef.current && usersDialog) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [inputRef, usersDialog]);

  const handleChange = React.useCallback((e, newValue) => {
    setAddUserTextField(newValue);
  }, []);

  const handleTextFieldInputValue = React.useCallback(
    e => {
      if (e && e.target) setAddUserTextFieldInputValue(e.target.value);
      else if (addUserTextField)
        setAddUserTextFieldInputValue(addUserTextField.userName);
      else {
        setAddUserTextFieldInputValue('');
        setAddUserTextField('');
      }
    },
    [setAddUserTextFieldInputValue, addUserTextField, setAddUserTextField]
  );

  const addGroup = React.useCallback(() => {
    setFieldValue('userIds', [
      ...values.userIds,
      addUserTextField.id.toString(),
    ]);
    setUsersDialog(false);
    setAddUserTextField('');
    setAddUserTextFieldInputValue('');
  }, [addUserTextField, setFieldValue, values.userIds]);

  const handleClose = React.useCallback(() => {
    setUsersDialog(false);
    setAddUserTextField('');
  }, [setUsersDialog]);

  const handleOpen = React.useCallback(() => {
    setUsersDialog(true);
  }, [setUsersDialog]);

  const showUserLists = React.useMemo(() => {
    if (
      addUserTextFieldInputValue &&
      addUserTextFieldInputValue.length > 1 &&
      !addUserTextField
    ) {
      return true;
    } else {
      return false;
    }
  }, [addUserTextFieldInputValue, addUserTextField]);

  const notSelectedUsers = useMemo(() => {
    return users.filter(user => {
      return !values?.userIds?.includes(user.id.toString());
    });
  }, [values, users]);
  const { t } = useLocalization();
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          position: 'sticky',
          top: '100%',
          left: '100%',
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
        open={usersDialog}
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
                {t.components.addUsers.enterUser}
              </FieldLabel>
              <Autocomplete
                inputValue={addUserTextFieldInputValue}
                onInputChange={handleTextFieldInputValue}
                id="users-list"
                options={notSelectedUsers}
                getOptionLabel={option => option.userName || option}
                value={addUserTextField}
                onChange={handleChange}
                renderInput={params => (
                  <StyledTextField
                    inputRef={inputRef}
                    {...params}
                    placeholder="Enter User Email"
                  />
                )}
                open={showUserLists}
              />
            </Grid>
            <FieldGrid item xs={4}>
              <Button
                onClick={addGroup}
                fullWidth
                size="small"
                variant="primary"
              >
                {t.components.addUsers.saveTxt}
              </Button>
            </FieldGrid>
          </Grid>
        </DialogContent>
      </DialogStyled>
    </>
  );
});
