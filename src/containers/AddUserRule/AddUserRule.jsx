import React, { useCallback  } from 'react';
import { Box } from '@mui/system';
import {
  ContentSection,
  ContextMenu,
  DBWTable,
  LoadingOverlay,
} from '../../components';

import { StyledSpan } from './AddUserRule.styles';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { HeaderAction } from '../HeaderAction';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDeleteUserRuleMutation , useEditUserRuleMutation } from '../../mutations';
import { useSnackbar } from 'notistack';
import { useLocalization } from '../../hooks';
import {useUserRules} from '../../queries';

const Action = React.memo(() => {
  const navigate = useNavigate();
  const handleNavigate = useCallback(() => {
    navigate(`/user-dashboard/add-rules`);
  },[navigate]);
  return (
  <>
  <HeaderAction onClick={handleNavigate} text="Add Rules" />
  </>);
});

export const AddUserRule = React.memo(() => {
  const muiTheme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { data: userRules = [] } = useUserRules();
  const { mutateAsync: deleteUserRule, isLoading : isDeleting } = useDeleteUserRuleMutation();
  const {mutateAsync : editUserRule , isLoading: isUpdating } = useEditUserRuleMutation();
  const handleDelete = useCallback(
    (id) => {
      deleteUserRule({ id }).then(() => {
        enqueueSnackbar('Rule deleted successfully!', { variant: 'success' });
      });
    },
    [deleteUserRule, enqueueSnackbar]
  );
  const handleGroupEdit = useCallback(
    (id) => {
        navigate(`/user-dashboard/add-rules/${id}`);
      },
    [navigate]
  );
  const handleGroupEnable = useCallback(
    (row) => {
      if(row.enable){
        editUserRule({
          id:row.id,
          ruleType:row.ruleType,
          ruleEntity : row.ruleEntity,
          rule: {
            targetfolder: row.foldername,
            replyTime: ""
          },
          enable:false,
        });
      }else{
        editUserRule({
          id:row.id,
          ruleType:row.ruleType,
          ruleEntity : row.ruleEntity,
          rule: {
            targetfolder: row.foldername,
            replyTime: ""
          },
          enable:true,
        });
      }
    },
    [editUserRule]
  );
  const { t } = useLocalization();
  const generateHeader = useCallback(() => {
    return {
      emailaddress: <StyledSpan sx={{ pl: '20px' }}>Rule Entity</StyledSpan>,
      foldername: <StyledSpan>Rule Type</StyledSpan>,
      status: <StyledSpan> Status</StyledSpan>,
      actions: <StyledSpan>{t.container.usersAndGroups.groupActions}</StyledSpan>,
    };
  }, [t]);

  const generateRowContent = useCallback(
    (row) => {
      const menuItems = [
        { name: `${row?.enable ? 'Disable' : 'Enable'}`, onClick: () => handleGroupEnable(row)},
        { name: 'Edit', onClick: () => handleGroupEdit(row.id)},
        { name: 'Delete', onClick: () => handleDelete(row.id) },
      ];
      return {
        emailaddress: <StyledSpan>{row.ruleEntity}</StyledSpan>,
        foldername: <StyledSpan>{row?.ruleType}</StyledSpan>,
        status: <StyledSpan>{row?.enable ? 'Enable' :'Disable'}</StyledSpan>,
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
    [handleDelete, handleGroupEdit, handleGroupEnable]
  );


  return (
    <>
    {(isUpdating || isDeleting ) && <LoadingOverlay />}
      <ContentSection
        heading="Rules"
        subHeading=""
        headerAction={<Action />}
      >
        <Box sx={{ mb: 1, minHeight: 100 }}>
            <DBWTable
              generateRowContent={generateRowContent}
              data={userRules}
              generateHeader={generateHeader}
              headingBackground={muiTheme.palette.background.dark}
              itemBackground={muiTheme.palette.background.tableitembg}
              headingColor={muiTheme.palette.text.grey}
              itemColor={muiTheme.palette.text.grey}
              padding={20}
            />
        </Box>
      </ContentSection>
    </>
  );
});
