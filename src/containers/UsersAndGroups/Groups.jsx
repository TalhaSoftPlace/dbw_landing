import React, { useCallback,useState } from 'react';
import { Tabs } from './Tabs';
import { Box } from '@mui/system';
import {
  ContentSection,
  ContextMenu,
  DBWTable,
  Loading,
} from '../../components';

import { ConfirmationDialog } from '../../containers';
import { StyledSpan, ErrorIcon } from './UsersAndGroups.styles';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { HeaderAction } from '../HeaderAction';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserGroups } from '../../queries';
import { useDeleteUserGroupMutation } from '../../mutations';
import { useSnackbar } from 'notistack';
import { longStringToShort } from '../../utils';
import { useAuth,useLocalization } from '../../hooks';

const Action = React.memo(() => {
  const { user } = useAuth();
  const [opennevigateDialog, setOpennevigateDialog] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    if(!!user && user?.domainModel?.domainStatus === 'ACTIVE'){
      setOpennevigateDialog(true);
    } else{
      navigate(`../add-group`);
    }
    
  }, [navigate, user ]);
  
  const handleNavigateok = useCallback(() => {
    navigate(`/admin/billing/purchase-plan`);
  },[navigate]);
  const handleNevigateClose = React.useCallback(() => {
    setOpennevigateDialog(false);
  }, []);
  return (
  <>
  <HeaderAction onClick={handleNavigate} text="Add Group" />
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

export const Groups = React.memo(() => {
  const { user } = useAuth();
  const muiTheme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  var { data: groups = [], isLoading } = useUserGroups();
  const { mutateAsync: deleteUserGroup, isLoading : isDeleting } = useDeleteUserGroupMutation();
  const [opennevigateDialog, setOpennevigateDialog] = useState(false);
  const handleDelete = useCallback(
    (id) => {
      deleteUserGroup({ groupId: id }).then(() => {
        enqueueSnackbar('Group deleted successfully!', { variant: 'success' }); 
      });
    },
    [deleteUserGroup, enqueueSnackbar]
  );

  const handleGroupEdit = useCallback(
    (id) => {
      if(!!user && user?.domainModel?.domainStatus === 'ACTIVE'){
        setOpennevigateDialog(true);
      } else{
        navigate(`/admin/users-and-groups/groups/${id}`);
      }
     
    },
    [navigate, user]
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
      groupDescription: (
        <StyledSpan sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
          {t.container.usersAndGroups.groupDesc}
        </StyledSpan>
      ),
      usernames: <StyledSpan> {t.container.usersAndGroups.groupUsers}</StyledSpan>,
      actions: <StyledSpan>{t.container.usersAndGroups.groupActions}</StyledSpan>,
    };
  }, [t]);

  const getGroupDescription = useCallback((groupDescription) => {
    return longStringToShort(groupDescription, 3);
  }, []);

  const generateRowContent = useCallback(
    (row) => {
      const menuItems = [
        { name: 'Edit', onClick: () => handleGroupEdit(row.id) },
        { name: 'Delete', onClick: () => handleDelete(row.id) },
      ];
      return {
        groupname: <StyledSpan>{row.groupName}</StyledSpan>,
        groupDescription: (
          <StyledSpan sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
            {getGroupDescription(row.groupDescription)}
          </StyledSpan>
        ),
        usernames: <StyledSpan>{row?.userModelList?.length}</StyledSpan>,
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
    [handleDelete, handleGroupEdit, getGroupDescription]
  );

  const groupsData = React.useMemo(() => {
    return Array.isArray(groups) ? groups : [];
  }, [groups]);
  return (
    
    <>
      <Tabs />
      <ContentSection
        heading="Groups"
        subHeading="You can view and add groups"
        headerAction={<Action />}
      >
        <Box sx={{ mb: 1, minHeight: 100 }}>
          {(isLoading || isDeleting ) ? (
            <Loading />
          ) : (
            <DBWTable
              generateRowContent={generateRowContent}
              data={groupsData}
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
