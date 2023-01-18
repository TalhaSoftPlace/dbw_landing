import { useMutation, useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { authTokenAtom } from '../atoms';
import { queryKeys } from '../constants';
import { service } from '../services';
import { getCookie, setCookie } from '../utils';

export const useRefreshTokenMutation = () => {
  const queryClient = useQueryClient();

  const setRefreshToken = useSetRecoilState(authTokenAtom);
  return useMutation(
    async () => {
      const refreshToken = getCookie(process.env.REACT_APP_REFERSH_COOKIE_NAME);
      if (refreshToken) {
        const { data: response } = await service.post(`/v1/token`, {
          refreshToken,
        });
        if (!!response.access_token) {
          setRefreshToken({ token: response.access_token, expired: false });
        }
        return response;
      }
      return {};
    },
    {
      onSuccess: async response => {
        if (!!response.access_token && !!response.refresh_token) {
          setCookie(
            process.env.REACT_APP_AUTH_COOKIE_NAME,
            response.access_token
          );

          setCookie(
            process.env.REACT_APP_REFERSH_COOKIE_NAME,
            response.refresh_token
          );
        } else {
          setCookie(process.env.REACT_APP_AUTH_COOKIE_NAME, '');
          setCookie(process.env.REACT_APP_REFERSH_COOKIE_NAME, '');
        }
        queryClient.refetchQueries([queryKeys.User]);
      },
      onError: () => {
        setCookie(process.env.REACT_APP_AUTH_COOKIE_NAME, '');
        setCookie(process.env.REACT_APP_REFERSH_COOKIE_NAME, '');
        queryClient.refetchQueries([queryKeys.User]);
      },
    }
  );
};
