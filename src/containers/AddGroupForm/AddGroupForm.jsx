import React, { useCallback } from 'react';
import { Grid, Typography } from '@mui/material';
import {
  FieldLabel,
  BoxStyled,
  ColumnGrid,
  GroupNameInput,
  GroupDescriptionInput,
} from './AddGroupForm.styles.js';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddUsers } from '../../components/AddUsers/AddUsers';
import { useSnackbar } from 'notistack';
import { getErrorsArrayfromFormikErrors } from '../../utils';
import { useUsers } from '../../queries/useUsers.jsx';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/index.js';
import { useLocalization } from '../../hooks';

export const AddGroupForm = React.memo(
  ({ handleChange, values, setFieldValue, handleSubmit, errors }) => {
    const { data: { users = [] } = {} } = useUsers();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const submit = useCallback(() => {
      getErrorsArrayfromFormikErrors(errors).forEach(error => {
        enqueueSnackbar(error, { variant: 'error' });
      });
      handleSubmit();
    }, [enqueueSnackbar, errors, handleSubmit]);

    const cancel = useCallback(() => {
      navigate('/admin/users-and-groups/groups');
    }, [navigate]);

    const deleteGroupItem = React.useCallback(
      item => {
        setFieldValue(
          'userIds',
          values.userIds.filter(x => x !== item)
        );
      },
      [values.userIds, setFieldValue]
    );

    const getUserNameById = React.useCallback(
      id => {
        return users.find(user => user.id.toString() === id.toString())
          ?.userName;
      },
      [users]
    );

    const UsersList = React.useMemo(() => {
      return values?.userIds?.map((value, index) => {
        return (
          <Grid key={index} item xs={12} lg={12} xl={12} md={12} sx={{ mb: 0 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xl={10}>
                <Typography
                  sx={{ color: 'text.light', fontSize: '1rem !important' }}
                >
                  {getUserNameById(value)}
                </Typography>
              </Grid>
              <Grid item xl={2} textAlign="right">
                <IconButton
                  sx={{ color: 'red' }}
                  onClick={() => deleteGroupItem(value)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        );
      });
    }, [values.userIds, deleteGroupItem, getUserNameById]);
    const { t } = useLocalization();
    return (
      <Grid
        container
        spacing={6}
        sx={{
          justifyContent: 'center',
          paddingTop: '50px',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <>
          <ColumnGrid item lg={6} xl={6} sm={12} md={12} xs={12}>
            <FieldLabel>{t.container.addGroupFrom.groupName}</FieldLabel>
            <GroupNameInput
              type="text"
              id="groupName"
              name="groupName"
              value={values.groupName}
              onChange={handleChange}
              className={errors.groupName ? 'Group Name Error' : ''}
              style={{
                border: `1px solid ${errors.groupName} ? '#fc8181' : ''`,
              }}
            />
            <FieldLabel>{t.container.addGroupFrom.usersList}</FieldLabel>
            <BoxStyled>
              <Grid container columnSpacing={2}>
                {UsersList}
              </Grid>
              <AddUsers
                {...{
                  values,
                  setFieldValue,
                }}
              />
            </BoxStyled>
          </ColumnGrid>
        </>
        <ColumnGrid item lg={6} xl={6} sm={12} md={12} xs={12}>
          <FieldLabel>{t.container.addGroupFrom.groupDesc}</FieldLabel>
          <GroupDescriptionInput
            type="text"
            id="groupDescription"
            name="groupDescription"
            value={values.groupDescription}
            onChange={handleChange}
            style={{
              borderColor: errors.groupDescription ? '#fc8181' : '',
            }}
          />
        </ColumnGrid>
        <ColumnGrid
          item
          lg={6}
          xl={6}
          sm={12}
          md={12}
          xs={12}
          sx={{ textAlign: 'right' }}
        ></ColumnGrid>
        <ColumnGrid
          item
          lg={6}
          xl={6}
          sm={12}
          md={12}
          xs={12}
          sx={{ textAlign: 'right' }}
        >
          <Button
            variant="primaryGrey"
            onClick={cancel}
            sx={{ width: '110px', mr: 1, lineHeight: 0 }}
          >
            {t.container.addGroupFrom.cancelTxt}
          </Button>
          <Button
            onClick={submit}
            variant="primaryLight"
            sx={{ width: '110px', lineHeight: 0 }}
          >
            {t.container.addGroupFrom.saveTxt}
          </Button>
        </ColumnGrid>
      </Grid>
    );
  }
);
