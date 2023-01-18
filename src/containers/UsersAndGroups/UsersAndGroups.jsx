import { Route, Routes, Navigate } from 'react-router-dom';
import { Users } from './Users';
import { Groups } from './Groups';
import { AddUser } from '../AddUser';
import { Box } from '@mui/material';
export function UsersAndGroups() {
  return (
    <Box sx={{ height: '100%' }}>
      <Routes>
        <Route path="/" element={<Navigate to="users/active" />} />
        <Route
          path="/update-user"
          element={<Navigate to="/admin/users-and-groups/users" />}
        />
        <Route path="/users/suspended" element={<Users suspened />} />
        <Route path="/users/active" element={<Users />} />
        <Route path="/users" element={<Navigate to="active" />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/update-user/:username" element={<AddUser />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  );
}
