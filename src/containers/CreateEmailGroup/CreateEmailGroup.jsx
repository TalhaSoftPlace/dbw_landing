import React, { useCallback,useState } from 'react';
import { Box } from '@mui/system';
import {
  ContentSection,
  ContextMenu,
  DBWTable,
  Loading,
} from '../../components';

import { ConfirmationDialog } from '..';
import { StyledSpan, ErrorIcon } from './CreateEmailGroup.styles';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { HeaderAction } from '../HeaderAction';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDeleteEmailGroupMutation } from '../../mutations';
import { useSnackbar } from 'notistack';
import { useLocalization } from '../../hooks';
import {useUserEmailGroups} from '../../queries';

const Action = React.memo(() => {
  const [opennevigateDialog, setOpennevigateDialog] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = useCallback(() => {
      navigate(`/user-dashboard/add-email-group`);
  }, [navigate ]);
  
  const handleNavigateok = useCallback(() => {
    navigate(`/admin/billing/purchase-plan`);
  },[navigate]);
  const handleNevigateClose = React.useCallback(() => {
    setOpennevigateDialog(false);
  }, []);
  return (
  <>
  <HeaderAction onClick={handleNavigate} text="Add Email Group" />
  <ConfirmationDialog
        title="Subscription Required"
        subtitle="For adding new groups"
        open={opennevigateDialog}
        handleClose={handleNevigateClose}
        handleDelete={handleNavigateok}
        deletebtn="OK"
      >
        <ErrorIcon />
      </ConfirmationDialog>
  </>);
});

export const CreateEmailGroup = React.memo(() => {
  const muiTheme = useTheme();
  const navigate = useNavigate();
  const { data: userEmailGroupData = [] } = useUserEmailGroups();
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: deleteUserGroup, isLoading : isDeleting } = useDeleteEmailGroupMutation();
  const [opennevigateDialog, setOpennevigateDialog] = useState(false);
  const handleDelete = useCallback(
    (id) => {
      deleteUserGroup({ id }).then(() => {
        enqueueSnackbar('Group deleted successfully!', { variant: 'success' });
      });
    },
    [deleteUserGroup, enqueueSnackbar]
  );
  const handleGroupEdit = useCallback(
    (id) => {
        navigate(`/user-dashboard/add-email-group/${id}`);
      },
    [navigate]
  );

  const handleNavigate = useCallback(() => {
    navigate(`/admin/billing/purchase-plan`);
  },[navigate]);
  const handleNevigateClose = React.useCallback(() => {
    setOpennevigateDialog(false);
  }, []);
 


  const { t } = useLocalization();

  const generateHeader = useCallback(() => {
    return {
      groupname: <StyledSpan sx={{ pl: '20px' }}>{t.container.usersAndGroups.groupName}</StyledSpan>,
      usernames: <StyledSpan> {t.container.usersAndGroups.groupUsers}</StyledSpan>,
      dec: <StyledSpan> Description</StyledSpan>,
      actions: <StyledSpan>{t.container.usersAndGroups.groupActions}</StyledSpan>,
    };
  }, [t]);

  const generateRowContent = useCallback(
    (row) => {
      const menuItems = [
        { name: 'Edit', onClick: () => handleGroupEdit(row.id) },
        { name: 'Delete', onClick: () => handleDelete(row.id) },
      ];
      return {
        groupname: <StyledSpan>{row.groupName}</StyledSpan>,
        usernames: <StyledSpan>{row?.userNamesList?.length}</StyledSpan>,
        dec: <StyledSpan>{row?.groupDescription}</StyledSpan>,
        actions: (
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
    [handleDelete, handleGroupEdit]
  );
  return (
    <>
      <ContentSection
        heading=" Email Group"
        subHeading=""
        headerAction={<Action />}
      >
        <Box sx={{ mb: 1, minHeight: 100 }}>
          {(isDeleting ) ? (
            <Loading />
          ) : (
            <DBWTable
              generateRowContent={generateRowContent}
              data={userEmailGroupData}
              generateHeader={generateHeader}
              headingBackground={muiTheme.palette.background.dark}
              itemBackground={muiTheme.palette.background.tableitembg}
              headingColor={muiTheme.palette.text.grey}
              itemColor={muiTheme.palette.text.grey}
              padding={20}
            />
          )}
        </Box>
      </ContentSection>
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
    </>
  );
});
