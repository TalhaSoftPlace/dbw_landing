import { useTheme } from '@emotion/react';
import { Box, DialogContent, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { useMemo } from 'react';

import { useToggle } from '../../hooks';
import { useUsers } from '../../queries';
import { DBWTable } from '../DBWTable';
import { Loading } from '../Loading';
import {
  CloseIconStyled,
  DialogStyled,
  StyledButton,
  StyledSpan,
} from './ViewUsersDialog.styles';

export const ViewUsersDialog = React.memo(({ nodeId }) => {
  const [showForm, toggleShowForm] = useToggle(false);
  const { data: { users = [] } = {}, isFetching: isLoading } = useUsers();
  
  const filteredUsers = useMemo(
    () => users?.filter(u => u.orgUnitId === nodeId || nodeId === 'all'),
    [nodeId, users]
  );
  const muiTheme = useTheme();
  const generateRowContent = useCallback(row => {
    const isSuspended = row.status === 'SUSPEND';

    return {
      username: (
        <StyledSpan className={isSuspended ? 'suspended' : ''}>
          {row.userName}
        </StyledSpan>
      ),
      name: (
        <StyledSpan
          className={isSuspended ? 'suspended' : ''}
          sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}
        >
          {row.firstName}
        </StyledSpan>
      ),
      head: (
        <StyledSpan className={isSuspended ? 'suspended' : ''}>
          {!!row.manager || !!row.orgUnitManager ? 'Manager' : 'Member'}
        </StyledSpan>
      ),
    };
  }, []);

  const generateHeader = useCallback(() => {
    return {
      username: <StyledSpan sx={{ pl: '20px' }}>Username</StyledSpan>,
      name: (
        <StyledSpan sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
          Name
        </StyledSpan>
      ),

      head: <StyledSpan>Position</StyledSpan>,
    };
  }, []);

  return (
    <>
      <StyledButton onClick={toggleShowForm}>Users</StyledButton>
      {showForm && (
        <DialogStyled open={showForm} keepMounted fullWidth>
          <Box sx={{ p: 1, pl: 3, display: 'flex ', pt: 2 }}>
            <Typography
              sx={{ flexGrow: 1, color: 'text.primaryText' }}
              variant="h6"
            >
              Users
            </Typography>
            <CloseIconStyled sx={{ flexGrow: 0 }} onClick={toggleShowForm} />
          </Box>
          <DialogContent sx={{ pt: 2 }}>
            {showForm && (
              <Box>
                {isLoading ? (
                  <Loading />
                ) : (
                  <DBWTable
                    generateRowContent={generateRowContent}
                    data={filteredUsers}
                    generateHeader={generateHeader}
                    headingBackground={muiTheme.palette.background.dark}
                    itemBackground={muiTheme.palette.background.tableitembg}
                    headingColor={muiTheme.palette.text.grey}
                    itemColor={muiTheme.palette.text.grey}
                    padding={20}
                  />
                )}
              </Box>
            )}
          </DialogContent>
        </DialogStyled>
      )}
    </>
  );
});
