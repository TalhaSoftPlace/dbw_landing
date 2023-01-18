import React, { useState, useCallback } from 'react';
import { Grid, MenuItem, Switch,} from '@mui/material';
import {
  StyledTextField,
  FieldLabel,
  SelectStyled,
  ColumnGrid,
} from './CreateUserRuleForm.styles';
import { useSnackbar } from 'notistack';
import { getErrorsArrayfromFormikErrors } from '../../utils';
import { Button,  } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useLocalization } from '../../hooks';
import { useFolderList } from '../../queries';

export const CreateUserRuleForm = React.memo(
  ({ handleChange, values, setFieldValue, handleSubmit, errors, user }) => {
    const { data: folderList } = useFolderList();
    const navigate = useNavigate();
    const { t } = useLocalization();
    const { enqueueSnackbar } = useSnackbar();
    const [checked, setChecked] = React.useState(values.enable);
    const submit = useCallback(() => {
      getErrorsArrayfromFormikErrors(errors).forEach(error => {
        enqueueSnackbar(error, {
          variant: 'error',
        });
      });
      handleSubmit();
    }, [enqueueSnackbar, errors, handleSubmit]);

    const cancel = useCallback(() => {
      navigate('/user-dashboard/rules');
    }, [navigate]);

    const handleToggleChange = useCallback(
      event => {
          if (event.target.checked) {
              setChecked(true);
              setFieldValue('enable', event.target.checked);
            }
           else {
            setChecked(false);
            setFieldValue('enable', event.target.checked);
          }
        },
      [setFieldValue]
    );

    const [roles] = useState([
      {
        title: 'Move To Folder',
      },
      {
        title: 'Rule 2',
      },
    ]);

    const rootFolder = React.useMemo(() => {
      return folderList?.filter(folder => !folder.startsWith('user-folders'));
    }, [folderList]);
    const userFolder = React.useMemo(() => {
      var folder = folderList?.filter(folder =>
        folder.startsWith('user-folders')
      );
      return folder;
    }, [folderList]);


    return (
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: 'center',
          paddingTop: '40px',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
        }}
      >
        <ColumnGrid item lg={12} sm={12}>
          <FieldLabel
            sx={{
              color: 'text.light',
            }}
          >
            Rule Type
          </FieldLabel>
          <SelectStyled
            fullWidth
            value={values.ruleType}
            onChange={handleChange}
            name="ruleType"
          >
            <MenuItem  value="choose">
                  Choose
            </MenuItem>
            {roles.map(role => {
              return (
                <MenuItem key={role.title} value={role.title}>
                  {role.title}
                </MenuItem>
              );
            })}
          </SelectStyled>
        </ColumnGrid>
        { values.ruleType === "Move To Folder" && (
          <>
           <ColumnGrid item lg={6} xl={6} sm={12} md={12} xs={12}>
          <FieldLabel
            sx={{
              color: 'text.light',
            }}
          >
           Rule Entity
          </FieldLabel>
          <StyledTextField
            value={values.ruleEntity}
            onChange={handleChange}
            type="text"
            name="ruleEntity"
          />
        </ColumnGrid>
        
        <ColumnGrid item lg={6} xl={6} sm={12} md={12} xs={12}>
          <FieldLabel
            sx={{
              color: 'text.light',
            }}
          >
            Folder
          </FieldLabel>
          <SelectStyled
            fullWidth
            value={values.foldername}
            onChange={handleChange}
            name="foldername"
            MenuProps={{ classes: { paper: 'pagination-page' } }}
          >
            {rootFolder.map(role => {
              return (
                <MenuItem key={role + 1} value={role}>
                  {role}
                </MenuItem>
              );
            })}
            {userFolder.map(role => {
              return (
                <MenuItem key={role + 1} value={role}>
                  {role.split('.')?.[1]}
                </MenuItem>
              );
            })}
          </SelectStyled>
        </ColumnGrid>
        <ColumnGrid item lg={12} sm={12} >
        <FieldLabel>
          Enable Rule
                  <Switch
                    checked={checked}
                    value={checked}
                    onChange={handleToggleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </FieldLabel>
        </ColumnGrid>
          </>
        )}
        
       

        <ColumnGrid
          item
          lg={12}
          sm={12}
          md={12}
          sx={{
            textAlign: 'right',
            mt:4,
          }}
        >
            <Button
              variant="primaryGrey"
              onClick={cancel}
              sx={{
                width: '110px',
                mr: 1,
                lineHeight: 0,
              }}
            >
              {t.container.addUserForm.cancelTxt}
            </Button>
          <Button
            onClick={submit}
            variant="primaryLight"
            sx={{
              width: '110px',
              lineHeight: 0,
            }}
          >
            {t.container.addUserForm.saveTxt}
          </Button>
        </ColumnGrid>
      </Grid>
    );
  }
);
