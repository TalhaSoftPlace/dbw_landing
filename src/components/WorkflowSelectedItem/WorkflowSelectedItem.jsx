import React, { useCallback } from 'react';
import { Item } from './WorkflowSelectedItem.styles';
import BusinessIcon from '@mui/icons-material/Business';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {Box} from '@mui/material';

const icons = {
  org: <BusinessIcon />,
  group: <GroupsIcon />,
  user: <PersonIcon />,
  all: <AllInclusiveIcon />,
  fields: <TextFieldsIcon />,
};
export const WorkflowSelectedItem = React.memo(({ item, onRemove }) => {
  const handleClick = useCallback(() => {
    onRemove(item);
  }, [item, onRemove]);
  return (
    <Item key={item.node_id}>
      {icons[item.from] ?? <ManageAccountsIcon />}
      <Box sx={{lineHeight:'1.3'}}> {item.name}</Box>
      <RemoveCircleOutlineIcon
        sx={{ cursor: 'pointer' }}
        onClick={handleClick}
      />
    </Item>
  );
});
