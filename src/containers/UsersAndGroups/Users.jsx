import React, { useCallback, useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { useLocalization } from '../../hooks';
import { useUsers } from '../../queries';
import { Tabs } from './Tabs';
import {
  ContentSection,
  ContextMenu,
  DBWTable,
  Loading,
  UsersPagination,
} from '../../components';
import { ConfirmationDialog, AdminPasswordUpdate } from '../../containers';
import {
  StyledSpan,
  Delete,
  ErrorIcon,
  UserBox,
} from './UsersAndGroups.styles';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { HeaderAction } from '../HeaderAction';
import { Tooltip, useTheme } from '@mui/material';
import {
  useDeleteUserMutation,
  useReactivateUserMutation,
  useSuspendUserMutation,
} from '../../mutations';
import { useAuth } from '../../hooks';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { usersAtom } from '../../atoms';
import { UsersTab } from './UsersTab';

export const Users = React.memo(({ suspened = false }) => {
  const resetList = useResetRecoilState(usersAtom);
  const [{ page, size }, setUsersState] = useRecoilState(usersAtom);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { data: { users = [], totalItems } = {}, isLoading } = useUsers({
    suspened,
    page,
    size,
  });
  const { t } = useLocalization();
  const muiTheme = useTheme();
  const [selectedUsername, setSelectedUsername] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [passwordChangeDialog, setPasswordChangeDialog] = useState(false);
  const [opennevigateDialog, setOpennevigateDialog] = useState(false);
  const { mutateAsync: deleteUser } = useDeleteUserMutation();
  const { mutateAsync: suspendUser } = useSuspendUserMutation();
  const { mutateAsync: reactivateUser } = useReactivateUserMutation();

  useEffect(() => {
    resetList();
  }, [resetList]);

  useEffect(() => {
    setUsersState(state => ({ ...state, total: totalItems }));
  }, [setUsersState, totalItems]);
  const handleEdit = useCallback(
    user => {
      navigate(`../update-user/${user.userName}`);
    },
    [navigate]
  );
  const handleDelete = useCallback(() => {
    deleteUser({ userName: selectedUsername }).then(() => {
      enqueueSnackbar('User deleted successfully!', { variant: 'success' });
    });
    setOpenDialog(false);
  }, [deleteUser, enqueueSnackbar, selectedUsername]);

  const handleSuspend = useCallback(
    user => {
      suspendUser({ userName: user.userName }).then(() => {
        enqueueSnackbar('User suspended!', { variant: 'success' });
      });
      setOpenDialog(false);
    },
    [suspendUser, enqueueSnackbar]
  );

  const handleReactivate = useCallback(
    user => {
      reactivateUser({ userName: user?.userName }).then(() => {
        enqueueSnackbar('User Reactivated!', { variant: 'success' });
      });
      setOpenDialog(false);
    },
    [reactivateUser, enqueueSnackbar]
  );

  const navigateAddUser = React.useCallback(() => {
    if (!!user && user?.domainModel?.domainStatus === 'ACTIVE') {
      setOpennevigateDialog(true);
    } else {
      navigate(`../add-user`);
    }
  }, [navigate, user]);

  const handleNavigate = useCallback(() => {
    navigate(`/admin/billing/purchase-plan`);
  }, [navigate]);
  const handleClose = React.useCallback(() => {
    setOpenDialog(false);
    setPasswordChangeDialog(false);
  }, []);

  const handleOpen = useCallback(row => {
    setOpenDialog(true);
    setSelectedUsername(row.userName);
  }, []);

  const handleOpenPasswordDialog = useCallback(
    row => {
      setPasswordChangeDialog(true);
      setSelectedUsername(row.userName);
    },
    [setPasswordChangeDialog]
  );

  const handleNevigateClose = React.useCallback(() => {
    setOpennevigateDialog(false);
  }, []);

  const TotalUsers = React.memo(() => {
    return <span className="total-users">Total users: {users.length}</span>;
  }, [users]);

  const Action = React.memo(() => {
    return (
      <>
        <TotalUsers />
        <HeaderAction text="Add User" onClick={navigateAddUser} />
      </>
    );
  }, [navigateAddUser]);

  const generateRowContent = useCallback(
    row => {
      const menuItems = [
        { name: 'Edit', onClick: () => handleEdit(row) },
        {
          name: suspened ? 'Reactivate' : 'Suspend',
          onClick: () =>
            suspened ? handleReactivate(row) : handleSuspend(row),
        },
        { name: 'Delete', onClick: () => handleOpen(row) },
        {
          name: 'Change Password',
          onClick: () => handleOpenPasswordDialog(row),
        },
      ];
      return {
        username: (
          <StyledSpan className={suspened ? 'suspended' : ''}>
            <Tooltip title={row.online ? 'online' : 'offline'}>
              <span className={row.online ? 'online' : 'offline'} sx={{pr:1}}></span>
            </Tooltip>
            {row.userName}
          </StyledSpan>
        ),
        name: (
          <StyledSpan
            className={suspened ? 'suspended' : ''}
            sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}
          >
            {row.firstName}
          </StyledSpan>
        ),
        organizationUnit: (
          <StyledSpan
            className={suspened ? 'suspended' : ''}
            sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}
          >
            {row.orgUnitName}
          </StyledSpan>
        ),
        head: (
          <StyledSpan className={suspened ? 'suspended' : ''}>
            {!!row.manager || !!row.orgUnitManager ? 'Manager' : 'Member'}
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
    [suspened, handleEdit, handleReactivate, handleSuspend, handleOpen, handleOpenPasswordDialog]
  );

  const generateHeader = useCallback(() => {
    return {
      username: (
        <StyledSpan sx={{ pl: '40px' }}>
          {t.container.usersAndGroups.userName}
        </StyledSpan>
      ),
      name: (
        <StyledSpan sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
          {t.container.usersAndGroups.name}
        </StyledSpan>
      ),
      organizationUnit: (
        <StyledSpan sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
          {t.container.usersAndGroups.userOrgUnit}
        </StyledSpan>
      ),
      head: <StyledSpan>{t.container.usersAndGroups.userPositions}</StyledSpan>,
      action: <StyledSpan>{t.container.usersAndGroups.userActions}</StyledSpan>,
    };
  }, [t]);
  return (
    <UserBox
      sx={{
        mb: 1,
        height: 'calc(100% - 100px)',
        overflow: 'hidden',
        overflowY: 'auto',
      }}
    >
      <Tabs />
      <UsersTab />
      <ContentSection
        heading={t.userList.heading}
        subHeading={t.userList.subHeading}
        headerAction={<Action />}
      >
        <Box>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <DBWTable
                generateRowContent={generateRowContent}
                data={users}
                generateHeader={generateHeader}
                headingBackground={muiTheme.palette.background.dark}
                itemBackground={muiTheme.palette.background.tableitembg}
                headingColor={muiTheme.palette.text.grey}
                itemColor={muiTheme.palette.text.grey}
                padding={20}
              />
              <Box className="pagination">
                <UsersPagination />
              </Box>
            </>
          )}
        </Box>
      </ContentSection>
      <ConfirmationDialog
        title={'Do you really want to delete this user'}
        subtitle={selectedUsername}
        open={openDialog}
        handleClose={handleClose}
        handleDelete={handleDelete}
        cancelbtn="Cancel"
        deletebtn="Delete"
      >
        <Delete />
      </ConfirmationDialog>
      <ConfirmationDialog open={passwordChangeDialog} handleClose={handleClose}>
        {/* <Delete /> */}
        <AdminPasswordUpdate
          userName={selectedUsername}
          onClose={handleClose}
        />
      </ConfirmationDialog>
      <ConfirmationDialog
        title="Subscription Required"
        subtitle="For adding new users"
        open={opennevigateDialog}
        handleClose={handleNevigateClose}
        handleDelete={handleNavigate}
        deletebtn="OK"
      >
        <ErrorIcon />
      </ConfirmationDialog>
    </UserBox>
  );
});
