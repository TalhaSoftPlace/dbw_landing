import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  AddRule,
  BillingScreen,
  BusinessRule,
  CompanySetting,
  Invoices,
  OrgSchema,
  PaymentMethods,
  UsersAndGroups,
  WorkflowBuilder,
  WorkflowManager,
} from './containers';
import {
  DomainSettings,
  AdminWelcome,
  WelcomeVideo,
  DashboardVideoScreen,
  MyPlan,
} from './containers';
import { PurchasePlan } from './pages';
import { AddGroupPage } from './containers/AddGroupPage/AddGroupPage';
import { useAuth } from './hooks';

export const AdminRouter = React.memo(() => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" exact element={<AdminWelcome />} />
      <Route path="view-videos" element={<DashboardVideoScreen />} />
      <Route path="welcome-video" element={<WelcomeVideo />} />
      <Route path="domain-settings" element={<DomainSettings />} />
      {user?.domainModel?.domainStatus !== 'FREE' &&
        (user?.domainModel?.domainStatus === 'ACTIVE' ||
          user?.domainModel?.domainStatus === 'TOBEDELETED' ||
          user?.domainModel?.domainStatus === 'INCOMPLETE') && (
          <Route path="billing/purchase-plan" element={<PurchasePlan />} />
        )}
      {user?.domainModel?.domainStatus !== 'FREE' && (
        <Route path="billing" element={<BillingScreen />} />
      )}
      {user?.domainModel?.domainStatus !== 'PENDING' &&
        user?.domainModel?.domainStatus !== 'INCOMPLETE' && (
          <>
            {user?.domainModel?.domainStatus !== 'FREE' && (
              <>
                <Route path="billing/my-plan" element={<MyPlan />} />
                <Route path="billing/my-invoices" element={<Invoices />} />
                <Route
                  path="billing/payment-methods"
                  element={<PaymentMethods />}
                />
              </>
            )}
            <Route path="orgchart" element={<OrgSchema />} />
            <Route path="users-and-groups/*" element={<UsersAndGroups />} />
            <Route
              path="users-and-groups/add-group"
              element={<AddGroupPage />}
            />
            <Route
              path="users-and-groups/groups/:groupId"
              element={<AddGroupPage />}
            />
            <Route path="company-settings" element={<CompanySetting />} />
            <Route path="work-flow" element={<WorkflowManager />} />
            <Route path="work-flow/add-new" element={<WorkflowBuilder />} />
            <Route path="work-flow/add-new" element={<WorkflowBuilder />} />
            <Route path="rules" element={<BusinessRule />} />
            <Route path="rules/add-rules" element={<AddRule />} />s
          </>
        )}
      <Route path="/*" element={<Navigate to="/admin" />} />
    </Routes>
  );
});
