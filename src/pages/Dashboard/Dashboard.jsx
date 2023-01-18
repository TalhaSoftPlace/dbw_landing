import React from 'react';
import { AdminSideBar } from '../../containers';
import { useAuth } from '../../hooks';
import { AdminRouter } from '../../AdminRouter';
import { LoadingOverlay } from '../../components';
export const Dashboard = () => {
  const { user } = useAuth({ redirect: true, forAdmin: true });
  return (
    <>
      {!user && <LoadingOverlay />}
      <AdminSideBar>{user && <AdminRouter />}</AdminSideBar>
    </>
  );
};
