import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProfileSettingsAutoReply, ProfileGeneralSettings, ProfileChangePassword , CreateEmailGroup , UserEmailGroupPage , AddUserRule , AddUsersRuleForm } from './containers';
import { ProfileSettingSkin } from './components';

export const UserRouter = React.memo(() => {
  return (
    <Routes>
      <Route path="/" exact element={<ProfileGeneralSettings />} />
      <Route path="/auto-reply" exact element={<ProfileSettingsAutoReply />} />
      <Route
        path="/change-password"
        exact
        element={<ProfileChangePassword />}
      />
      <Route path="/skin" exact element={<ProfileSettingSkin />} />
      <Route path="/rules" exact element={<AddUserRule />} />
      <Route path="/add-rules" exact element={<AddUsersRuleForm />} />
      <Route path="/add-rules/:ruleId" exact element={<AddUsersRuleForm />} />
      <Route path="/email-group" exact element={<CreateEmailGroup />} />
      <Route path="/add-email-group" exact element={<UserEmailGroupPage />} />
      <Route path="/add-email-group/:groupId" element={<UserEmailGroupPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
});
