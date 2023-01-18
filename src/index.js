import { SnackbarProvider } from 'notistack';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Helmet } from 'react-helmet';
import { RecoilRoot } from 'recoil';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const container = document.getElementById('root');
const root = createRoot(container);

const anchorOrigin = {
  vertical: 'top',
  horizontal: 'right',
};
const notistackRef = React.createRef();
const onClickDismiss = key => () => {
  notistackRef.current.closeSnackbar(key);
};
root.render(
  <SnackbarProvider
    hideIconVariant
    anchorOrigin={anchorOrigin}
    maxSnack={6}
    preventDuplicate
    ref={notistackRef}
    action={key => (
      <b style={{ cursor: 'pointer' }} onClick={onClickDismiss(key)}>
        Dismiss
      </b>
    )}
  >
    <RecoilRoot>
      {!!process.env.REACT_APP_ENV &&
        process.env.REACT_APP_ENV !== 'production' && (
          <Helmet>
            <meta name="robots" content={process.env.REACT_APP_NOINDEX} />
          </Helmet>
        )}
      <App />
    </RecoilRoot>
  </SnackbarProvider>
);
serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
