import React, { useCallback, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { Router } from './Router';
import { Theme } from './theme';
import { useSnackbar } from 'notistack';
import { AppStyles } from './App.styles';
import { ReactQueryDevtools } from 'react-query/devtools';
import { authTokenAtom } from './atoms';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';

export const App = () => {
  const setResetToken = useSetRecoilState(authTokenAtom);

  const { enqueueSnackbar } = useSnackbar();
  const onError = useCallback(
    error => {
      if (error?.response?.status === 304) {
        return;
      }
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setResetToken(state => ({ ...state, expired: true }));
        return enqueueSnackbar("Please login again.", {
          variant: 'error',
        });
      }
      const errorMessage =
        typeof error.response?.data === 'string'
          ? error.response?.data
          : (error.response?.data?.error && error.response?.data?.error) ||
            (error.response?.data?.description &&
              error.response?.data?.description);
      enqueueSnackbar(errorMessage ?? error.toString(), {
        variant: 'error',
      });
    },
    [enqueueSnackbar, setResetToken]
  );

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            onError,
            cacheTime: 1000 * 60 * 60,
            staleTime: 5000,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            retry: 0,
          },
          mutations: {
            onError,
          },
        },
      }),
    [onError]
  );
  const localStoragePersistor = createWebStoragePersistor({
    storage: window.localStorage,
  });

  persistQueryClient({
    queryClient,
    persistor: localStoragePersistor,
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Theme>
        <AppStyles>
          <Router />
        </AppStyles>
      </Theme>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
