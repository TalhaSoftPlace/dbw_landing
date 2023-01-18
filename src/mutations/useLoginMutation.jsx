import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { authTokenAtom } from '../atoms';
import { queryKeys } from '../constants';
import { service } from '../services';
import { setCookie } from '../utils';

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const setRefreshToken = useSetRecoilState(authTokenAtom);
  return useMutation(
    async ({ username, password }) => {
      const { data: response } = await service.post(`/v1/login`, {
        username,
        password,
      });
      if (!!response?.access_token && !!response?.refresh_token) {
        setRefreshToken({ token: response.access_token, expired: false });
        await setCookie(
          process.env.REACT_APP_AUTH_COOKIE_NAME,
          response.access_token
        );

        await setCookie(
          process.env.REACT_APP_REFERSH_COOKIE_NAME,
          response.refresh_token
        );
      }
      return response;
    },
    {
      mutationKey: 'ok',
      onSuccess: async response => {
        if (!!response.access_token && !!response.refresh_token) {
          queryClient.clear();
          queryClient.refetchQueries([queryKeys.User]);
        } else {
          enqueueSnackbar('Invalid Credentials! Please try again...', {
            variant: 'error',
          });
        }
      },
    }
  );
};
