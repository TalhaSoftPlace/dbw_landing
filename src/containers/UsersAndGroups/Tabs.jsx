import * as React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import { Link, useLocation } from 'react-router-dom';
import { StyledTabs, StyledButton } from './UsersAndGroups.styles.js';
const items = [
  {
    id: 1,
    route: '/admin/users-and-groups/users',
    name: 'Users',
    icon: <PersonIcon />,
  },
  {
    id: 2,
    route: '/admin/users-and-groups/groups',
    name: 'Groups',
    icon: <GroupsIcon />,
  },
];
export const Tabs = React.memo(({ tabItems = items }) => {
  const location = useLocation();
  const activeMenuItem = React.useMemo(() => {
    return tabItems.find((item) => {
      return location.pathname.includes(item.route);
    });
  }, [location.pathname, tabItems]);
  return (
    <StyledTabs disableElevation variant="contained">
      {tabItems.map((item) => (
        <StyledButton
          key={item.route}
          size="small"
          sx={{ width: '160px', height: 34 }}
          className={activeMenuItem?.id === item.id ? 'active' : ''}
          label={item.name}
          component={Link}
          to={item.route}
        >
          {item.icon}
          &nbsp; &nbsp;
          {item.name}
        </StyledButton>
      ))}
    </StyledTabs>
  );
});
