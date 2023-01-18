import React, { useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  notificationsAtom,
  authTokenAtom,
  emailPaginationAtom,
  invitationCodeAtom,
} from './atoms';
import { useEmailsAfterUId, useRefreshTokenMutation } from './mutations';
import { ProfileSetting } from './pages';
import {
  Home,
  Registration,
  SignIn,
  Dashboard,
  UserDashboard,
  Workspace,
  SingleEmail,
  ForgetPassword,
  PricingPlan,
  Feedback,
  PrivacyPolicyPage,
  TermsandConditionPage,
  NewsManagementPage,
  NewsIntroPage,
  MeetBlue,
} from './pages';
import { setCookie } from './utils';
import SockJsClient from 'react-stomp';
import { useAuth, useWindowResize } from './hooks';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material';
export const Setup = React.memo(() => {
  const winSize = useWindowResize();
  const muiTheme = useTheme();
  const setNotifications = useSetRecoilState(notificationsAtom);
  const setEmailPaginations = useSetRecoilState(emailPaginationAtom);
  const { invitationcode } = useRecoilValue(invitationCodeAtom);
  const { token } = useRecoilValue(authTokenAtom);
  const { user } = useAuth();
  const { mutateAsync: getNewEmails } = useEmailsAfterUId();
  const handleMessage = useCallback(
    msg => {
      setEmailPaginations(state => ({
        ...state,
        folder: 'INBOX',
        pageNumber: 1,
        keyword: '',  flag: ''
      }));
      getNewEmails({pageNumber: 1, mailBoxFolder: 'INBOX',  flag: ''})

      setNotifications(state => ({
        show: true,
        notifications: [
          { ...msg, form: 'email' },
          ...state.notifications.slice(0, 4),
        ],
      }));
    },
    [getNewEmails, setEmailPaginations, setNotifications]
  );

  const routePath = useLocation();
  const onTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    document.getElementsByClassName('woot--bubble-holder')?.[0]?.remove();
    document.getElementsByClassName('woot--widget-holder')?.[0]?.remove();
    onTop();
  }, [routePath]);
  return (
    <>
      {!!user && !!token && (
        <SockJsClient
          url={process.env.REACT_APP_WS_URL}
          topics={['/user/queue/publish/email-notification']}
          headers={{ Authorization: `Bearer ${token}` }}
          onMessage={handleMessage}
        />
      )}
      <Routes>
        {invitationcode && <Route path="/sign-up" element={<Registration />} />}
         <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<PricingPlan />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsandConditionPage />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/business-email" element={<NewsIntroPage />} />
        <Route path="/workflow-engine" element={<NewsManagementPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        {winSize.width > muiTheme.breakpoints.values.md && (
          <Route path="/admin/*" element={<Dashboard />} />
        )}
        <Route path="/meetblue/*" element={<MeetBlue />} />
        <Route path="/email/:folder/:uId/*" element={<SingleEmail />} />
        {user?.domainModel?.domainStatus !== 'PENDING' && (
          <>
            <Route path="/profile-settings" element={<ProfileSetting />} />
            <Route path="/user-dashboard/*" element={<UserDashboard />} />
            <Route path="/workspace/*" element={<Workspace />} />
          </>
        )}
        <Route path="/*" element={<Navigate to="" />} />
      </Routes>
    </>
  );
});
export const Router = React.memo(() => {
  const { mutateAsync: refresh, isLoading } = useRefreshTokenMutation();
  const [{ expired }, setRefreshToken] = useRecoilState(authTokenAtom);
  useEffect(() => {
    if (expired && !isLoading) {
      refresh().catch(() => {
        setCookie(process.env.REACT_APP_AUTH_COOKIE_NAME, '');
        setCookie(process.env.REACT_APP_REFERSH_COOKIE_NAME, '');
        setRefreshToken({ expired: false, token: '' });
      });
    }
  }, [expired, isLoading, refresh, setRefreshToken]);

  return (
    <BrowserRouter>
      <Setup />
    </BrowserRouter>
  );
});
