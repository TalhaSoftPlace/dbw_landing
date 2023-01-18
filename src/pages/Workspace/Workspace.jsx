import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MailBoxNav } from '../../containers';
import { CalendarApp } from '../CalendarApp';
import { NotesApp } from '../NotesApp';
import { EmailApp } from '../EmailApp';
import { Background } from './Workspace.styles';
import { WorkflowApp } from '../WorkflowApp';

export const Workspace = () => {
  return (
    <Background>
      <MailBoxNav />
      <Routes>
        <Route path="/" exact element={<EmailApp />} />
        <Route path="/calendar/*" element={<CalendarApp />} />
        <Route path="/meeting-notes/*" element={<NotesApp />} />
        <Route path="/workflow/*" element={<WorkflowApp />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Background>
  );
};
