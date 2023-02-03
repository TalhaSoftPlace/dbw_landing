import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Registration = lazy(() => import('./pages/Registration'));
const PricingPlan = lazy(() => import('./pages/PricingPlan'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsandConditionPage = lazy(() => import('./pages/TermsandConditionPage'));
const Feedback = lazy(() => import('./pages/Feedback'));
const NewsIntroPage = lazy(() => import('./pages/NewsIntroPage'));
const NewsManagementPage = lazy(() => import('./pages/NewsManagementPage'));

export const Setup = React.memo(() => {
  return (
    <Suspense>
      <Routes>
        <Route path="/sign-up" element={<Registration />} />
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<PricingPlan />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsandConditionPage />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/business-email" element={<NewsIntroPage />} />
        <Route path="/workflow-engine" element={<NewsManagementPage />} />
        <Route path="/*" element={<Navigate to="" />} />
      </Routes>
    </Suspense>
  );
});
export const Router = React.memo(() => {

  return (
    <BrowserRouter>
      <Setup />
    </BrowserRouter>
  );
});
