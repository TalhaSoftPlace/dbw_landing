import * as React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { Tabs } from './Tabs.jsx';
const userItems = [
  {
    id: 1,
    route: '/admin/users-and-groups/users/active',
    name: 'Active',
    icon: <PersonIcon />,
  },
  {
    id: 2,
    route: '/admin/users-and-groups/users/suspended',
    name: 'Suspended',
    icon: <NoAccountsIcon />,
  },
];
export const UsersTab = React.memo(() => {
  return (
    <Tabs tabItems={userItems} />
  );
});
