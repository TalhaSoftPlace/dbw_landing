import React from 'react';
import { WorkflowArea } from './WorkflowApp.styles';
import { LoadingOverlay } from '../../components';
import { useAuth } from '../../hooks';
import { UserWorkflows } from '../../containers';
import { Navigate, Route, Routes } from 'react-router-dom';
import { WorkflowDetails } from './WorkflowDetails';

export const WorkflowApp = React.memo(() => {
  const { user } = useAuth({ redirect: true });

  return (
    <>
      {!user ? (
        <LoadingOverlay />
      ) : (
        <WorkflowArea>
          <Routes>
            <Route path="/" exact element={<UserWorkflows />} />
            <Route
              path="/details/:workflowId/:workflowDocumentId/"
              exact
              element={<WorkflowDetails />}
            />
            <Route
              path="/details/:workflowId"
              exact
              element={<WorkflowDetails />}
            />

            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </WorkflowArea>
      )}
    </>
  );
});
