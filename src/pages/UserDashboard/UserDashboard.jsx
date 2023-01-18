import React from 'react';
import { UserSideBar } from '../../containers';
import { useAuth } from '../../hooks';
import { UserRouter } from '../../UserRouter';
import { LoadingOverlay } from '../../components';
export const UserDashboard = () => {
  const { user } = useAuth({ redirect: true });
  return (
    <>
      {!user && <LoadingOverlay />}
      <UserSideBar>{user && <UserRouter />}</UserSideBar>
    </>
  );
};
