import React, { useState, useCallback } from 'react';
import { Grid, MenuItem } from '@mui/material';
import {
  StyledTextField,
  FieldLabel,
  SelectStyled,
  StyledInputField,
  ColumnGrid,
} from './AddUserForm.styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSnackbar } from 'notistack';
import { getErrorsArrayfromFormikErrors } from '../../utils';
import { useAuth } from '../../hooks';
import { Button, OrgUnitSelect } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useLocalization } from '../../hooks';

export const AddUserForm = React.memo(
  ({ handleChange, values, setFieldValue, handleSubmit, errors, user }) => {
    const { user: auth } = useAuth();
    const navigate = useNavigate();
    const { t } = useLocalization();
    const { enqueueSnackbar } = useSnackbar();
    const submit = useCallback(() => {
      getErrorsArrayfromFormikErrors(errors).forEach(error => {
        enqueueSnackbar(error, {
          variant: 'error',
        });
      });
      handleSubmit();
    }, [enqueueSnackbar, errors, handleSubmit]);

    const cancel = useCallback(() => {
      navigate('/admin/users-and-groups/users');
    }, [navigate]);

    const [showPassword, setShowPassword] = useState(true);

    const [roles] = useState([
      {
        title: 'Manager',
      },
      {
        title: 'Member',
      },
    ]);

    const handleClickShowPassword = useCallback(() => {
      setShowPassword(!showPassword);
    }, [showPassword]);

    const handleMouseDownPassword = useCallback((event) => {
      event.preventDefault();
    }, []);

    const handleUsernameChange = useCallback((e) => {
      setFieldValue("username", e.target.value?.toLowerCase()?.replace(/ /g, ''));
    }, [setFieldValue])

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
        {!user && (
          <>
            <ColumnGrid item lg={6} xl={6} sm={12} md={12} xs={12}>
              <FieldLabel
                sx={{
                  color: 'text.light',
                }}
              >
                {t.container.addUserForm.userName}
              </FieldLabel>
              <StyledTextField
                error={!!errors.username}
                value={values.username}
                onChange={handleUsernameChange}
                autocomplete="off"
                type="text"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      @{auth?.domainModel?.domainName}
                    </InputAdornment>
                  ),
                }}
              />
            </ColumnGrid>
          </>
        )}
        <ColumnGrid item lg={6} xl={6} sm={12} md={12} xs={12}>
          <FieldLabel
            sx={{
              color: 'text.light',
            }}
          >
            {t.container.addUserForm.fullName}
          </FieldLabel>
          <StyledTextField
            error={!!errors.fullname}
            value={values.fullname}
            onChange={handleChange}
            type="text"
            name="fullname"
          />
        </ColumnGrid>
        <ColumnGrid item lg={6} xl={6} sm={12} md={12} xs={12}>
          <FieldLabel
            sx={{
              color: 'text.light',
            }}
          >
            {t.container.addUserForm.organizationUnit}
          </FieldLabel>
          <OrgUnitSelect
            value={values.organizationalUnit}
            name="organizationalUnit"
            onChange={setFieldValue}
          />
        </ColumnGrid>
        <ColumnGrid item lg={6} xl={6} sm={12} md={12} xs={12}>
          <FieldLabel
            sx={{
              color: 'text.light',
            }}
          >
            {t.container.addUserForm.position}
          </FieldLabel>
          <SelectStyled
            fullWidth
            value={values.position}
            onChange={handleChange}
            name="position"
          >
            {roles.map(role => {
              return (
                <MenuItem key={role.title} value={role.title}>
                  {role.title}
                </MenuItem>
              );
            })}
          </SelectStyled>
        </ColumnGrid>

        {!user && (
          <>
            <ColumnGrid item lg={6} xl={6} sm={12} md={12} xs={12}>
              <FieldLabel
                sx={{
                  color: 'text.light',
                }}
              >
                {t.container.addUserForm.createPassword}
              </FieldLabel>
              <StyledInputField
                id="outlined-adornment-password"
                type={showPassword ? 'password' : 'text'}
                value={values.password}
                name="password"
                onChange={handleChange}
                autocomplete="off"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </ColumnGrid>
          </>
        )}

        <ColumnGrid
          item
          lg={6}
          xl={6}
          sm={12}
          md={12}
          xs={12}
          sx={{
            textAlign: 'right',
          }}
        ></ColumnGrid>
        <ColumnGrid
          item
          lg={12}
          xl={12}
          sm={12}
          md={12}
          xs={12}
          sx={{
            textAlign: 'right',
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
