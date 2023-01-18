import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import { getCookie, setCookie } from '../utils';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import { useRecoilState } from 'recoil';
import { authTokenAtom } from '../atoms';
import { useEffect, useMemo } from 'react';

const getUser = async () => {
  let username;
  const token = getCookie(process.env.REACT_APP_AUTH_COOKIE_NAME);
  if (token?.length) {
    try {
      const decoded = jwt_decode(token);
      setCookie(process.env.REACT_APP_REFERSH_COOKIE_EXPIRY, decoded.exp);
      const expires = moment.unix(decoded.exp);
      if (expires.diff(moment(), 'minutes') > 2) {
        username = decoded.preferred_username;
      } else {
        setCookie(process.env.REACT_APP_AUTH_COOKIE_NAME, '');
      }
    } catch (e) {
      Promise.reject('Authorization Failed');
    }
  }
  const response = username
    ? await service.get(`v1/user/${username}`)
    : undefined;
  return response?.data?.[0];
};

export const useUser = () => {
  const [{ expired, token }, setRefreshToken] = useRecoilState(authTokenAtom);
  const decoded = useMemo(() => (!!token ? jwt_decode(token) : undefined), [
    token,
  ]);

  useEffect(() => {
    const expires = decoded?.exp ? moment.unix(decoded?.exp) : undefined;
    if (expires?.diff(moment(), 'minutes') <= 20) {
      !expired && setRefreshToken(state => ({ ...state, expired: true }));
    }
  }, [decoded, expired, setRefreshToken]);

  return useQuery([queryKeys.User], () => getUser(), {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
    refetchOnMount: false,

    onError: () => {
      setCookie(process.env.REACT_APP_AUTH_COOKIE_NAME, '');
      setRefreshToken({ token: '', expired: false });
    },
  });
};
