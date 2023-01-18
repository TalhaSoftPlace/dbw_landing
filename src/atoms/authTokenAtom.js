import { atom } from 'recoil';
import { getCookie } from '../utils';

export const authTokenAtom = atom({
  key: 'authToken',
  default: {
    expired: false,
    token: getCookie(process.env.REACT_APP_AUTH_COOKIE_NAME),
    popup:true,
  },
});
